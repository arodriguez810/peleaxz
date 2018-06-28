app.controller('ms_userController', function ($scope, $http, $compile) {
    var ms_userController = this;
    basicMethods(ms_userController, $http, 'ms_user');
    ms_userController.list = [];
    ms_userController.crud = {};
    animation.loading();
    ms_userController.refresh = function () {
        ms_userController.ms_user.crud(function (crud) {
            ms_userController.crud = crud;
            ms_userController.ms_user.list(function (data) {
                ms_userController.list = data;
                animation.stoploading();
            });
        });
    };
    ms_userController.refresh();
});