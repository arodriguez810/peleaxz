TABLEFORMAT = {
    run: function ($scope) {
        $scope.cellValue = function (key, column, row) {
            if (column.formattype !== undefined) {
                if ([
                    ENUM.FORMAT.money,
                    ENUM.FORMAT.percentage,
                    ENUM.FORMAT.numeric,
                ]) {
                    column.sorttype = ENUM.FORMAT.numeric;
                    column.class = "text-left";
                }

                if ([
                    ENUM.FORMAT.date,
                    ENUM.FORMAT.time,
                    ENUM.FORMAT.datetime,
                ]) {
                    column.sorttype = ENUM.FORMAT.time;
                }
            }
            if (DSON.oseaX(row))
                return "";
            var value = eval("row." + key);
            if (column.multilink !== undefined) {
                var titleLink = "";
                if (typeof column.format === "function")
                    titleLink = column.format(row);
                column.sortable = false;
                return String.format("<a class='dragonlink'>{0}</a>", ICON.i('list', titleLink));
            }
            if (column.link !== undefined) {
                if (value === null)
                    return "<span class='text-grey'>[N/A]</span>";
                if (typeof column.format === "function")
                    value = column.format(row);
                if (column.shorttext && typeof column.format !== "function") {
                    var shorttext = value;
                    if (shorttext !== undefined) {
                        if (shorttext.length > column.shorttext) {
                            shorttext = String.format("{0}", shorttext.substring(0, column.shorttext) + "...");
                        }
                        return "<a class='dragonlink'>" + shorttext + "</a>";
                    } else {
                        return `<span class='text-grey'>${key}</span>`;
                    }
                } else {
                    return "<a class='dragonlink'>" + value + "</a>";
                }
            }
            value = $scope.formatByType(column, row, key);
            if (typeof column.format === "function")
                value = column.format(row);
            if (value === null || value === undefined) return column.null || "";
            if (column.shorttext) {
                var shorttext = value;
                if (shorttext.length > column.shorttext) {
                    shorttext = String.format(
                        "<a>{0}</a>",
                        shorttext.substring(0, column.shorttext) + "..."
                    );
                }
                return shorttext;
            }
            return value;
        };
        $scope.tableStatus = function () {
            var currentShow =
                $scope.table.currentPage * $scope.table.currentLimit -
                ($scope.table.currentLimit - 1);
            var result = String.format(
                MESSAGE.i('table.tableStatus'),
                $scope.plural,
                $scope.table.orderby,
                $scope.table.order,
                currentShow,
                currentShow + ($scope.table.currentCount - 1),
                $scope.table.totalCount
            );
            return result;
        };
        $scope.columnLabel = function (value, key, func) {
            var label = value.label || key;
            if (func === undefined)
                if (typeof value.label === "function") return value.label();
            if (MESSAGE.exist(`columns.${key}`))
                label = capitalizeOneSpace(MESSAGE.i(`columns.${key}`));
            return capitalizeOneSpace(label);
        };
        $scope.columnLabelStrip = function (value, key) {
            var label = value.label || key;
            if (typeof value.label === "function") return HTML.strip(value.label());
            return HTML.strip(capitalize(label));
        };
        $scope.formatData = function (data, extra) {
            var formatedData = [];
            var goData = extra.selected ? $scope.records.data.filter(function (item) {
                return item.selected === true;
            }) : data;

            var originalColumns = [];
            for (var i in $scope.columns()) {
                if (extra.columsAllow.indexOf(i) !== -1)
                    originalColumns.push(i);
            }

            // var storage_columns = STORAGE.getColumns($scope) === null ? originalColumns : STORAGE.getColumns($scope).filter(function (item) {
            //     return extra.columsAllow.indexOf(item) !== -1;
            // });
            var goColums = originalColumns;
            goData.forEach(function (row) {
                var newRow = {};
                goColums.forEach(function (column) {
                    var columnObj = $scope.columns()[column];
                    if (typeof columnObj.format === "function")
                        eval(`newRow.${column} = columnObj.format(row);`);
                    else if (extra.orginalformat)
                        eval(`newRow.${column} = HTML.strip(row.${column});`);
                    else {
                        var goValue = "";
                        eval(`goValue = row.${column};`);
                        goValue = $scope.formatByTypeClean($scope.columns()[column], row, column, extra);
                        if (extra.onerow)
                            if ([ENUM.file.formats.CSV].indexOf(extra.type) !== -1)
                                goValue = `"${goValue}"`;
                        eval(`newRow.${column} = goValue;`);
                    }
                });
                formatedData.push(newRow);
            });
            return formatedData;
        };
        $scope.formatByTypeClean = function (column, row, key, extra) {
            var http = new HTTP();
            var value = eval("row." + key);
            if (column.multilink !== undefined) {
                return "...";
            }
            if (column.link !== undefined) {
                if (value === null)
                    return "[N/A]";
                return value;
            }
            if (column.anonymous === true) {
                column.sortable = false;
                data = {
                    $scope: $scope,
                    row: row
                };
                value = typeof column.value === "function" ? column.value(data) : column.value;
            }
            if (column.formattype !== undefined) {
                if (column.formattype.indexOf("datetime") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    return LAN.datetime(value);
                }
                else if (column.formattype.indexOf("date") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    return LAN.date(value);
                }
                else if (column.formattype.indexOf("time") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    return LAN.time(value);
                }
                else if (column.formattype.indexOf("money") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    var numeralValue = numeral(value)._value;
                    return numeralValue ? LAN.money(numeralValue).format(true) : LAN.money("0.00").format(true);
                }
                else if (column.formattype.indexOf("percentage") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    return value + "%";
                }
                else if (column.formattype.indexOf("password") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    return "*******";
                }
                else if (column.formattype.indexOf("creditcard") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    if (value.length > 4)
                        return "****-" + value.substr(value.length - 4, 4);
                    else
                        return "";
                }
                else if (column.formattype === "bool") {
                    if (DSON.oseaX(value)) return DSON.noset();
                    if (value) return MESSAGE.ic('mono.yes');
                    else return MESSAGE.ic('mono.no');
                }
                else if (column.formattype.indexOf("numeric") !== -1) {
                    if (DSON.oseaX(value)) return "";
                    var numeralValue = numeral(value)._value;
                    return numeralValue ? LAN.money(numeralValue).format(false).split(LAN.money().s.decimal)[0] : "0";
                }
                else if (column.formattype.indexOf("location") !== -1) {
                    if (DSON.oseaX(value))
                        return DSON.noset();
                    if ([ENUM.file.formats.XLS, ENUM.file.formats.CSV, ENUM.file.formats.Clipboard].indexOf(extra.type) !== -1)
                        return value;
                    if (extra.onerow) {
                        return `<img src="https://maps.googleapis.com/maps/api/staticmap?center=${value}&zoom=16&size=600x300&maptype=roadmap&markers=color:red|label:C|${value}&key=AIzaSyB-T9ki1Z2Sw--ri0IB1solkM1cF_RENWE"/>`;
                    }
                    return `${value}`;
                }
                else if (column.formattype.indexOf("file") !== -1) {
                    if (extra.onerow) {
                        var format = column.formattype.split(":");
                        format = format.length > 1 ? format[1] : "";
                        if (DSON.oseaX(value))
                            return DSON.noset();
                        var fileUrl = http.path([CONFIG.filePath, value]);
                        if ([ENUM.file.formats.XLS, ENUM.file.formats.CSV, ENUM.file.formats.Clipboard].indexOf(extra.type) !== -1)
                            return fileUrl;
                        switch (format) {
                            case "image": {
                                return String.format("<img src='{0}'/>", fileUrl);
                            }
                            case "all": {
                                if (FILE.noSupport(value)) {
                                    return MESSAGE.i('mono.NotSupport');
                                }
                                if (FILE.isImage(value))
                                    return String.format("<img src='{0}'/>", fileUrl);
                                else
                                    return `<object style='width: 100%;height: 100%' data="${fileUrl}"></object>`;
                            }
                        }
                        var fileUrl = http.path([CONFIG.filePath, value]);
                        return `<img src="${fileUrl}"/>`;
                    }
                    return http.path([CONFIG.filePath, value]);
                }
                else if (column.formattype.indexOf("html") !== -1) {
                    if (extra.onerow) {
                        return value;
                    }
                    return http.path([CONFIG.filePath, value]);
                }
                else if (column.formattype === "color") {
                    return value;
                }
            }

            if (typeof column.format === "function")
                value = column.format(value);
            if (value === null || value === undefined) return column.null || "";
            return HTML.strip(value);
        };
        $scope.formatByType = function (column, row, key) {
            var value = eval("row." + key);
            if (column.folder) {
                switch (column.files) {
                    case "image": {
                        return String.format("<a data-dragonfile='/" + (column.folder + `/${value}`) + "' class='btn gallerybtn bg-" + COLOR.secundary + "'>{0}</a>", ICON.i('images3'));
                    }
                    case "all": {
                        return String.format("<a data-dragonfile='/" + (column.folder + `/${value}`) + "' class='btn gallerybtn bg-" + COLOR.secundary + "'>{0}</a>", ICON.i('images3'));
                    }
                    default: {
                        return String.format("<a class='dragonlink'>{0}</a>", ICON.i('files-empty'));
                    }
                }
            }
            if (column.anonymous === true) {
                column.sortable = false;
                data = {
                    $scope: $scope,
                    row: row
                };
                value = typeof column.value === "function" ? column.value(data) : column.value;
            }
            if (column.formattype !== undefined) {
                if (column.formattype.indexOf("datetime") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    return LAN.datetime(value);
                }
                else if (column.formattype.indexOf("date") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    return LAN.date(value);
                }
                else if (column.formattype.indexOf("time") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    return LAN.time(value);
                }
                else if (column.formattype.indexOf("money") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    var numeralValue = numeral(value)._value;
                    return numeralValue ? LAN.money(numeralValue).format(true) : LAN.money("0.00").format(true);
                }
                else if (column.formattype.indexOf("percentage") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    return value + "%";
                }
                else if (column.formattype.indexOf("password") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    return "*******";
                }
                else if (column.formattype.indexOf("creditcard") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    if (value.length > 4)
                        return "****-" + value.substr(value.length - 4, 4);
                    else
                        return "";
                }
                else if (column.formattype.indexOf("externalimage") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    return "<img src='" + (value) + "' class='tumbimage'>";
                }
                else if (column.formattype === "bool") {
                    if (DSON.oseaX(value)) return DSON.noset();
                    if (value) return MESSAGE.ic('mono.yes');
                    else return MESSAGE.ic('mono.no');
                }
                else if (column.formattype.indexOf("numeric") !== -1) {
                    if (DSON.oseaX(value)) return "";
                    var numeralValue = numeral(value)._value;
                    return numeralValue ? LAN.money(numeralValue).format(false).split(LAN.money().s.decimal)[0] : "0";
                }
                else if (column.formattype.indexOf("decimal") !== -1) {
                    if (DSON.oseaX(value)) return "";
                    var numeralValue = numeral(value)._value;
                    return numeralValue ? LAN.money(numeralValue).format(false) : LAN.money("0.00").format(false);
                }
                else if (column.formattype.indexOf("location") !== -1) {
                    if (DSON.oseaX(value))
                        return DSON.noset();
                    var location = value.split(';');
                    if (location.length > 1) {
                        var lat = location[0];
                        var lng = location[1];
                        return "<a class='dragonlink'>" + ICON.i("location4") + "</a>";
                    }
                }
                else if (column.formattype === "html") {
                    return String.format("<a class='dragonlink'>{0}</a>", ICON.i("html5"));
                }
                else if (column.formattype === "color") {
                    return String.format("<a class='btn ' style='background-color: {1}' >{0}</a>", ICON.i("brush"), value);
                }
                else if (column.formattype.indexOf("file") !== -1) {
                    var format = column.formattype.split(":");
                    format = format.length > 1 ? format[1] : "";
                    if (DSON.oseaX(value))
                        return DSON.noset();
                    var fileUrl = String.format("{0}/{1}", CONFIG.filePath, value);
                    switch (format) {
                        case "image": {
                            if (column.folder) {
                                return String.format("<a class='dragonlink'>{0}</a>", ICON.i('images3'), fileUrl);
                            } else
                                return String.format("<a class='dragonlink'>{0}</a>", FILE.fileToIcon(value), fileUrl);
                        }
                        case "all": {
                            if (column.folder) {
                                return String.format("<a class='dragonlink'>{0}</a>", ICON.i(' files-empty'), fileUrl);
                            } else {
                                if (FILE.noSupport(value)) {
                                    return "<a download href='" + fileUrl + "' class=''>" + FILE.fileToIcon(value) + "</a>";
                                }
                                if (FILE.isImage(value))
                                    return String.format("<a class='dragonlink'>{0}</a>", FILE.fileToIcon(value), fileUrl);
                                else
                                    return "<a class='dragonlink'>" + FILE.fileToIcon(value) + "</a>";
                            }
                        }
                    }
                }
            }
            return value;
        };
        $scope.rowClass = function (row) {
            if (typeof eval(`CRUD_${$scope.modelName}`).table.rowClass === "function")
                return eval(`CRUD_${$scope.modelName}`).table.rowClass(row, $scope);
            return "";
        };
        $scope.rowStyle = function (row) {
            if (typeof eval(`CRUD_${$scope.modelName}`).table.rowStyle === "function")
                return eval(`CRUD_${$scope.modelName}`).table.rowStyle(row, $scope);
            return "";
        };
        $scope.rowDeleted = function (row) {
            if (row.rowdeleted === true)
                return "dragon-row-deleted";
            return "";
        };
        $scope.LAN = LAN;
    }
};