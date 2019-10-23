app.controller("datasource_param", function ($scope, $http, $compile) {
    datasource_param = this;
    //datasource_param.fixFilters = [];
    //datasource_param.singular = "singular";
    //datasource_param.plural = "plural";
    //datasource_param.headertitle = "Hola Title";
    //datasource_param.destroyForm = false;
    //datasource_param.permissionTable = "tabletopermission";
    RUNCONTROLLER("datasource_param", datasource_param, $scope, $http, $compile);
    datasource_param.formulary = function (data, mode, defaultData) {
        if (datasource_param !== undefined) {
            RUN_B("datasource_param", datasource_param, $scope, $http, $compile);
            datasource_param.form.modalWidth = ENUM.modal.width.full;
            datasource_param.form.readonly = {};
            datasource_param.createForm(data, mode, defaultData);
            //ms_product.selectQueries['datasource'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("datasource_param.datasource", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_param, 'datasource', rules);
            });
            $scope.$watch("datasource_param.key", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_param, 'key', rules);
            });
            $scope.$watch("datasource_param.value", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_param, 'value', rules);
            });
            $scope.$watch("datasource_param.varaible", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_param, 'varaible', rules);
            });
        }
    };
    // datasource_param.triggers.table.after.load = function (records) {
    //     //datasource_param.runMagicOneToOne('@column');
    //     //datasource_param.runMagicOneToMany('@column', '@tablerelation', '@fieldrelation');
    //     //datasource_param.runMagicManyToMany('@thistable', '@tabledescription', '@idfromManyToManyTable');
    //     //console.log(`datasource_param.triggers.table.after.load datasource_param`);
    // };
    // datasource_param.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_param.triggers.table.before.load datasource_param`);
    //     resolve(true);
    // });
    //
    // datasource_param.triggers.table.after.open = function (data) {
    //     //console.log(`datasource_param.triggers.table.after.open datasource_param`);
    // };
    // datasource_param.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_param.triggers.table.before.open datasource_param`);
    //     resolve(true);
    // });
    //
    // datasource_param.triggers.table.after.close = function (data) {
    //     //console.log(`datasource_param.triggers.table.after.close datasource_param`);
    // };
    // datasource_param.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_param.triggers.table.before.close datasource_param`);
    //     resolve(true);
    // });
    //
    // datasource_param.triggers.table.after.insert = function (data) {
    //     //console.log(`datasource_param.triggers.table.after.insert datasource_param`);
    //     return true;
    // };
    // datasource_param.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_param.triggers.table.before.insert datasource_param`);
    //     resolve(true);
    // });
    //
    // datasource_param.triggers.table.after.update = function (data) {
    //     //console.log(`datasource_param.triggers.table.after.update datasource_param`);
    // };
    // datasource_param.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_param.triggers.table.before.update datasource_param`);
    //     resolve(true);
    // });
    //
    // datasource_param.triggers.table.after.control = function (data) {
    //     //console.log(`datasource_param.triggers.table.after.control datasource_param ${data}`);
    // };
    // datasource_param.triggers.table.before.control = function (data) {
    //     //console.log(`datasource_param.triggers.table.before.control datasource_param ${data}`);
    // };
    //datasource_param.beforeDelete = function (data) {
    //    return false;
    //};
    //datasource_param.afterDelete = function (data) {
    //};
});