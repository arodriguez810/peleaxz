app.controller('userController', function ($scope, $http) {
    userController = this;
    basicMethods(userController, $http, 'user');
});