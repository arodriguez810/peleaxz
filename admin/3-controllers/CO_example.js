app.controller("example", function ($scope, $http, $compile) {
    example = this;
    //example.singular = "singular";
    //example.plural = "plural";
    //example.headertitle = "Hola Title";
    example.destroyForm = false;
    RUNCONTROLLER("example", example, $scope, $http, $compile);
    RUN_B("example", example, $scope, $http, $compile);
    // $scope.triggers.table.after.control = function (data) {
    //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    // };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
});