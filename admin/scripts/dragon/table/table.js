TABLE = {
    run: function ($scope, $http, $compile) {
        $scope.records = [];
        $scope.CONFIG = CONFIG;
        $scope.table = {
            loaded: false,
            crud: null,
            is: {
                loading: true
            }
        };

        $scope.columnVisible = function (value) {
            return value.visible !== false;
        };

        $scope.columns = function () {
            if (STORAGE.hasColumns($scope)) {
                var storage_columns = STORAGE.getColumns($scope);
                return $scope.reorderColumn(storage_columns);
            } else
                return $scope.table.crud.table.columns;
            return $scope.table.crud.table.columns;
        };

        $scope.restoreStorage = function () {
            SWEETALERT.confirm({
                message: "This option removes all persisted configuration data for this table, sorting, columns reorder, current page, limit per page, filters, are you sure?",
                confirm: function () {
                    $scope.clearModel();
                    $scope.refresh();
                }
            });
        };
        $scope.reorderColumn = function (storage_columns) {
            var ordered = {};
            for (let obj of storage_columns) {
                eval("ordered." + obj + " = $scope.table.crud.table.columns." + obj);
            }
            return ordered;
        };

        /*Validation******************************/
        $scope.stopInteraction = function () {
            return $scope.table.is.loading;
        };
        /*Validation******************************/

        $scope.afterData = function (data) {
            PAGINATOR.make($scope, data);
            ANIMATION.stoploading("#" + $scope.modelName + "TablePanel", ".loadingButton");
            $scope.table.is.loading = false;
            FIXELEMENT.add($scope.modelName + "head");
        };

        $scope.refresh = function () {
            ANIMATION.loading("#" + $scope.modelName + "TablePanel", "Refresing " + $scope.plural + " List...", ".loadingButton");
            $scope.table.is.loading = true;

            if (STORAGE.hasPage($scope))
                $scope.table.currentPage = STORAGE.getPage($scope);
            if ($scope.hasModel("limit")) {
                $scope.table.currentLimit = parseInt($scope.getModel('limit'));
            }
            if ($scope.hasModel("sortcolumn")) {
                $scope.table.orderby = $scope.getModel('sortcolumn');
            }
            if ($scope.hasModel("sortorder")) {
                $scope.table.order = $scope.getModel('sortorder');
            }

            setTimeout(function () {
                if ($scope.table.loaded !== true) {
                    $scope.table.loaded = true;
                    ANIMATION.play("#" + $scope.modelName + "Table");
                    $scope.list(
                        {
                            limit: $scope.table.currentLimit,
                            page: $scope.table.currentPage,
                            orderby: $scope.table.orderby,
                            order: $scope.table.order
                        }, function (data) {
                            $scope.afterData(data);
                            DRAG.run($scope);
                        });
                } else {
                    $scope.list(
                        {
                            limit: $scope.table.currentLimit,
                            page: $scope.table.currentPage,
                            orderby: $scope.table.orderby,
                            order: $scope.table.order
                        }, function (data) {
                            $scope.afterData(data);
                        });
                }
            }, 0);
        };
    }
};