app.controller("information", function ($scope, $http, $compile) {
    information = this;
    information.headertitle = "";
    information.messageAbout = eval(`CONFIG.version.about.${MESSAGE.current().code}`);
    MENUMODAL = false;
    RUNCONTROLLER("information", information, $scope, $http, $compile);
    RUN_B("information", information, $scope, $http, $compile);
});