TABLE = {
    run: function ($scope) {
        $scope.records = [];
        $scope.table.loading = false;
        $scope.table.is = {};
        $scope.table.loaded = false;
        $scope.table.is.loading = true;
        $scope.funcWidth = eval(`CRUD_${$scope.modelName}`).table.width;
        $scope.report = eval(`CRUD_${$scope.modelName}`).table.report;
        $scope.tableParams = eval(`CRUD_${$scope.modelName}`).table.params || false;
        $scope.tableOrView = eval(`CRUD_${$scope.modelName}`).table.view || $scope.modelName;
        $scope.tableOrMethod = eval(`CRUD_${$scope.modelName}`).table.method || $scope.modelName;
        $scope.dragrow = eval(`CRUD_${$scope.modelName}`).table.dragrow;
        if ($scope.dragrow !== false) {
            eval(`CRUD_${$scope.modelName}`).table.sort = $scope.dragrow;
            eval(`CRUD_${$scope.modelName}`).table.sortable = false;
        }
        $scope.changeOrder = async function (from, to, el) {
            if (from !== to) {
                setTimeout(async () => {
                    var rows = document.getElementById($scope.modelName + "Table").rows;
                    var currents = [];
                    var nums = [];
                    var ordered = [];
                    for (var i = 1; i < rows.length; i++) {
                        currents.push(eval("(" + rows.item(i).getAttribute('data-object') + ")"));
                        nums.push(parseInt(ARRAY.last(currents)[$scope.dragrow]));
                        ordered.push(parseInt(ARRAY.last(currents)[$scope.dragrow]));
                    }
                    ordered.sort((a, b) => a - b);
                    for (var i = 0; i < currents.length; i++) {
                        var first = currents[i];
                        var dataTOUpdate = {where: [{value: first.id}]};
                        dataTOUpdate[$scope.dragrow] = ordered[i];
                        await BASEAPI.updateallp($scope.tableOrMethod, dataTOUpdate);
                    }
                    $scope.refresh();
                }, 500);
            }
        };
        $scope.runMagicColum = (column, table, key, description) => new Promise(async (resolve, reject) => {
            key = key || "id";
            description = description || "name";
            var result = await BASEAPI.listp(table, {});
            eval(`${column}List = result;`);
            eval(`${column}List = ${column}List.data;`);

            eval(`${$scope.modelName}.records.data.forEach(row => {
                var thistype = ${column}List.filter(d => {
                    if (row.${column} !== undefined)
                        return d.${key}.toString() === row.${column}.toString();
                    return false;
                });
                if (thistype.length > 0)
                    row.${column} = thistype[0].${description};
            });
            ${$scope.modelName}.refreshAngular();`);
            resolve(true);
        });
        $scope.width = function () {
            if (!DSON.oseaX(eval(`CRUD_${$scope.modelName}`).table.width)) {
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
                    for (var r in eval(`CRUD_${$scope.modelName}`).table.responsive) {
                        var number = r.substr(1, r.length - 1);
                        if (index >= number) {
                            column.responsive = eval(`CRUD_${$scope.modelName}`).table.responsive[r];
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
            for (const key in eval(`CRUD_${$scope.modelName}`).table.columns) {
                if (eval(`CRUD_${$scope.modelName}`).table.columns[key].visible === false)
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
            eval(`CRUD_${$scope.modelName}`).table.columns[key].visible = true;
            STORAGE.add($scope.modelName + "." + 'hideColumns', hides);
            $scope.width();
        };
        $scope.showallColumn = function () {
            for (const key in eval(`CRUD_${$scope.modelName}`).table.columns) {
                eval(`CRUD_${$scope.modelName}`).table.columns[key].visible = true;
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
                for (const key in eval(`CRUD_${$scope.modelName}`).table.columns) {
                    if (eval(`CRUD_${$scope.modelName}`).table.columns.hasOwnProperty(key)) {
                        if (ARRAY.contains(hides, key)) {
                            eval(`CRUD_${$scope.modelName}`).table.columns[key].visible = false;
                        }
                    }
                }
                reorded = eval(`CRUD_${$scope.modelName}`).table.columns;
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
                for (const key in eval(`CRUD_${$scope.modelName}`).table.columns) {
                    if (eval(`CRUD_${$scope.modelName}`).table.columns.hasOwnProperty(key)) {
                        if (ARRAY.contains(hides, key)) {
                            eval(`CRUD_${$scope.modelName}`).table.columns[key].visible = false;
                        }
                    }
                }
                return eval(`CRUD_${$scope.modelName}`).table.columns;
            }
        };
        $scope.restoreStorage = function () {

            if (!$scope.hasAnyModel()) {
                SWEETALERT.show({message: MESSAGE.i('restore.norestore')});
            } else
                SWEETALERT.confirm({
                    message:
                        MESSAGE.i('restore.yesrestore'),
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
                eval("ordered." + obj + " = eval(`CRUD_${$scope.modelName}`).table.columns." + obj);
                if (ARRAY.contains(hides, obj)) {
                    eval("eval(`CRUD_${$scope.modelName}`).table.columns." + obj + ".visible = false;");
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
            new ANIMATION().stoploading(
                "#" + $scope.modelName + "TablePanel",
                ".loadingButton"
            );
            $scope.table.is.loading = false;
            $scope.width();
            MESSAGE.run();
            $scope.triggers.table.after.load($scope.records);
        };
        $scope.fixFiltersApply = function () {
            if ($scope.fixFilters !== undefined)
                return $scope.fixFilters;
            else
                return [];
        };
        $scope.filtersApply = function (dataToList) {

            for (var i in dataToList.where) {
                if (dataToList.where[i].guarduroField !== undefined) {
                    delete dataToList.where.splice(i, 1);
                }
            }
            if (!DSON.oseaX($scope.filters))
                if (!DSON.oseaX($scope.filters.lastFilter))
                    if ($scope.filters.lastFilter.length > 0) {
                        if (dataToList.where === undefined)
                            dataToList.where = [];
                        for (var i in dataToList.where) {
                            if (dataToList.where[i].guarduroField !== undefined) {
                                delete dataToList.where.splice(i, 1);
                            }
                        }
                        for (const item of $scope.filters.lastFilter) {
                            dataToList.where.push(item);
                        }
                    }
        };
        $scope.changeFilter = function (changeFilter) {
            $scope.fixFilters = changeFilter;
            $scope.refresh();
        };
        $scope.refresh = async function () {
            if (await $scope.triggers.table.before.load() === false)
                return;
            new ANIMATION().loading(
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
            var dataToList = {
                limit: $scope.table.currentLimit,
                page: $scope.table.currentPage,
                orderby: $scope.table.orderby,
                order: $scope.table.order,
                join: eval(`CRUD_${$scope.modelName}`).table.single
            };
            delete dataToList.where;

            if ($scope.table.loaded !== true) {

                dataToList.where = $scope.fixFiltersApply();
                $scope.filtersApply(dataToList);
                if (RELATIONS.anonymous[$scope.modelName] !== undefined) {
                    dataToList.where = RELATIONS.anonymous[$scope.modelName].where;
                }
                if (!DSON.oseaX(ARRAY.last(MODAL.historyObject))) {
                    if (!DSON.oseaX(ARRAY.last(MODAL.historyObject).viewData)) {
                        if (!DSON.oseaX(ARRAY.last(MODAL.historyObject).viewData.data)) {
                            if (DSON.oseaX(dataToList.where))
                                dataToList.where = [];
                            for (const item of ARRAY.last(MODAL.historyObject).viewData.data) {
                                dataToList.where.push(item);
                            }
                        }
                    }
                }

                if ($scope.tableParams)
                    dataToList.params = $scope.tableParams;

                $scope.refreshAngular();
                BASEAPI.list(
                    $scope.tableOrView,
                    dataToList,
                    function (data) {
                        $scope.afterData(data);
                        $scope.table.loaded = true;
                        $scope.refreshAngular();
                        DRAG.run($scope);
                    }
                );
            }
            else {
                dataToList.where = $scope.fixFiltersApply();
                $scope.filtersApply(dataToList);
                if (RELATIONS.anonymous[$scope.modelName] !== undefined) {
                    dataToList.where = RELATIONS.anonymous[$scope.modelName].where;
                }
                if (!DSON.oseaX(ARRAY.last(MODAL.historyObject))) {
                    if (!DSON.oseaX(ARRAY.last(MODAL.historyObject).viewData)) {
                        if (!DSON.oseaX(ARRAY.last(MODAL.historyObject).viewData.data)) {
                            if (DSON.oseaX(dataToList.where))
                                dataToList.where = [];
                            for (const item of ARRAY.last(MODAL.historyObject).viewData.data) {
                                dataToList.where.push(item);
                            }
                        }
                    }
                }

                if ($scope.tableParams)
                    dataToList.params = $scope.tableParams;

                BASEAPI.list(
                    $scope.tableOrView,
                    dataToList,
                    function (data) {
                        $scope.afterData(data);
                        $scope.refreshAngular();
                        DRAG.run($scope);
                    }
                );
            }

        };
    }
};