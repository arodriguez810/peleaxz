var controllerName = "ms_all";
app.controller(controllerName, function ($scope, $http, $compile) {
    ms_all = this;
    RUNCONTROLLER(controllerName, ms_all , $scope, $http, $compile);
});