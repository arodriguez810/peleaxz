app.controller('ms_userController', function ($scope, $http, $compile) {
    var ms_userController = this;
    basicMethods(ms_userController, $http, 'ms_user');
    ms_userController.list = [];
    ms_userController.ms_user.list(function (data) {
        ms_userController.list = data;
        console.log(ms_userController.list);
    });
});