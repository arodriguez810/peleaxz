app.controller("special", function ($scope, $http, $compile) {
    special = this;
    //special.fixFilters = [];
    //special.singular = "singular";
    //special.plural = "plural";
    //special.headertitle = "Hola Title";
    //special.destroyForm = false;
    //special.permissionTable = "tabletopermission";
    RUNCONTROLLER("special", special, $scope, $http, $compile);
    special.formulary = function (data, mode, defaultData) {
        if (special !== undefined) {
            RUN_B("special", special, $scope, $http, $compile);
            special.form.modalWidth = ENUM.modal.width.full;
            special.form.readonly = {};
            special.createForm(data, mode, defaultData);
            $scope.$watch("special.color", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(special, 'color', rules);
            });
            $scope.$watch("special.location", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(special, 'location', rules);
            });
            $scope.$watch("special.bit", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(special, 'bit', rules);
            });
            $scope.$watch("special.tags", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(special, 'tags', rules);
            });
            $scope.$watch("special.html", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(special, 'html', rules);
            });
        }
    };
});