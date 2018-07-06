app.controller('ms_userController', function ($scope, $http, $compile) {
    var ms_userController = this;
    basicMethods(ms_userController, $http, 'ms_user');
    ms_userController.list = [];
    ms_userController.table = {
        loaded: false,
        crud: null
    };
    ms_userController.refresh = function () {
        animation.loading("#ms_userTable", "Refresing Users List...", "#loadingButton");
        setTimeout(function () {
            if (ms_userController.table.crud == null) {
                ms_userController.ms_user.crud(function (crud) {
                    ms_userController.crud = crud;
                    ms_userController.table.crud = crud;
                    ms_userController.table.loaded = true;
                    animation.play("#ms_userTable");
                    ms_userController.ms_user.list(function (data) {
                        ms_userController.list = data;
                        animation.stoploading("#ms_userTable", "#loadingButton");
                    });
                });
            } else {
                ms_userController.ms_user.list(function (data) {
                    ms_userController.list = data;
                    animation.stoploading("#ms_userTable", "#loadingButton");
                });
            }
        }, 3000);
    };
    ms_userController.refresh();
});