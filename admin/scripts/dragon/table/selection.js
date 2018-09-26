TABLESELECTION = {
    run: function ($scope) {

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

    }
};