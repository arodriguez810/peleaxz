TABLEFORMAT = {
    run: function ($scope) {
        $scope.cellValue = function (key, column, row) {
            var value = eval("row." + key);
            if (value === null || value === undefined)
                return column.null || "";
            if (column.shorttext) {
                var shorttext = value;
                if (shorttext.length > column.shorttext) {
                    shorttext = String.format("<a>{0}</a>",
                        shorttext.substring(0, column.shorttext) + "...");
                }
                return shorttext;
            }
            return value;
        };
        $scope.tableStatus = function () {
            var currentShow = ($scope.table.currentPage * $scope.table.currentLimit) - ($scope.table.currentLimit - 1);
            var result = String.format("{0} sorted by {1} {2}ending, showing {3} to {4} of {5} entries",
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
            return capitalize(label);
        };

        $scope.rowClass = function (row) {
            if (typeof $scope.table.crud.table.rowClass === "function")
                return $scope.table.crud.table.rowClass(row);
            return "";
        };
    }
};