paginator = {
    run: function ($scope, $http, modelName) {
        /*Paginator******************************/

        $scope.goLimit = function (limit) {
            if ($scope.stopInteraction()) return false;
            if ($scope.table.currentLimit !== limit) {
                $scope.table.currentLimit = limit;
                $scope.pageChanged();
            } else {
                $scope.pageNotChanged();
            }
        };

        $scope.limitActive = function (limit) {
            return $scope.table.currentLimit === limit ? 'active' : '';
        };

        $scope.pageChanged = function () {
            $scope.table.pages[$scope.table.currentPage - 1].class = "spinner";
            $scope.refresh();
        };
        $scope.pageNotChanged = function () {

        };
        $scope.nextPage = function () {
            if ($scope.stopInteraction()) return false;
            if ($scope.table.currentPage < $scope.table.totalPages) {
                $scope.table.currentPage++;
                $scope.pageChanged();
            } else {
                $scope.pageNotChanged();
            }
        };
        $scope.backPage = function () {
            if ($scope.stopInteraction()) return false;
            if ($scope.table.currentPage > 1) {
                $scope.table.currentPage--;
                $scope.pageChanged();
            } else {
                $scope.pageNotChanged();
            }
        };
        $scope.lastPage = function () {
            if ($scope.stopInteraction()) return false;
            if ($scope.table.currentPage !== $scope.table.totalPages) {
                $scope.table.currentPage = $scope.table.totalPages;
                $scope.pageChanged();
            } else {
                $scope.pageNotChanged();
            }
        };
        $scope.firstPage = function () {
            if ($scope.stopInteraction()) return false;
            if ($scope.table.currentPage !== 1) {
                $scope.table.currentPage = 1;
                $scope.pageChanged();
            } else {
                $scope.pageNotChanged();
            }
        };

        $scope.goPage = function (page) {
            if ($scope.stopInteraction()) return false;
            if ($scope.table.currentPage !== page) {
                $scope.table.currentPage = page;
                $scope.pageChanged();
            } else {
                $scope.pageNotChanged();
            }
        };
        /*Paginator******************************/
    }
}