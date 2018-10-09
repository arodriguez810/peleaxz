PAGINATOR = {
    run: function ($scope) {
        $scope.getLimits = function () {
            var limits = $scope.table.crud.table.limits || CONFIG.ui.tables.paginator.limits;
            if(limits.length===0)
                return [10];
            else return limits;
        };

        $scope.table.currentPage = 1;
        $scope.table.currentLimit = $scope.getLimits()[0];
        $scope.table.pages = [];
        $scope.table.totalPags = 0;
        $scope.table.totalCount = 0;
        $scope.table.currentCount = 0;



        $scope.goLimit = function (limit) {
            if ($scope.stopInteraction()) return false;
            if ($scope.table.currentLimit !== limit) {
                $scope.table.currentLimit = limit;
                $scope.table.currentPage = 1;
                STORAGE.savePage($scope);
                if ($scope.characterist('persist'))
                    $scope.saveModel('limit', "table.currentLimit");
                $scope.pageChanged();
            } else {
                $scope.pageNotChanged();
            }
        };

        $scope.limitActive = function (limit) {
            return $scope.table.currentLimit === limit ? String.format("bg-{0}", TAG.navbar) : '';
        };

        $scope.pageChanged = function () {
            STORAGE.savePage($scope);
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

        $scope.pageKey = function (key) {
            if (key === "ArrowLeft")
                $scope.backPage();
            if (key === "ArrowRight")
                $scope.nextPage();
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

        $scope.isFirstPage = function () {
            return $scope.table.currentPage === 1;
        };
        $scope.isLastPage = function () {
            return $scope.table.currentPage === $scope.table.totalPages;
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

        $scope.goPageModal = function () {
            SWEETALERT.goPage($scope);
        };

        $scope.goPage = function (page) {
            if ($scope.stopInteraction()) return false;
            if (page < $scope.table.totalPages + 1) {
                if ($scope.table.currentPage !== page) {
                    $scope.table.currentPage = page;
                    $scope.pageChanged();
                } else {
                    $scope.pageNotChanged();
                }
            }
        };
    },
    make: function ($scope, data) {
        $scope.records = data;
        $scope.table.totalPages = data.totalPage;
        $scope.table.totalCount = data.totalCount;
        $scope.table.currentCount = parseInt(data.count);
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
                current: $scope.table.currentPage === i ? ("active bg-" + TAG.table) : "",
                class: ""
            });
        }
    }
};