table = {
    run: function ($scope) {
        /*Validation******************************/
        $scope.stopInteraction = function () {
            return $scope.table.is.loading;
        };
        /*Validation******************************/

        /*CHECK BOX******************************/
        $scope.checkAll = function () {
            if ($scope.stopInteraction()) return false;
            $scope.selected = $scope.checkall;
        };
        $scope.check = function (element) {
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
    }
};