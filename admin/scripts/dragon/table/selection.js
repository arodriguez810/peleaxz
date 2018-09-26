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
    }
};