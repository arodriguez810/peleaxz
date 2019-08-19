app.controller("dragon_query", function ($scope, $http, $compile) {
    dragon_query = this;
    //dragon_query.fixFilters = [];
    //dragon_query.singular = "singular";
    //dragon_query.plural = "plural";
    //dragon_query.headertitle = "Hola Title";
    //dragon_query.destroyForm = false;
    //dragon_query.permissionTable = "tabletopermission";
    RUNCONTROLLER("dragon_query", dragon_query, $scope, $http, $compile);
    dragon_query.formulary = function (data, mode, defaultData) {
        if (dragon_query !== undefined) {
            RUN_B("dragon_query", dragon_query, $scope, $http, $compile);
            dragon_query.form.modalWidth = ENUM.modal.width.full;
            dragon_query.form.readonly = {};
            dragon_query.createForm(data, mode, defaultData);
            $scope.$watch("dragon_query.name", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_query, 'name', rules);
            });
            $scope.$watch("dragon_query.query", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_query, 'query', rules);
            });
        }
    };
    // dragon_query.triggers.table.after.load = function (records) {
    //     //dragon_query.runMagicOneToOne('@column');
    //     //dragon_query.runMagicOneToMany('@column', '@tablerelation', '@fieldrelation');
    //     //dragon_query.runMagicManyToMany('@thistable', '@tabledescription', '@idfromManyToManyTable');
    //     //console.log(`dragon_query.triggers.table.after.load dragon_query`);
    // };
    // dragon_query.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_query.triggers.table.before.load dragon_query`);
    //     resolve(true);
    // });
    //
    // dragon_query.triggers.table.after.open = function (data) {
    //     //console.log(`dragon_query.triggers.table.after.open dragon_query`);
    // };
    // dragon_query.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_query.triggers.table.before.open dragon_query`);
    //     resolve(true);
    // });
    //
    // dragon_query.triggers.table.after.close = function (data) {
    //     //console.log(`dragon_query.triggers.table.after.close dragon_query`);
    // };
    // dragon_query.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_query.triggers.table.before.close dragon_query`);
    //     resolve(true);
    // });
    //
    // dragon_query.triggers.table.after.insert = function (data) {
    //     //console.log(`dragon_query.triggers.table.after.insert dragon_query`);
    //     return true;
    // };
    // dragon_query.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`dragon_query.triggers.table.before.insert dragon_query`);
    //     resolve(true);
    // });
    //
    // dragon_query.triggers.table.after.update = function (data) {
    //     //console.log(`dragon_query.triggers.table.after.update dragon_query`);
    // };
    // dragon_query.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`dragon_query.triggers.table.before.update dragon_query`);
    //     resolve(true);
    // });
    //
    // dragon_query.triggers.table.after.control = function (data) {
    //     //console.log(`dragon_query.triggers.table.after.control dragon_query ${data}`);
    // };
    // dragon_query.triggers.table.before.control = function (data) {
    //     //console.log(`dragon_query.triggers.table.before.control dragon_query ${data}`);
    // };
    //dragon_query.beforeDelete = function (data) {
    //    return false;
    //};
    //dragon_query.afterDelete = function (data) {
    //};
});