app.controller('my_userController', function ($scope, $http, $compile) {
    var my_userController = this;
    basicMethods(my_userController, $http, 'my_user');
    my_userController.list = [];
    my_userController.my_user.list(function (data) {
        my_userController.list = data;
    });
});