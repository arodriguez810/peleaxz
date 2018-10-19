TABLE = {
    run: function ($scope, $http, $compile) {
        $scope.records = [];
        $scope.CONFIG = CONFIG;
        $scope.table.loading = false;
        $scope.table.is = {};
        $scope.table.is.loading = true;

        $scope.scrollable = function () {
            return $scope.width() !== "" ? "overflow-x: scroll;overflow-y: visible;" : "";
        };
        $scope.width = function () {
            var count = $scope.columnsCount();
            var width = "";
            if (count > $scope.table.crud.table.offWidth) {
                var margen = count - $scope.table.crud.table.offWidth;
                width = (margen * $scope.table.crud.table.width) + $scope.table.crud.table.baseWidth;
            }
            if (width !== "")
                return $scope.table.crud.table.width !== undefined ? "width:" + width + "px;" : "";
            else
                return "";
        };
        $scope.columnVisible = function (value) {
            return value.visible !== false;
        };

        $scope.hideColumn = function (key) {
            $scope.pushModel("hideColumns", key);
        };

        $scope.columnsCount = function () {
            var reorded = 0;
            if (STORAGE.hasColumns($scope)) {
                var storage_columns = STORAGE.getColumns($scope);
                reorded = $scope.reorderColumn(storage_columns);
            } else {
                var hides = $scope.getModel("hideColumns");
                for (const key in $scope.table.crud.table.columns) {
                    if ($scope.table.crud.table.columns.hasOwnProperty(key)) {
                        if (ARRAY.contains(hides, key)) {
                            $scope.table.crud.table.columns[key].visible = false;
                        }
                    }
                }
                reorded = $scope.table.crud.table.columns;
            }
            var count = 0;
            for (var i in reorded) {
                var column = reorded[i];
                if ($scope.columnVisible(column))
                    count++;
            }
            return count;
        };


        $scope.columns = function () {

            if (STORAGE.hasColumns($scope)) {
                var storage_columns = STORAGE.getColumns($scope);
                return $scope.reorderColumn(storage_columns);
            } else {
                var hides = $scope.getModel("hideColumns");
                for (const key in $scope.table.crud.table.columns) {
                    if ($scope.table.crud.table.columns.hasOwnProperty(key)) {
                        if (ARRAY.contains(hides, key)) {
                            $scope.table.crud.table.columns[key].visible = false;
                        }
                    }
                }
                return $scope.table.crud.table.columns;
            }
        };

        $scope.restoreStorage = function () {
            if (!$scope.hasAnyModel()) {
                SWEETALERT.show({message: "There is not persisted data to restore."});
            } else
                SWEETALERT.confirm({
                    message:
                        "This option removes all persisted configuration data for this table, sorting, columns reorder, current page, limit per page, filters, are you sure?",
                    confirm: function () {
                        $scope.clearModel();
                        location.reload();
                    }
                });
        };

        $scope.reorderColumn = function (storage_columns) {
            var ordered = {};
            var hides = $scope.getModel("hideColumns");
            for (let obj of storage_columns) {
                eval("ordered." + obj + " = $scope.table.crud.table.columns." + obj);
                if (ARRAY.contains(hides, obj)) {
                    eval("$scope.table.crud.table.columns." + obj + ".visible = false;");
                }
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
            ANIMATION.stoploading(
                "#" + $scope.modelName + "TablePanel",
                ".loadingButton"
            );
            $scope.table.is.loading = false;
            CHECKBOX.run();
        };

        $scope.refresh = function () {
            ANIMATION.loading(
                "#" + $scope.modelName + "TablePanel",
                "Refresing " + $scope.plural + " List...",
                ".loadingButton"
            );
            $scope.table.is.loading = true;


            if (STORAGE.hasPage($scope))
                $scope.table.currentPage = STORAGE.getPage($scope);
            if ($scope.hasModel("limit")) {
                $scope.table.currentLimit = parseInt($scope.getModel("limit"));
            }
            if ($scope.hasModel("sortcolumn")) {
                $scope.table.orderby = $scope.getModel("sortcolumn");
            }
            if ($scope.hasModel("sortorder")) {
                $scope.table.order = $scope.getModel("sortorder");
            }

            setTimeout(function () {
                if ($scope.table.loaded !== true) {
                    $scope.table.loaded = true;
                    ANIMATION.play("#" + $scope.modelName + "Table");
                    dataToList = {
                        limit: $scope.table.currentLimit,
                        page: $scope.table.currentPage,
                        orderby: $scope.table.orderby,
                        order: $scope.table.order,
                        join: $scope.table.crud.table.single
                    };
                    if (!DSON.oseaX(ARRAY.last(MODAL.historyObject)))
                        dataToList.where = ARRAY.last(MODAL.historyObject).viewData.data;
                    $scope.list(
                        dataToList,
                        function (data) {
                            $scope.afterData(data);
                            DRAG.run($scope);
                        }
                    );
                } else {
                    dataToList = {
                        limit: $scope.table.currentLimit,
                        page: $scope.table.currentPage,
                        orderby: $scope.table.orderby,
                        order: $scope.table.order,
                        join: $scope.table.crud.table.single
                    };
                    if (!DSON.oseaX(ARRAY.last(MODAL.historyObject)))
                        dataToList.where = ARRAY.last(MODAL.historyObject).viewData.data;
                    $scope.list(
                        dataToList,
                        function (data) {
                            $scope.afterData(data);
                            DRAG.run($scope);
                        }
                    );
                }
            }, 0);
        };
    }
};
