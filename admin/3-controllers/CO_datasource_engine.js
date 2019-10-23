app.controller("datasource_engine", function ($scope, $http, $compile) {
    datasource_engine = this;
    //datasource_engine.fixFilters = [];
    //datasource_engine.singular = "singular";
    //datasource_engine.plural = "plural";
    //datasource_engine.headertitle = "Hola Title";
    //datasource_engine.destroyForm = false;
    //datasource_engine.permissionTable = "tabletopermission";
    RUNCONTROLLER("datasource_engine", datasource_engine, $scope, $http, $compile);
    datasource_engine.formulary = function (data, mode, defaultData) {
        if (datasource_engine !== undefined) {
            RUN_B("datasource_engine", datasource_engine, $scope, $http, $compile);
            datasource_engine.form.modalWidth = ENUM.modal.width.full;
            datasource_engine.form.readonly = {};
            datasource_engine.createForm(data, mode, defaultData);
            $scope.$watch("datasource_engine.name", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_engine, 'name', rules);
            });
            $scope.$watch("datasource_engine.description", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_engine, 'description', rules);
            });
            $scope.$watch("datasource_engine.fields_tags", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_engine, 'fields_tags', rules);
            });
        }
    };
    // datasource_engine.triggers.table.after.load = function (records) {
    //     //datasource_engine.runMagicOneToOne('@column');
    //     //datasource_engine.runMagicOneToMany('@column', '@tablerelation', '@fieldrelation');
    //     //datasource_engine.runMagicManyToMany('@thistable', '@tabledescription', '@idfromManyToManyTable');
    //     //console.log(`datasource_engine.triggers.table.after.load datasource_engine`);
    // };
    // datasource_engine.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_engine.triggers.table.before.load datasource_engine`);
    //     resolve(true);
    // });
    //
    // datasource_engine.triggers.table.after.open = function (data) {
    //     //console.log(`datasource_engine.triggers.table.after.open datasource_engine`);
    // };
    // datasource_engine.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_engine.triggers.table.before.open datasource_engine`);
    //     resolve(true);
    // });
    //
    // datasource_engine.triggers.table.after.close = function (data) {
    //     //console.log(`datasource_engine.triggers.table.after.close datasource_engine`);
    // };
    // datasource_engine.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_engine.triggers.table.before.close datasource_engine`);
    //     resolve(true);
    // });
    //
    // datasource_engine.triggers.table.after.insert = function (data) {
    //     //console.log(`datasource_engine.triggers.table.after.insert datasource_engine`);
    //     return true;
    // };
    // datasource_engine.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_engine.triggers.table.before.insert datasource_engine`);
    //     resolve(true);
    // });
    //
    // datasource_engine.triggers.table.after.update = function (data) {
    //     //console.log(`datasource_engine.triggers.table.after.update datasource_engine`);
    // };
    // datasource_engine.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_engine.triggers.table.before.update datasource_engine`);
    //     resolve(true);
    // });
    //
    // datasource_engine.triggers.table.after.control = function (data) {
    //     //console.log(`datasource_engine.triggers.table.after.control datasource_engine ${data}`);
    // };
    // datasource_engine.triggers.table.before.control = function (data) {
    //     //console.log(`datasource_engine.triggers.table.before.control datasource_engine ${data}`);
    // };
    //datasource_engine.beforeDelete = function (data) {
    //    return false;
    //};
    //datasource_engine.afterDelete = function (data) {
    //};
});