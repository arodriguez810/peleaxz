app.controller("view_report", function ($scope, $http, $compile) {
    view_report = this;
    //view_report.fixFilters = [];
    //view_report.singular = "singular";
    //view_report.plural = "plural";
    //view_report.headertitle = "Hola Title";
    RUNCONTROLLER("view_report", view_report, $scope, $http, $compile);
    RUN_B("view_report", view_report, $scope, $http, $compile);
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //Put This in 0-config/security/permission.json
    //"blog": {
        //"type": "report",
        //"allow": {}
    //},
});