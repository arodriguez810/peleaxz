paginator = {
    run: function ($scope) {
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
            console.log('last');
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
    },
    make: function ($scope, data) {
        $scope.records = data;
        $scope.table.totalPages = data.totalPage;
        $scope.table.pages = [];
        var halfOfRange = Math.ceil(CONFIG.ui.tables.paginator.range / 2);
        var initPaginator = $scope.table.currentPage - halfOfRange;
        initPaginator = initPaginator <= 0 ? 1 : initPaginator;
        initPaginator = initPaginator > (data.totalPage - CONFIG.ui.tables.paginator.range) ? (data.totalPage - CONFIG.ui.tables.paginator.range) : initPaginator;
        initPaginator = initPaginator <= 0 ? 1 : initPaginator;
        var lastPaginator = $scope.table.currentPage + halfOfRange;
        lastPaginator = lastPaginator < CONFIG.ui.tables.paginator.range ? CONFIG.ui.tables.paginator.range : lastPaginator;
        lastPaginator = lastPaginator > data.totalPage ? data.totalPage : lastPaginator;
        for (var i = initPaginator; i <= lastPaginator; i++) {
            $scope.table.pages.push({
                number: i,
                current: $scope.table.currentPage === i ? "active" : "",
                class: ""
            });
        }
    }
};