app.controller("dragon_function_query", function ($scope, $http, $compile) {
    dragon_function_query = this;
    //dragon_function_query.fixFilters = [];
    //dragon_function_query.singular = "singular";
    //dragon_function_query.plural = "plural";
    dragon_function_query.headertitle = MESSAGE.ic("columns.query_plural");
    //dragon_function_query.destroyForm = false;
    //dragon_function_query.permissionTable = "tabletopermission";
    RUNCONTROLLER("dragon_function_query", dragon_function_query, $scope, $http, $compile);
    dragon_function_query.formulary = function (data, mode, defaultData) {
        if (dragon_function_query !== undefined) {
            RUN_B("dragon_function_query", dragon_function_query, $scope, $http, $compile);
            dragon_function_query.form.modalWidth = ENUM.modal.width.full;
            dragon_function_query.form.readonly = {};
            dragon_function_query.createForm(data, mode, defaultData);
            //ms_product.selectQueries['dragon_query'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];

        }
    };
    dragon_function_query.triggers.table.after.load = function (records) {
        dragon_function_query.runMagicOneToOne('dragon_query');
        //dragon_function_query.runMagicOneToMany('@column', '@tablerelation', '@fieldrelation');
        //dragon_function_query.runMagicManyToMany('@thistable', '@tabledescription', '@idfromManyToManyTable');
        //console.log(`dragon_function_query.triggers.table.after.load dragon_function_query`);
    };
    // dragon_function_query.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_function_query.triggers.table.before.load dragon_function_query`);
    //     resolve(true);
    // });
    //
    // dragon_function_query.triggers.table.after.open = function (data) {
    //     //console.log(`dragon_function_query.triggers.table.after.open dragon_function_query`);
    // };
    // dragon_function_query.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_function_query.triggers.table.before.open dragon_function_query`);
    //     resolve(true);
    // });
    //
    // dragon_function_query.triggers.table.after.close = function (data) {
    //     //console.log(`dragon_function_query.triggers.table.after.close dragon_function_query`);
    // };
    // dragon_function_query.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_function_query.triggers.table.before.close dragon_function_query`);
    //     resolve(true);
    // });
    //
    // dragon_function_query.triggers.table.after.insert = function (data) {
    //     //console.log(`dragon_function_query.triggers.table.after.insert dragon_function_query`);
    //     return true;
    // };
    // dragon_function_query.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`dragon_function_query.triggers.table.before.insert dragon_function_query`);
    //     resolve(true);
    // });
    //
    // dragon_function_query.triggers.table.after.update = function (data) {
    //     //console.log(`dragon_function_query.triggers.table.after.update dragon_function_query`);
    // };
    // dragon_function_query.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`dragon_function_query.triggers.table.before.update dragon_function_query`);
    //     resolve(true);
    // });
    //
    // dragon_function_query.triggers.table.after.control = function (data) {
    //     //console.log(`dragon_function_query.triggers.table.after.control dragon_function_query ${data}`);
    // };
    // dragon_function_query.triggers.table.before.control = function (data) {
    //     //console.log(`dragon_function_query.triggers.table.before.control dragon_function_query ${data}`);
    // };
    //dragon_function_query.beforeDelete = function (data) {
    //    return false;
    //};
    //dragon_function_query.afterDelete = function (data) {
    //};
});