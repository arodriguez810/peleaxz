CRUD = {
    run: function ($scope, crud) {
        $scope.table = {};
        $scope.lastRow = {};
        $scope.activeSET = function (row) {
            if (eval("row." + $scope.activeColumn()) === undefined)
                return true;
            if (DSON.oseaX(row))
                return false;
            var value = eval("row." + $scope.activeColumn());
            return value == 1 || value == "true";
        };
        $scope.isActiveColumn = function (key) {
            var acColumn = eval(`CRUD_${$scope.modelName}`).table.activeColumn;
            if (acColumn === undefined)
                return false;
            else {
                return key === acColumn;
            }
        };
        $scope.activeColumn = function () {
            var acColumn = eval(`CRUD_${$scope.modelName}`).table.activeColumn;
            if (acColumn === undefined)
                return undefined;
            else {
                return acColumn;
            }
        };
    }
};