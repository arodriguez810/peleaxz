app.controller('todoController', function ($scope, $http) {
    $scope.formData = {};
    $scope.title = "Todo Crud";
    $scope.getList = function () {
        $http.get('/api/todo/list')
            .then(function (data) {
                $scope.todos = data.data;
                console.log(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
    };
    $scope.getList();
    $scope.createTodo = function () {
        $http.post('/api/todo/insert', $scope.formData)
            .then(function (data) {
                $scope.formData = {};
                $scope.getList();
            }, function (data) {
                console.log('Error: ' + data);
            });
    };
    $scope.deleteTodo = function (id) {
        $http.delete('/api/todo/' + id)
            .then(function (data) {
                $scope.getList();
            }, function (data) {
                console.log('Error: ' + data);
            });
    };
});