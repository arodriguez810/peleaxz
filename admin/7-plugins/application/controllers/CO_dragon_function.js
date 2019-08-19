app.controller("dragon_function", function ($scope, $http, $compile) {
    dragon_function = this;
    //dragon_function.fixFilters = [];
    //dragon_function.singular = "singular";
    //dragon_function.plural = "plural";
    //dragon_function.headertitle = "Hola Title";
    //dragon_function.destroyForm = false;
    //dragon_function.permissionTable = "tabletopermission";
    RUNCONTROLLER("dragon_function", dragon_function, $scope, $http, $compile);
    dragon_function.formulary = function (data, mode, defaultData) {
        if (dragon_function !== undefined) {
            RUN_B("dragon_function", dragon_function, $scope, $http, $compile);
            dragon_function.form.modalWidth = ENUM.modal.width.full;
            dragon_function.form.readonly = {};
            dragon_function.createForm(data, mode, defaultData);
            $scope.$watch("dragon_function.name", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_function, 'name', rules);
            });
            $scope.$watch("dragon_function.description", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_function, 'description', rules);
            });
        }
    };
    // dragon_function.triggers.table.after.load = function (records) {
    //     //dragon_function.runMagicOneToOne('@column');
    //     //dragon_function.runMagicOneToMany('@column', '@tablerelation', '@fieldrelation');
    //     //dragon_function.runMagicManyToMany('@thistable', '@tabledescription', '@idfromManyToManyTable');
    //     //console.log(`dragon_function.triggers.table.after.load dragon_function`);
    // };
    // dragon_function.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_function.triggers.table.before.load dragon_function`);
    //     resolve(true);
    // });
    //
    // dragon_function.triggers.table.after.open = function (data) {
    //     //console.log(`dragon_function.triggers.table.after.open dragon_function`);
    // };
    // dragon_function.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_function.triggers.table.before.open dragon_function`);
    //     resolve(true);
    // });
    //
    // dragon_function.triggers.table.after.close = function (data) {
    //     //console.log(`dragon_function.triggers.table.after.close dragon_function`);
    // };
    // dragon_function.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_function.triggers.table.before.close dragon_function`);
    //     resolve(true);
    // });
    //
    // dragon_function.triggers.table.after.insert = function (data) {
    //     //console.log(`dragon_function.triggers.table.after.insert dragon_function`);
    //     return true;
    // };
    // dragon_function.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`dragon_function.triggers.table.before.insert dragon_function`);
    //     resolve(true);
    // });
    //
    // dragon_function.triggers.table.after.update = function (data) {
    //     //console.log(`dragon_function.triggers.table.after.update dragon_function`);
    // };
    // dragon_function.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`dragon_function.triggers.table.before.update dragon_function`);
    //     resolve(true);
    // });
    //
    // dragon_function.triggers.table.after.control = function (data) {
    //     //console.log(`dragon_function.triggers.table.after.control dragon_function ${data}`);
    // };
    // dragon_function.triggers.table.before.control = function (data) {
    //     //console.log(`dragon_function.triggers.table.before.control dragon_function ${data}`);
    // };
    //dragon_function.beforeDelete = function (data) {
    //    return false;
    //};
    //dragon_function.afterDelete = function (data) {
    //};
});