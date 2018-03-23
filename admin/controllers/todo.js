app.controller('todoController', function ($scope, $http) {
    $scope.formData = {};

    $http.get('/api/todos')
        .then(function (data) {
            $scope.todos = data.data;
            console.log(data);
        }, function (data) {
            console.log('Error: ' + data);
        });

    $scope.createTodo = function () {
        $http.post('/api/todos', $scope.formData)
            .then(function (data) {
                $scope.formData = {};
                $scope.todos = data.data;
                console.log(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteTodo = function (id) {
        $http.delete('/api/todos/' + id)
            .then(function (data) {
                $scope.todos = data.data;
                console.log(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
    };
});