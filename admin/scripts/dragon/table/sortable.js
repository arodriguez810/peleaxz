SORTABLE = {
    run: function ($scope) {
        var first = true;
        var firstColumn = "";
        for (var i in $scope.table.crud.table.columns) {
            if (first) {
                firstColumn = i;
                first = false;
            }
            $scope.table.crud.table.columns[i].sorted = false;
            $scope.table.crud.table.columns[i].order = "asc";
        }
        $scope.table.orderby = firstColumn;
        $scope.table.order = "asc";
        $scope.table.crud.table.columns[firstColumn].sorted = true;
        $scope.sortIcon = function (column) {
            var types = [];
            var icon = "";
            types["numeric"] = "icon-sort-numeric-";
            types["amount"] = " icon-sort-amount-";
            types["time"] = "icon-sort-time-";
            if (column.sortable !== false) {
                if (!column.sorted)
                    icon = "icon-sort";
                else {
                    if (column.sorttype === undefined) {
                        icon = "icon-sort-alpha-";
                        icon += column.order;
                    }
                    else {
                        if (column.sorttype === "bool") {
                            icon = "icon-stack-";
                            icon += column.order === "asc" ? "empty" : "check";
                        } else {
                            icon = types[column.sorttype];
                            icon += column.order;
                        }
                    }
                }
            }
            return icon;
        };

        $scope.resetSort = function () {
            var first = true;
            var firstColumn = "";
            for (var i in $scope.table.crud.table.columns) {
                if (first) {
                    firstColumn = i;
                    $scope.table.crud.table.columns[i].sorted = true;
                    $scope.table.crud.table.columns[i].order = "desc";
                    first = false;
                } else {
                    $scope.table.crud.table.columns[i].sorted = false;
                    $scope.table.crud.table.columns[i].order = "asc";
                }
            }
            $scope.sort($scope.table.crud.table.columns[firstColumn], firstColumn);
        };

        $scope.sort = function (column, columnName) {
            column.sorted = true;
            column.order = column.order === "asc" ? "desc" : "asc";
            $scope.table.orderby = columnName;
            $scope.saveModel('sortcolumn','table.orderby');
            $scope.table.order = column.order;
            $scope.saveModel('sortorder','table.order');
            for (var i in $scope.table.crud.table.columns) {
                if (i !== columnName) {
                    $scope.table.crud.table.columns[i].sorted = false;
                    $scope.table.crud.table.columns[i].order = "asc";
                }
            }
            $scope.refresh();
        };
    }
};