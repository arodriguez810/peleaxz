app.controller('my_verController', function ($scope, $http, $compile) {
    var my_verController = this;
    basicMethods(my_verController, $http, 'my_ver');
    my_verController.list = [];
    my_verController.my_ver.list(function (data) {
        my_verController.list = data;
    });
});