app.controller("charts", function ($scope, $http, $compile) {
    charts = this;
    RUNCONTROLLER("charts", charts, $scope, $http, $compile);
    RUN_B("charts", charts, $scope, $http, $compile);
});