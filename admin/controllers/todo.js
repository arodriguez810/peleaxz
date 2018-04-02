var url = window.location.pathname;
var modelName = url.substring(url.lastIndexOf('/') + 1);

app.controller(modelName + 'Controller', function ($scope, $http) {
    $scope.formData = {};
    basicMethods($scope, $http, modelName);
    $scope.todo.list(function (data) {
        $scope.todoList = data;
    });
});