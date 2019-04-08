app.controller("ms_all", function ($scope, $http, $compile) {
    ms_all = this;
    ms_all.fixFilters = [
        {
            field: 'id',
            operator: ">",
            value: 1000
        }
    ];
    RUNCONTROLLER("ms_all", ms_all, $scope, $http, $compile);
    ms_all.formulary = function (data, mode, defaultData) {
        if (ms_all !== undefined) {
            RUN_B("ms_all", ms_all, $scope, $http, $compile);

            ms_all.form.modalWidth = ENUM.modal.width.full;
            ms_all.form.titles = {
                new: "Nuevo ALL",
                edit: "`Editar ALL - ${$scope.name}`",
                view: "`Ver ALL - ${$scope.name}`"
            };
            ms_all.form.readonly = {};
            ms_all.createForm(data, mode, defaultData);
            $scope.$watch('ms_all.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.realdata(value));
                VALIDATION.validate(ms_all, "name", rules);
            });
            $scope.$watch('ms_all.child', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_all, "child", rules);
            });
            $scope.$watch('ms_all.products', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.dropdown.atLeast(value, 3));
                rules.push(VALIDATION.dropdown.atLeast(value, 2, true));
                VALIDATION.validate(ms_all, "products", rules);
            });
            $scope.$watch('ms_all.salary', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(DSON.cleanNumber((value || ""))));
                VALIDATION.validate(ms_all, "salary", rules);
            });
            $scope.$watch('ms_all.average', function (value) {
                var rules = [];
                var valueClean = DSON.cleanNumber((value || ""));
                rules.push(VALIDATION.general.required(valueClean));
                rules.push(VALIDATION.number.range(valueClean, 1, 100));
                VALIDATION.validate(ms_all, "average", rules);
            });
            $scope.$watch('ms_all.image_DragonCountFile', function (value) {
                var rules = [];
                rules.push(VALIDATION.file.count(value, 1));
                VALIDATION.validate(ms_all, "image", rules);
            });
            $scope.$watch('ms_all.color', function (value) {
                var rules = [];
                rules.push(VALIDATION.text.noContainsColor(value, ['rgb(255, 0, 0)']));
                VALIDATION.validate(ms_all, "color", rules);
            });
        }
    };
});