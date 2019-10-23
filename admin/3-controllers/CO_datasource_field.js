app.controller("datasource_field", function ($scope, $http, $compile) {
    datasource_field = this;
    //datasource_field.fixFilters = [];
    //datasource_field.singular = "singular";
    //datasource_field.plural = "plural";
    //datasource_field.headertitle = "Hola Title";
    //datasource_field.destroyForm = false;
    //datasource_field.permissionTable = "tabletopermission";
    RUNCONTROLLER("datasource_field", datasource_field, $scope, $http, $compile);
    datasource_field.formulary = function (data, mode, defaultData) {
        if (datasource_field !== undefined) {
            RUN_B("datasource_field", datasource_field, $scope, $http, $compile);
            datasource_field.form.modalWidth = ENUM.modal.width.full;
            datasource_field.form.readonly = {};
            datasource_field.createForm(data, mode, defaultData);
            $scope.$watch("datasource_field.name", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_field, 'name', rules);
            });
            $scope.$watch("datasource_field.description", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_field, 'description', rules);
            });
            //ms_product.selectQueries['datasource'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("datasource_field.datasource", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_field, 'datasource', rules);
            });
        }
    };
    // datasource_field.triggers.table.after.load = function (records) {
    //     //datasource_field.runMagicOneToOne('@column');
    //     //datasource_field.runMagicOneToMany('@column', '@tablerelation', '@fieldrelation');
    //     //datasource_field.runMagicManyToMany('@thistable', '@tabledescription', '@idfromManyToManyTable');
    //     //console.log(`datasource_field.triggers.table.after.load datasource_field`);
    // };
    // datasource_field.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_field.triggers.table.before.load datasource_field`);
    //     resolve(true);
    // });
    //
    // datasource_field.triggers.table.after.open = function (data) {
    //     //console.log(`datasource_field.triggers.table.after.open datasource_field`);
    // };
    // datasource_field.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_field.triggers.table.before.open datasource_field`);
    //     resolve(true);
    // });
    //
    // datasource_field.triggers.table.after.close = function (data) {
    //     //console.log(`datasource_field.triggers.table.after.close datasource_field`);
    // };
    // datasource_field.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_field.triggers.table.before.close datasource_field`);
    //     resolve(true);
    // });
    //
    // datasource_field.triggers.table.after.insert = function (data) {
    //     //console.log(`datasource_field.triggers.table.after.insert datasource_field`);
    //     return true;
    // };
    // datasource_field.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_field.triggers.table.before.insert datasource_field`);
    //     resolve(true);
    // });
    //
    // datasource_field.triggers.table.after.update = function (data) {
    //     //console.log(`datasource_field.triggers.table.after.update datasource_field`);
    // };
    // datasource_field.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_field.triggers.table.before.update datasource_field`);
    //     resolve(true);
    // });
    //
    // datasource_field.triggers.table.after.control = function (data) {
    //     //console.log(`datasource_field.triggers.table.after.control datasource_field ${data}`);
    // };
    // datasource_field.triggers.table.before.control = function (data) {
    //     //console.log(`datasource_field.triggers.table.before.control datasource_field ${data}`);
    // };
    //datasource_field.beforeDelete = function (data) {
    //    return false;
    //};
    //datasource_field.afterDelete = function (data) {
    //};
});