table = {
    run: function ($scope, crud) {
        $scope.records = [];
        $scope.CONFIG = CONFIG;
        $scope.table = {
            loaded: false,
            crud: null,
            is: {
                loading: true
            }
        };

        /*Info******************************/
        $scope.tableStatus = function () {
            console.log($scope.table.currentCount);
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
        $scope.rowActive = function (row) {
            return !row.active ? 'bg-' + COLOR.danger + '-300 text-white' : '';
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
            paginator.make($scope, data);
            animation.stoploading("#" + $scope.modelName + "TablePanel", ".loadingButton");
            $scope.table.is.loading = false;
        };

        $scope.refresh = function () {
            animation.loading("#" + $scope.modelName + "TablePanel", "Refresing " + $scope.modelText + " List...", ".loadingButton");
            $scope.table.is.loading = true;
            setTimeout(function () {
                if ($scope.table.loaded !== true) {
                    $scope.table.loaded = true;
                    animation.play("#" + $scope.modelName + "Table");
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