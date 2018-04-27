app.controller('userController', function ($scope, $http, $compile) {
    var userController = this;
    userController.supervar = 5;
    basicMethods(userController, $http, 'user');
});