app.controller("configuration", function ($scope, $http, $compile) {
    console.log(1);
    configuration = this;
    configuration.inputs = [];
    configuration.addRoute = function () {
        configuration.inputs.push({})
    };
    configuration.customfileds = [];
    configuration.addfield = function () {
        configuration.customfileds.push({})
    };
    configuration.insertField = [];
    configuration.addfieldUnsert = function () {
        configuration.insertField.push({})
    };
    configuration.updateField = [];
    configuration.addfieldUpdate = function () {
        configuration.updateField.push({})
    };
    RUNCONTROLLER("configuration", configuration, $scope, $http, $compile);
    RUN_B("configuration", configuration, $scope, $http, $compile);
});