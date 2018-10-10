CRUD = {
    run: function ($scope, crud) {
        $scope.crud = crud;
        $scope.table.crud = crud;
        $scope.lastRow = {};
        $scope.active = function (row) {
            var value = eval("row." + $scope.activeColumn());
            return value;
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