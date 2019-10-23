app.controller("datasource_variable", function ($scope, $http, $compile) {
    datasource_variable = this;
    //datasource_variable.fixFilters = [];
    //datasource_variable.singular = "singular";
    //datasource_variable.plural = "plural";
    //datasource_variable.headertitle = "Hola Title";
    //datasource_variable.destroyForm = false;
    //datasource_variable.permissionTable = "tabletopermission";
    RUNCONTROLLER("datasource_variable", datasource_variable, $scope, $http, $compile);
    datasource_variable.formulary = function (data, mode, defaultData) {
        if (datasource_variable !== undefined) {
            RUN_B("datasource_variable", datasource_variable, $scope, $http, $compile);
            datasource_variable.form.modalWidth = ENUM.modal.width.full;
            datasource_variable.form.readonly = {};
            datasource_variable.createForm(data, mode, defaultData);
            $scope.$watch("datasource_variable.name", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_variable, 'name', rules);
            });
            $scope.$watch("datasource_variable.description", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_variable, 'description', rules);
            });
            $scope.$watch("datasource_variable.code", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_variable, 'code', rules);
            });
        }
    };
    // datasource_variable.triggers.table.after.load = function (records) {
    //     //datasource_variable.runMagicOneToOne('@column');
    //     //datasource_variable.runMagicOneToMany('@column', '@tablerelation', '@fieldrelation');
    //     //datasource_variable.runMagicManyToMany('@thistable', '@tabledescription', '@idfromManyToManyTable');
    //     //console.log(`datasource_variable.triggers.table.after.load datasource_variable`);
    // };
    // datasource_variable.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_variable.triggers.table.before.load datasource_variable`);
    //     resolve(true);
    // });
    //
    // datasource_variable.triggers.table.after.open = function (data) {
    //     //console.log(`datasource_variable.triggers.table.after.open datasource_variable`);
    // };
    // datasource_variable.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_variable.triggers.table.before.open datasource_variable`);
    //     resolve(true);
    // });
    //
    // datasource_variable.triggers.table.after.close = function (data) {
    //     //console.log(`datasource_variable.triggers.table.after.close datasource_variable`);
    // };
    // datasource_variable.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_variable.triggers.table.before.close datasource_variable`);
    //     resolve(true);
    // });
    //
    // datasource_variable.triggers.table.after.insert = function (data) {
    //     //console.log(`datasource_variable.triggers.table.after.insert datasource_variable`);
    //     return true;
    // };
    // datasource_variable.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_variable.triggers.table.before.insert datasource_variable`);
    //     resolve(true);
    // });
    //
    // datasource_variable.triggers.table.after.update = function (data) {
    //     //console.log(`datasource_variable.triggers.table.after.update datasource_variable`);
    // };
    // datasource_variable.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_variable.triggers.table.before.update datasource_variable`);
    //     resolve(true);
    // });
    //
    // datasource_variable.triggers.table.after.control = function (data) {
    //     //console.log(`datasource_variable.triggers.table.after.control datasource_variable ${data}`);
    // };
    // datasource_variable.triggers.table.before.control = function (data) {
    //     //console.log(`datasource_variable.triggers.table.before.control datasource_variable ${data}`);
    // };
    //datasource_variable.beforeDelete = function (data) {
    //    return false;
    //};
    //datasource_variable.afterDelete = function (data) {
    //};
});