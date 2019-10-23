app.controller("datasource_block", function ($scope, $http, $compile) {
    datasource_block = this;
    //datasource_block.fixFilters = [];
    //datasource_block.singular = "singular";
    //datasource_block.plural = "plural";
    //datasource_block.headertitle = "Hola Title";
    //datasource_block.destroyForm = false;
    //datasource_block.permissionTable = "tabletopermission";
    RUNCONTROLLER("datasource_block", datasource_block, $scope, $http, $compile);
    datasource_block.formulary = function (data, mode, defaultData) {
        if (datasource_block !== undefined) {
            RUN_B("datasource_block", datasource_block, $scope, $http, $compile);
            datasource_block.form.modalWidth = ENUM.modal.width.full;
            datasource_block.form.readonly = {};
            datasource_block.createForm(data, mode, defaultData);
            //ms_product.selectQueries['datasource'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("datasource_block.datasource", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_block, 'datasource', rules);
            });
            $scope.$watch("datasource_block.fields", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_block, 'fields', rules);
            });
            $scope.$watch("datasource_block.datasource_function", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource_block, 'datasource_function', rules);
            });
        }
    };
    // datasource_block.triggers.table.after.load = function (records) {
    //     //datasource_block.runMagicOneToOne('@column');
    //     //datasource_block.runMagicOneToMany('@column', '@tablerelation', '@fieldrelation');
    //     //datasource_block.runMagicManyToMany('@thistable', '@tabledescription', '@idfromManyToManyTable');
    //     //console.log(`datasource_block.triggers.table.after.load datasource_block`);
    // };
    // datasource_block.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_block.triggers.table.before.load datasource_block`);
    //     resolve(true);
    // });
    //
    // datasource_block.triggers.table.after.open = function (data) {
    //     //console.log(`datasource_block.triggers.table.after.open datasource_block`);
    // };
    // datasource_block.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_block.triggers.table.before.open datasource_block`);
    //     resolve(true);
    // });
    //
    // datasource_block.triggers.table.after.close = function (data) {
    //     //console.log(`datasource_block.triggers.table.after.close datasource_block`);
    // };
    // datasource_block.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource_block.triggers.table.before.close datasource_block`);
    //     resolve(true);
    // });
    //
    // datasource_block.triggers.table.after.insert = function (data) {
    //     //console.log(`datasource_block.triggers.table.after.insert datasource_block`);
    //     return true;
    // };
    // datasource_block.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_block.triggers.table.before.insert datasource_block`);
    //     resolve(true);
    // });
    //
    // datasource_block.triggers.table.after.update = function (data) {
    //     //console.log(`datasource_block.triggers.table.after.update datasource_block`);
    // };
    // datasource_block.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource_block.triggers.table.before.update datasource_block`);
    //     resolve(true);
    // });
    //
    // datasource_block.triggers.table.after.control = function (data) {
    //     //console.log(`datasource_block.triggers.table.after.control datasource_block ${data}`);
    // };
    // datasource_block.triggers.table.before.control = function (data) {
    //     //console.log(`datasource_block.triggers.table.before.control datasource_block ${data}`);
    // };
    //datasource_block.beforeDelete = function (data) {
    //    return false;
    //};
    //datasource_block.afterDelete = function (data) {
    //};
});