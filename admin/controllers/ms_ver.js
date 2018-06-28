app.controller('ms_verController', function ($scope, $http, $compile) {
    var ms_verController = this;
    basicMethods(ms_verController, $http, 'ms_ver');
    ms_verController.list = [];
    ms_verController.ms_ver.list(function (data) {
        ms_verController.list = data;
    });
});