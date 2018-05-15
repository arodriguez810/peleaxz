app.controller('userController', function ($scope, $http, $compile) {
    var userController = this;
    basicMethods(userController, $http, 'user');
    userController.list = [];
    userController.user.list(function (data) {
        userController.list = data;
    });
});