SORTABLE = {
    run: function ($scope) {
        var firstColumn = $scope.dragrow ? $scope.dragrow : (eval(`CRUD_${$scope.modelName}`).table.key || "id");
        if (eval(`CRUD_${$scope.modelName}`).table.sort)
            firstColumn = eval(`CRUD_${$scope.modelName}`).table.sort;

        for (var i in eval(`CRUD_${$scope.modelName}`).table.columns) {
            eval(`CRUD_${$scope.modelName}`).table.columns[i].sorted = false;
            eval(`CRUD_${$scope.modelName}`).table.columns[i].order = "asc";
        }
        $scope.table.orderby = firstColumn;
        $scope.table.order = "asc";
        if ($scope.hasModel("sortcolumn")) {
            $scope.table.orderby = $scope.getModel("sortcolumn");
        }
        if ($scope.hasModel("sortorder")) {
            $scope.table.order = $scope.getModel("sortorder");
        }
        eval(`CRUD_${$scope.modelName}`).table.columns[$scope.table.orderby].order = $scope.table.order;
        eval(`CRUD_${$scope.modelName}`).table.columns[$scope.table.orderby].sorted = true;
        $scope.sortIcon = function (column) {
            var types = [];
            var icon = "";
            types["numeric"] = "icon-sort-numeric-";
            types["amount"] = " icon-sort-amount-";
            types["time"] = "icon-sort-time-";
            if (column.sortable !== false) {
                if (!column.sorted) icon = "icon-sortXXX";
                else {
                    if (column.sorttype === undefined) {
                        icon = "icon-sort-alpha-";
                        icon += column.order;
                    } else {
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
        $scope.sortTitle = function (column, key) {
            var type = "alphanumeric";
            if (column.sorttype !== undefined) {
                type = column.sorttype;
            }
            var sorted = column.order === "asc" ? "desc" : "asc";
            return `${MESSAGE.i('mono.clicktosort')} ${MESSAGE.i('mono.sort_' + type)} ${MESSAGE.i('mono.by')} ${$scope.columnLabel(column, key).toLowerCase()} ${MESSAGE.i('mono.' + sorted)}`;
        };
        $scope.sortTitleIcon = function (column, key) {
            var type = "alphanumeric";
            if (column.sorttype !== undefined) {
                type = column.sorttype;
            }
            var sorted = column.order === "asc" ? "asc" : "desc";
            return `${MESSAGE.i('mono.sorted')} ${MESSAGE.i('mono.sort_' + type)} ${MESSAGE.i('mono.' + sorted)} ${MESSAGE.i('mono.by')} ${$scope.columnLabel(column, key).toLowerCase()} `;
        };
        $scope.resetSort = function () {
            var firstColumn = $scope.dragrow ? $scope.dragrow : (eval(`CRUD_${$scope.modelName}`).table.key || "id");
            if (eval(`CRUD_${$scope.modelName}`).table.sort)
                firstColumn = eval(`CRUD_${$scope.modelName}`).table.sort;
            for (var i in eval(`CRUD_${$scope.modelName}`).table.columns) {
                eval(`CRUD_${$scope.modelName}`).table.columns[i].sorted = false;
                eval(`CRUD_${$scope.modelName}`).table.columns[i].order = "asc";
            }
            eval(`CRUD_${$scope.modelName}`).table.columns[firstColumn].order = "desc";
            $scope.sort(eval(`CRUD_${$scope.modelName}`).table.columns[firstColumn], firstColumn);
        };
        $scope.sort = function (column, columnName) {
            column.sorted = true;
            column.order = column.order === "asc" ? "desc" : "asc";
            $scope.table.orderby = columnName;
            if ($scope.characterist('persist'))
                $scope.saveModel("sortcolumn", "table.orderby");
            $scope.table.order = column.order;
            if ($scope.characterist('persist'))
                $scope.saveModel("sortorder", "table.order");
            for (var i in eval(`CRUD_${$scope.modelName}`).table.columns) {
                if (i !== columnName) {
                    eval(`CRUD_${$scope.modelName}`).table.columns[i].sorted = false;
                    eval(`CRUD_${$scope.modelName}`).table.columns[i].order = "asc";
                }
            }
            $scope.refresh();
        };
    }
};
