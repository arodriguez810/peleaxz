app.controller("datasource_header", function ($scope, $http, $compile) {
    datasource_header = this;
    //datasource_header.fixFilters = [];
    //datasource_header.singular = "singular";
    //datasource_header.plural = "plural";
    //datasource_header.headertitle = "Hola Title";
    //datasource_header.destroyForm = false;
    //datasource_header.permissionTable = "tabletopermission";
    RUNCONTROLLER("datasource_header", datasource_header, $scope, $http, $compile);
    datasource_header.formulary = function (data, mode, defaultData) {
        if (datasource_header !== undefined) {
            RUN_B("datasource_header", datasource_header, $scope, $http, $compile);
            datasource_header.form.modalWidth = ENUM.modal.width.full;
            datasource_header.form.readonly = {};
            datasource_header.createForm(data, mode, defaultData);
            //ms_product.selectQueries['datasource'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("datasource_header.datasource", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_header, 'datasource', rules);
            });
            $scope.$watch("datasource_header.key", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_header, 'key', rules);
            });
            $scope.$watch("datasource_header.value", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_header, 'value', rules);
            });
            $scope.$watch("datasource_header.varaible", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_header, 'varaible', rules);
            });
        }
    };
    // datasource_header.triggers.table.after.load = function (records) {
    //     //datasource_header.runMagicOneToOne('@column');
    //     //datasource_header.runMagicOneToMany('@column', '@tablerelation', '@fieldrelation');
    //     //datasource_header.runMagicManyToMany('@thistable', '@tabledescription', '@idfromManyToManyTable');
    //     //console.log(`datasource_header.triggers.table.after.load datasource_header`);
    // };
    // datasource_header.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_header.triggers.table.before.load datasource_header`);
    //     resolve(true);
    // });
    //
    // datasource_header.triggers.table.after.open = function (data) {
    //     //console.log(`datasource_header.triggers.table.after.open datasource_header`);
    // };
    // datasource_header.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_header.triggers.table.before.open datasource_header`);
    //     resolve(true);
    // });
    //
    // datasource_header.triggers.table.after.close = function (data) {
    //     //console.log(`datasource_header.triggers.table.after.close datasource_header`);
    // };
    // datasource_header.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_header.triggers.table.before.close datasource_header`);
    //     resolve(true);
    // });
    //
    // datasource_header.triggers.table.after.insert = function (data) {
    //     //console.log(`datasource_header.triggers.table.after.insert datasource_header`);
    //     return true;
    // };
    // datasource_header.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_header.triggers.table.before.insert datasource_header`);
    //     resolve(true);
    // });
    //
    // datasource_header.triggers.table.after.update = function (data) {
    //     //console.log(`datasource_header.triggers.table.after.update datasource_header`);
    // };
    // datasource_header.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_header.triggers.table.before.update datasource_header`);
    //     resolve(true);
    // });
    //
    // datasource_header.triggers.table.after.control = function (data) {
    //     //console.log(`datasource_header.triggers.table.after.control datasource_header ${data}`);
    // };
    // datasource_header.triggers.table.before.control = function (data) {
    //     //console.log(`datasource_header.triggers.table.before.control datasource_header ${data}`);
    // };
    //datasource_header.beforeDelete = function (data) {
    //    return false;
    //};
    //datasource_header.afterDelete = function (data) {
    //};
});