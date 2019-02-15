CRUD = {
    run: function ($scope, crud) {
        $scope.table = {};
        $scope.crud = crud;
        $scope.table.crud = crud;
        $scope.lastRow = {};
        $scope.activeSET = function (row) {
            if (eval("row." + $scope.activeColumn()) === undefined)
                return true;
            if (DSON.oseaX(row))
                return false;
            var value = eval("row." + $scope.activeColumn());
            return value == 1;
        };
        $scope.isActiveColumn = function (key) {
            var acColumn = $scope.table.crud.table.activeColumn;
            if (acColumn === undefined)
                return false;
            else {
                return key === acColumn;
            }
        };
        $scope.activeColumn = function () {
            var acColumn = $scope.table.crud.table.activeColumn;
            if (acColumn === undefined)
                return undefined;
            else {
                return acColumn;
            }
        };
    }
};