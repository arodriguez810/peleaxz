TABLE = {
    run: function ($scope, $http, $compile) {
        $scope.records = [];
        $scope.CONFIG = CONFIG;
        $scope.table.loading = false;
        $scope.table.is = {};
        $scope.table.is.loading = true;
        $scope.funcWidth = $scope.table.crud.table.width;
        $scope.report = $scope.table.crud.table.report;
        $scope.width = function () {
            if (!DSON.oseaX($scope.table.crud.table.width)) {
                return "";
            }
            else
                for (const key in $scope.columns()) {
                    var index = 1;
                    var column = {};
                    for (var i in $scope.columns()) {
                        column = $scope.columns()[i];
                        if (!$scope.columnVisible(column)) {
                            if (i === key)
                                column.responsive = "hidden";
                            continue;
                        }
                        if (i === key) {
                            break;
                        }
                        index++;
                    }
                    for (var r in $scope.table.crud.table.responsive) {
                        var number = r.substr(1, r.length - 1);
                        if (index >= number) {
                            column.responsive = $scope.table.crud.table.responsive[r];
                            break;
                        } else {
                            continue;
                        }
                    }
                }
        };
        $scope.responsive = function (key) {

        };
        $scope.columnVisible = function (value) {
            return value.visible !== false;
        };
        $scope.hideColumn = function (key) {
            STEP.register({
                scope: $scope.modelName, action: "Hide Column",
                field: key
            });
            $scope.pushModel("hideColumns", key);
            $scope.width();
            $('.dragon-table th').trigger('click');
        };
        $scope.hideColumnsCount = function () {
            for (const key in $scope.table.crud.table.columns) {
                if ($scope.table.crud.table.columns[key].visible === false)
                    return true;
            }
            return false;
        };
        $scope.showColumn = function (key) {
            var hides = $scope.getModel("hideColumns");
            if (!DSON.oseaX(hides))
                hides = hides.filter((hide) => {
                    return hide !== key;
                });
            $scope.table.crud.table.columns[key].visible = true;
            STORAGE.add($scope.modelName + "." + 'hideColumns', hides);
            $scope.width();
        };
        $scope.showallColumn = function () {
            for (const key in $scope.table.crud.table.columns) {
                $scope.table.crud.table.columns[key].visible = true;
            }
            STORAGE.add($scope.modelName + "." + 'hideColumns', []);
            $scope.width();
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
                SWEETALERT.show({message: MESSAGE.i('restore.norestore')});
            } else
                SWEETALERT.confirm({
                    message:
                        "This option removes all persisted configuration data for this table, sorting, columns reorder, current page, limit per page, filters, are you sure?",
                    confirm: function () {
                        STEP.register({
                            scope: $scope.modelName, action: "Restore Configuration",
                            field: "Local " + $scope.modelName
                        });
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
            $scope.width();
            MESSAGE.run();
        };
        $scope.refresh = function () {
            ANIMATION.loading(
                "#" + $scope.modelName + "TablePanel",
                MESSAGE.ic('mono.refresing'),
                ".loadingButton", 140
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
                    dataToList = {
                        limit: $scope.table.currentLimit,
                        page: $scope.table.currentPage,
                        orderby: $scope.table.orderby,
                        order: $scope.table.order,
                        join: $scope.table.crud.table.single
                    };
                    if (!DSON.oseaX(ARRAY.last(MODAL.historyObject))) {
                        if (!DSON.oseaX(ARRAY.last(MODAL.historyObject).viewData))
                            dataToList.where = ARRAY.last(MODAL.historyObject).viewData.data;
                    }
                    if (!DSON.oseaX($scope.filters))
                        if (!DSON.oseaX($scope.filters.lastFilter))
                            if ($scope.filters.lastFilter.length > 0) {
                                if (DSON.oseaX(dataToList.where))
                                    dataToList.where = [];
                                for (const item of $scope.filters.lastFilter) {
                                    dataToList.where.push(item);
                                }
                            }
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
                    if (!DSON.oseaX(ARRAY.last(MODAL.historyObject))) {
                        if (!DSON.oseaX(ARRAY.last(MODAL.historyObject).viewData))
                            dataToList.where = ARRAY.last(MODAL.historyObject).viewData.data;
                    }
                    if (!DSON.oseaX($scope.filters))
                        if (!DSON.oseaX($scope.filters.lastFilter))
                            if ($scope.filters.lastFilter.length > 0) {
                                if (DSON.oseaX(dataToList.where))
                                    dataToList.where = [];
                                for (const item of $scope.filters.lastFilter) {
                                    dataToList.where.push(item);
                                }
                            }

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