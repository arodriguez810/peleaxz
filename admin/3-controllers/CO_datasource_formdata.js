app.controller("datasource_formdata", function ($scope, $http, $compile) {
    datasource_formdata = this;
    //datasource_formdata.fixFilters = [];
    //datasource_formdata.singular = "singular";
    //datasource_formdata.plural = "plural";
    //datasource_formdata.headertitle = "Hola Title";
    //datasource_formdata.destroyForm = false;
    //datasource_formdata.permissionTable = "tabletopermission";
    RUNCONTROLLER("datasource_formdata", datasource_formdata, $scope, $http, $compile);
    datasource_formdata.formulary = function (data, mode, defaultData) {
        if (datasource_formdata !== undefined) {
            RUN_B("datasource_formdata", datasource_formdata, $scope, $http, $compile);
            datasource_formdata.form.modalWidth = ENUM.modal.width.full;
            datasource_formdata.form.readonly = {};
            datasource_formdata.createForm(data, mode, defaultData);
            //ms_product.selectQueries['datasource'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("datasource_formdata.datasource", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_formdata, 'datasource', rules);
            });
            $scope.$watch("datasource_formdata.key", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_formdata, 'key', rules);
            });
            $scope.$watch("datasource_formdata.value", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_formdata, 'value', rules);
            });
            $scope.$watch("datasource_formdata.varaible", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_formdata, 'varaible', rules);
            });
        }
    };
    // datasource_formdata.triggers.table.after.load = function (records) {
    //     //datasource_formdata.runMagicOneToOne('@column');
    //     //datasource_formdata.runMagicOneToMany('@column', '@tablerelation', '@fieldrelation');
    //     //datasource_formdata.runMagicManyToMany('@thistable', '@tabledescription', '@idfromManyToManyTable');
    //     //console.log(`datasource_formdata.triggers.table.after.load datasource_formdata`);
    // };
    // datasource_formdata.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_formdata.triggers.table.before.load datasource_formdata`);
    //     resolve(true);
    // });
    //
    // datasource_formdata.triggers.table.after.open = function (data) {
    //     //console.log(`datasource_formdata.triggers.table.after.open datasource_formdata`);
    // };
    // datasource_formdata.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_formdata.triggers.table.before.open datasource_formdata`);
    //     resolve(true);
    // });
    //
    // datasource_formdata.triggers.table.after.close = function (data) {
    //     //console.log(`datasource_formdata.triggers.table.after.close datasource_formdata`);
    // };
    // datasource_formdata.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_formdata.triggers.table.before.close datasource_formdata`);
    //     resolve(true);
    // });
    //
    // datasource_formdata.triggers.table.after.insert = function (data) {
    //     //console.log(`datasource_formdata.triggers.table.after.insert datasource_formdata`);
    //     return true;
    // };
    // datasource_formdata.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_formdata.triggers.table.before.insert datasource_formdata`);
    //     resolve(true);
    // });
    //
    // datasource_formdata.triggers.table.after.update = function (data) {
    //     //console.log(`datasource_formdata.triggers.table.after.update datasource_formdata`);
    // };
    // datasource_formdata.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_formdata.triggers.table.before.update datasource_formdata`);
    //     resolve(true);
    // });
    //
    // datasource_formdata.triggers.table.after.control = function (data) {
    //     //console.log(`datasource_formdata.triggers.table.after.control datasource_formdata ${data}`);
    // };
    // datasource_formdata.triggers.table.before.control = function (data) {
    //     //console.log(`datasource_formdata.triggers.table.before.control datasource_formdata ${data}`);
    // };
    //datasource_formdata.beforeDelete = function (data) {
    //    return false;
    //};
    //datasource_formdata.afterDelete = function (data) {
    //};
});