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

        /*Rows******************************/
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
        /*Rows******************************/

        /*Info******************************/
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
        /*Info******************************/
        /*Column******************************/

        $scope.columnLabel = function (value, key) {
            var label = value.label || key;
            return capitalize(label);
        };
        $scope.columnVisible = function (value) {
            return value.visible !== false;
        };
        $scope.rowClass = function (row) {
            if (typeof $scope.table.crud.table.rowClass === "function")
                return $scope.table.crud.table.rowClass(row);
            return "";
        };
        /*Column******************************/

        /*Validation******************************/
        $scope.stopInteraction = function () {
            return $scope.table.is.loading;
        };
        /*Validation******************************/

        /*CHECK BOX******************************/
        $scope.checkVisible = function (key) {
            return key === 'id' && $scope.isBatch();
        };

        $scope.checkAll = function () {
            if ($scope.stopInteraction()) return false;
            $scope.selected = $scope.checkall;
        };
        $scope.check = function () {
            if ($scope.stopInteraction()) return false;
            var checkall = true;
            $(".singlecheck").each(function () {
                if ($(this).prop('checked') === false) {
                    checkall = false;
                    return false;
                }
            });
            $scope.checkall = checkall;
        };
        /*CHECK BOX******************************/

        $scope.afterData = function (data) {
            PAGINATOR.make($scope, data);
            ANIMATION.stoploading("#" + $scope.modelName + "TablePanel", ".loadingButton");
            $scope.table.is.loading = false;
        };

        $scope.refresh = function () {
            ANIMATION.loading("#" + $scope.modelName + "TablePanel", "Refresing " + $scope.plural + " List...", ".loadingButton");
            $scope.table.is.loading = true;
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

        $scope.stateText = function () {
            return String.format("{0} order by {1} ", $scope.plural, $scope.table.orderby);
        };
    }
};