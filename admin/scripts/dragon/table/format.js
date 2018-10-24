TABLEFORMAT = {
    run: function ($scope) {

        $scope.cellValue = function (key, column, row) {

            var value = eval("row." + key);


            if (column.multilink !== undefined) {
                column.sortable = false;
                return String.format("<a class='btn btn-" + TAG.table + "'>{0}</a>", ICON.i('list'));
            }
            if (column.link !== undefined) {
                if (value === null)
                    return "<span class='text-grey'>[N/A]</span>";
                if (column.shorttext) {
                    var shorttext = value;
                    if (shorttext !== undefined) {
                        if (shorttext.length > column.shorttext) {
                            shorttext = String.format(
                                "<a>{0}</a>",
                                shorttext.substring(0, column.shorttext) + "..."
                            );
                        }
                        return "<a class='btn btn-" + TAG.table + "'>" + shorttext + "</a>";
                    } else {
                        return `<span class='text-grey'>${key}</span>`;
                    }
                } else
                    return "<a class='btn btn-" + TAG.table + "'>" + value + "</a>";
            }
            value = $scope.formatByType(column, row, key);
            if (typeof column.format === "function")
                value = column.format(value);
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
                "{0} sorted by {1} {2}ending, showing {3} to {4} of {5} entries",
                $scope.plural,
                $scope.table.orderby,
                $scope.table.order,
                currentShow,
                currentShow + ($scope.table.currentCount - 1),
                $scope.table.totalCount
            );

            return result;
        };

        $scope.columnLabel = function (value, key) {
            var label = value.label || key;
            if (typeof value.label === "function") return value.label();
            return capitalize(label);
        };
        $scope.formatData = function (data, extra) {
            var formatedData = [];
            var goData = extra.selected ? $scope.records.data.filter(function (item) {
                return item.selected === true;
            }) : data;

            var originalColumns = [];
            for (var i in $scope.table.crud.table.columns) {
                if (extra.columsAllow.indexOf(i) !== -1)
                    originalColumns.push(i);
            }

            var storage_columns = STORAGE.getColumns($scope) === null ? originalColumns : STORAGE.getColumns($scope).filter(function (item) {
                return extra.columsAllow.indexOf(item) !== -1;
            });
            var goColums = extra.orderColumn ? storage_columns : originalColumns;
            goData.forEach(function (row) {
                var newRow = {};
                goColums.forEach(function (column) {
                    if (extra.orginalformat)
                        eval(`newRow.${column} = HTML.strip(row.${column});`);
                    else {
                        var goValue = "";
                        eval(`goValue = row.${column};`);
                        goValue = $scope.formatByTypeClean($scope.table.crud.table.columns[column], row, column, extra);
                        if (extra.onerow)
                            if (["CSV"].indexOf(extra.type) !== -1)
                                goValue = `"${goValue}"`;
                        eval(`newRow.${column} = goValue;`);
                    }
                });
                formatedData.push(newRow);
            });
            return formatedData;
        };

        $scope.formatByTypeClean = function (column, row, key, extra) {
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
                value = DSON.iffunction(column.value) ? column.value(data) : column.value;
            }

            if (column.formattype !== undefined) {
                if (column.formattype.indexOf("datetime") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    var format = column.formattype.split(":");
                    format = format.length > 1 ? format[1] : "";
                    var date = new Date(value);
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var ampm = "";
                    var strTime = hours + ":" + minutes + " " + ampm;
                    if (format === "12") {
                        ampm = hours >= 12 ? "pm" : "am";
                        hours = hours % 12;
                        hours = hours ? hours : 12;
                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        strTime = hours + ":" + minutes + " " + ampm;
                    }
                    return (date.getDate() + 1 + "/" + date.getMonth() + "/" + date.getFullYear() + " " + strTime);
                } else if (column.formattype === "bool") {
                    if (DSON.oseaX(value)) return DSON.noset();
                    if (value) return 'Yes';
                    else return 'No';
                } else if (column.formattype.indexOf("numeric") !== -1) {
                    if (DSON.oseaX(value)) return "";
                    if (["XLS", "CSV", "Clipboard"].indexOf(extra.type) !== -1)
                        return value;
                    var format = column.formattype.split(":");
                    format = format.length > 1 ? format[1] : "";
                    return numeral(value).format(format);
                } else if (column.formattype.indexOf("location") !== -1) {
                    if (DSON.oseaX(value))
                        return DSON.noset();
                    if (["XLS", "CSV", "Clipboard"].indexOf(extra.type) !== -1)
                        return value;
                    if (extra.onerow) {
                        return `<img src="https://maps.googleapis.com/maps/api/staticmap?center=${value}&zoom=16&size=600x300&maptype=roadmap&markers=color:red|label:C|${value}&key=AIzaSyB-T9ki1Z2Sw--ri0IB1solkM1cF_RENWE"/>`;
                    }
                    return `${value}`;
                } else if (column.formattype.indexOf("file") !== -1) {
                    if (extra.onerow) {
                        var format = column.formattype.split(":");
                        format = format.length > 1 ? format[1] : "";
                        if (DSON.oseaX(value))
                            return DSON.noset();
                        var fileUrl = HTTP.path([CONFIG.filePath, value]);
                        if (["XLS", "CSV", "Clipboard"].indexOf(extra.type) !== -1)
                            return fileUrl;
                        switch (format) {
                            case "image": {
                                return String.format("<img src='{0}'/>", fileUrl);
                            }
                            case "all": {
                                if (FILE.noSupport(value)) {
                                    return "Not Support";
                                }
                                if (FILE.isImage(value))
                                    return String.format("<img src='{0}'/>", fileUrl);
                                else
                                    return `<object style='width: 100%;height: 100%' data="${fileUrl}"></object>`;
                            }
                        }

                        var fileUrl = HTTP.path([CONFIG.filePath, value]);
                        return `<img src="${fileUrl}"/>`;
                    }
                    return HTTP.path([CONFIG.filePath, value]);
                }
                else if (column.formattype.indexOf("html") !== -1) {
                    if (extra.onerow) {
                        return value;
                    }
                    return HTTP.path([CONFIG.filePath, value]);
                }
            }

            if (typeof column.format === "function")
                value = column.format(value);
            if (value === null || value === undefined) return column.null || "";
            return HTML.strip(value);
        };

        $scope.formatByType = function (column, row, key) {
            var value = eval("row." + key);

            if (column.anonymous === true) {
                column.sortable = false;
                data = {
                    $scope: $scope,
                    row: row
                };
                value = DSON.iffunction(column.value) ? column.value(data) : column.value;
            }

            if (column.formattype !== undefined) {
                if (column.formattype.indexOf("datetime") !== -1) {
                    if (DSON.oseaX(value)) return DSON.noset();
                    var format = column.formattype.split(":");
                    format = format.length > 1 ? format[1] : "";
                    var date = new Date(value);
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var ampm = "";
                    var strTime = hours + ":" + minutes + " " + ampm;
                    if (format === "12") {
                        ampm = hours >= 12 ? "pm" : "am";
                        hours = hours % 12;
                        hours = hours ? hours : 12;
                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        strTime = hours + ":" + minutes + " " + ampm;
                    }
                    return (
                        date.getDate() +
                        1 +
                        "/" +
                        date.getMonth() +
                        "/" +
                        date.getFullYear() +
                        " " +
                        strTime
                    );
                } else if (column.formattype === "bool") {
                    if (DSON.oseaX(value)) return DSON.noset();
                    if (value) return '<i class="icon-checkbox-checked"></i>';
                    else return '<i class="icon-checkbox-unchecked"></i>';
                } else if (column.formattype.indexOf("numeric") !== -1) {
                    if (DSON.oseaX(value)) return "";
                    var format = column.formattype.split(":");
                    format = format.length > 1 ? format[1] : "";
                    return numeral(value).format(format);
                } else if (column.formattype.indexOf("location") !== -1) {
                    if (DSON.oseaX(value))
                        return DSON.noset();
                    var location = value.split(',');
                    if (location.length > 1) {
                        var lat = location[0];
                        var lng = location[1];
                        return "<a class='btn btn-" + TAG.table + "'>" + ICON.i("location4") + "</a>";
                    }
                }
                else if (column.formattype === "html") {
                    return String.format("<a class='btn btn-" + TAG.table + "'>{0}</a>", ICON.i("html5"));
                }
                else if (column.formattype.indexOf("file") !== -1) {
                    var format = column.formattype.split(":");
                    format = format.length > 1 ? format[1] : "";
                    if (DSON.oseaX(value))
                        return DSON.noset();
                    var fileUrl = String.format("{0}/{1}", CONFIG.filePath, value);
                    switch (format) {
                        case "image": {
                            return String.format("<a class='btn btn-" + TAG.table + "'>{0}</a>", FILE.fileToIcon(value), fileUrl);
                        }
                        case "all": {
                            if (FILE.noSupport(value)) {
                                return "<a download href='" + fileUrl + "' class='btn btn-" + TAG.table + "'>" + FILE.fileToIcon(value) + "</a>";
                            }
                            if (FILE.isImage(value))
                                return String.format("<a class='btn btn-" + TAG.table + "'>{0}</a>", FILE.fileToIcon(value), fileUrl);
                            else
                                return "<a class='btn btn-" + TAG.table + "'>" + FILE.fileToIcon(value) + "</a>";
                        }
                    }
                }
            }


            return value;
        };

        $scope.rowClass = function (row) {
            if (typeof $scope.table.crud.table.rowClass === "function")
                return $scope.table.crud.table.rowClass(row, $scope);
            return "";
        };
    }
};