app.controller("view_report", function ($scope, $http, $compile) {
    view_report = this;
    //view_report.fixFilters = [];
    //view_report.singular = "singular";
    //view_report.plural = "plural";
    //view_report.headertitle = "Hola Title";
    //view_report.destroyForm = false;
    //view_report.permissionTable = "tabletopermission";
    RUNCONTROLLER("view_report", view_report, $scope, $http, $compile);
    view_report.formulary = function (data, mode, defaultData) {
        if (view_report !== undefined) {
            RUN_B("view_report", view_report, $scope, $http, $compile);
            view_report.form.modalWidth = ENUM.modal.width.full;
            view_report.form.readonly = {};
            view_report.createForm(data, mode, defaultData);
            $scope.$watch("view_report.basic", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(view_report, 'basic', rules);
            });
            $scope.$watch("view_report.money", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(view_report, 'money', rules);
            });
            $scope.$watch("view_report.percentage", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(view_report, 'percentage', rules);
            });
            $scope.$watch("view_report.normalpassword", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.text.password(rules, value, view_report.normalpassword);
                VALIDATION.validate(view_report, 'normalpassword', rules);

                var rulesRepeat = [];
                rulesRepeat.push(VALIDATION.general.equal(view_report.normalpassword_confirm, value, MESSAGE.ic("mono.normalpassword_confirm"), MESSAGE.ic("mono.normalpassword")));
                VALIDATION.validate(view_report, 'normalpassword_confirm', rulesRepeat);
            });
            $scope.$watch("view_report.normalpassword_confirm", function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.general.equal(value, view_report.normalpassword, MESSAGE.ic("mono.normalpassword_confirm"), MESSAGE.ic("mono.normalpassword")));
                VALIDATION.validate(view_report, 'normalpassword_confirm', rules);

                var rulesRepeat = [];
                rulesRepeat.push(VALIDATION.general.equal(view_report.normalpassword, value, MESSAGE.ic("mono.normalpassword"), MESSAGE.ic("mono.normalpassword_confirm")));
                VALIDATION.text.password(rulesRepeat, view_report.normalpassword, '');
                VALIDATION.validate(view_report, 'normalpassword', rulesRepeat);
            });
            $scope.$watch("view_report.passwordplus", function (value) {
                var rules = [];
                //rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.text.password(rules, value, view_report.passwordplus);
                VALIDATION.validate(view_report, 'passwordplus', rules);

                var rulesRepeat = [];
                rulesRepeat.push(VALIDATION.general.equal(view_report.passwordplus_confirm, value, MESSAGE.ic("mono.passwordplus_confirm"), MESSAGE.ic("mono.passwordplus")));
                VALIDATION.validate(view_report, 'passwordplus_confirm', rulesRepeat);
            });
            $scope.$watch("view_report.passwordplus_confirm", function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.general.equal(value, view_report.passwordplus, MESSAGE.ic("mono.passwordplus_confirm"), MESSAGE.ic("mono.passwordplus")));
                VALIDATION.validate(view_report, 'passwordplus_confirm', rules);

                var rulesRepeat = [];
                rulesRepeat.push(VALIDATION.general.equal(view_report.passwordplus, value, MESSAGE.ic("mono.passwordplus"), MESSAGE.ic("mono.passwordplus_confirm")));
                VALIDATION.text.password(rulesRepeat, view_report.passwordplus, '');
                VALIDATION.validate(view_report, 'passwordplus', rulesRepeat);
            });
            $scope.$watch("view_report.textarea", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(view_report, 'textarea', rules);
            });
            $scope.$watch("view_report.num", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(view_report, 'num', rules);
            });
            $scope.$watch("view_report.phone", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(view_report, 'phone', rules);
            });
            $scope.$watch("view_report.cellphone", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(view_report, 'cellphone', rules);
            });
            $scope.$watch("view_report.integer", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(view_report, 'integer', rules);
            });
            $scope.$watch("view_report.decimal", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(view_report, 'decimal', rules);
            });
            $scope.$watch("view_report.hour", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(view_report, 'hour', rules);
            });
            $scope.$watch("view_report.year", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(view_report, 'year', rules);
            });
            $scope.$watch("view_report.indentification", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(view_report, 'indentification', rules);
            });
            $scope.$watch("view_report.creditcard", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(view_report, 'creditcard', rules);
            });
        }
    };
    // $scope.triggers.table.after.load = function (records) {
    //     //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.close = function (data) {
    //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    // $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.control = function (data) {
    //     //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
    // };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});