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
                } else if (column.formattype.indexOf("file") !== -1) {
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