app.controller("dates", function ($scope, $http, $compile) {
    dates = this;
    RUNCONTROLLER("dates", dates, $scope, $http, $compile);
    dates.formulary = function (data, mode, defaultData) {
        if (dates !== undefined) {
            RUN_B("dates", dates, $scope, $http, $compile);
            dates.form.readonly = {year: dates.year};
            dates.createForm(data, mode, defaultData);
        }
    };
});