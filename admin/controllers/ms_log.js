app.controller('ms_logController', function ($scope, $http, $compile) {
    var ms_logController = this;
    basicMethods(ms_logController, $http, 'ms_log');
    ms_logController.list = [];
    ms_logController.ms_log.list(function (data) {
        ms_logController.list = data;
    });
});