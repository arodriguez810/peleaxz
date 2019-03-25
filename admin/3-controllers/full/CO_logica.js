app.controller("logica", function ($scope, $http, $compile) {
    logica = this;
    RUNCONTROLLER("logica", logica, $scope, $http, $compile);
    RUN_B("logica", logica, $scope, $http, $compile);
});