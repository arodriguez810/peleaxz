CRUD = {
    run: function ($scope, crud) {
        $scope.crud = crud;
        $scope.table.crud = crud;
        $scope.isBatch = function () {
            return $scope.table.crud.batch !== false;
        };
    }
};