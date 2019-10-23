app.controller("datasource_function", function ($scope, $http, $compile) {
    datasource_function = this;
    //datasource_function.fixFilters = [];
    //datasource_function.singular = "singular";
    //datasource_function.plural = "plural";
    //datasource_function.headertitle = "Hola Title";
    //datasource_function.destroyForm = false;
    //datasource_function.permissionTable = "tabletopermission";
    RUNCONTROLLER("datasource_function", datasource_function, $scope, $http, $compile);
    datasource_function.formulary = function (data, mode, defaultData) {
        if (datasource_function !== undefined) {
            RUN_B("datasource_function", datasource_function, $scope, $http, $compile);
            datasource_function.form.modalWidth = ENUM.modal.width.full;
            datasource_function.form.readonly = {};
            datasource_function.createForm(data, mode, defaultData);
            $scope.$watch("datasource_function.name", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_function, 'name', rules);
            });
            $scope.$watch("datasource_function.description", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_function, 'description', rules);
            });
        }
    };
    // datasource_function.triggers.table.after.load = function (records) {
    //     //datasource_function.runMagicOneToOne('@column');
    //     //datasource_function.runMagicOneToMany('@column', '@tablerelation', '@fieldrelation');
    //     //datasource_function.runMagicManyToMany('@thistable', '@tabledescription', '@idfromManyToManyTable');
    //     //console.log(`datasource_function.triggers.table.after.load datasource_function`);
    // };
    // datasource_function.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_function.triggers.table.before.load datasource_function`);
    //     resolve(true);
    // });
    //
    // datasource_function.triggers.table.after.open = function (data) {
    //     //console.log(`datasource_function.triggers.table.after.open datasource_function`);
    // };
    // datasource_function.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_function.triggers.table.before.open datasource_function`);
    //     resolve(true);
    // });
    //
    // datasource_function.triggers.table.after.close = function (data) {
    //     //console.log(`datasource_function.triggers.table.after.close datasource_function`);
    // };
    // datasource_function.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_function.triggers.table.before.close datasource_function`);
    //     resolve(true);
    // });
    //
    // datasource_function.triggers.table.after.insert = function (data) {
    //     //console.log(`datasource_function.triggers.table.after.insert datasource_function`);
    //     return true;
    // };
    // datasource_function.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_function.triggers.table.before.insert datasource_function`);
    //     resolve(true);
    // });
    //
    // datasource_function.triggers.table.after.update = function (data) {
    //     //console.log(`datasource_function.triggers.table.after.update datasource_function`);
    // };
    // datasource_function.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_function.triggers.table.before.update datasource_function`);
    //     resolve(true);
    // });
    //
    // datasource_function.triggers.table.after.control = function (data) {
    //     //console.log(`datasource_function.triggers.table.after.control datasource_function ${data}`);
    // };
    // datasource_function.triggers.table.before.control = function (data) {
    //     //console.log(`datasource_function.triggers.table.before.control datasource_function ${data}`);
    // };
    //datasource_function.beforeDelete = function (data) {
    //    return false;
    //};
    //datasource_function.afterDelete = function (data) {
    //};
});