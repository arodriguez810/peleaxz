app.controller("blog", function ($scope, $http, $compile) {
    blog = this;
    RUNCONTROLLER("blog", blog, $scope, $http, $compile);
    blog.formulary = function (data, mode, defaultData) {
        if (blog !== undefined) {
            RUN_B("blog", blog, $scope, $http, $compile);
            blog.form.readonly = {};
            blog.createForm(data, mode, defaultData);
        }
    };
});