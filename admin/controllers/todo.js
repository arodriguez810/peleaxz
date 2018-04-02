var url = window.location.pathname;
var modelName = url.substring(url.lastIndexOf('/') + 1);

app.controller(modelName + 'Controller', function ($scope, $http) {
    $scope.model = {};
    basicMethods($scope, $http, modelName);
    $scope.getList = function () {
        $scope.todo.list(function (data) {
            $scope.todoList = data;
        });
    };
    $scope.after = function () {
        $scope.model = {};
        $scope.getList();
    };
    $scope.getList();
});