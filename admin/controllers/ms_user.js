app.controller('userController', function ($scope, $http, $compile) {
    var userController = this;
    basicMethods(userController, $http, 'user');
});