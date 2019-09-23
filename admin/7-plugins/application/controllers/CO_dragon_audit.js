app.controller("dragon_audit", function ($scope, $http, $compile) {
    dragon_audit = this;
    //dragon_audit.fixFilters = [];
    //dragon_audit.singular = "singular";
    //dragon_audit.plural = "plural";
    //dragon_audit.headertitle = "Hola Title";
    //dragon_audit.destroyForm = false;
    //dragon_audit.permissionTable = "tabletopermission";
    RUNCONTROLLER("dragon_audit", dragon_audit, $scope, $http, $compile);
    dragon_audit.formulary = function (data, mode, defaultData) {
        if (dragon_audit !== undefined) {
            RUN_B("dragon_audit", dragon_audit, $scope, $http, $compile);
            dragon_audit.form.modalWidth = ENUM.modal.width.full;
            dragon_audit.form.readonly = {};
            dragon_audit.createForm(data, mode, defaultData);
            $scope.$watch("dragon_audit.modelname", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_audit, 'modelname', rules);
            });
            $scope.$watch("dragon_audit.action", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_audit, 'action', rules);
            });
            $scope.$watch("dragon_audit.dataJson", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_audit, 'dataJson', rules);
            });
            $scope.$watch("dragon_audit.date", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_audit, 'date', rules);
            });
            $scope.$watch("dragon_audit.version", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_audit, 'version', rules);
            });
            $scope.$watch("dragon_audit.ip", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_audit, 'ip', rules);
            });
        }
    };
    // dragon_audit.triggers.table.after.load = function (records) {
    //     //dragon_audit.runMagicColum('@thistable', '@thisfield','@relationtable','@relationfield');
    //     //console.log(`dragon_audit.triggers.table.after.load dragon_audit`);
    // };
    // dragon_audit.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_audit.triggers.table.before.load dragon_audit`);
    //     resolve(true);
    // });
    //
    // dragon_audit.triggers.table.after.open = function (data) {
    //     //console.log(`dragon_audit.triggers.table.after.open dragon_audit`);
    // };
    // dragon_audit.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_audit.triggers.table.before.open dragon_audit`);
    //     resolve(true);
    // });
    //
    // dragon_audit.triggers.table.after.close = function (data) {
    //     //console.log(`dragon_audit.triggers.table.after.close dragon_audit`);
    // };
    // dragon_audit.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_audit.triggers.table.before.close dragon_audit`);
    //     resolve(true);
    // });
    //
    // dragon_audit.triggers.table.after.insert = function (data) {
    //     //console.log(`dragon_audit.triggers.table.after.insert dragon_audit`);
    //     return true;
    // };
    // dragon_audit.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`dragon_audit.triggers.table.before.insert dragon_audit`);
    //     resolve(true);
    // });
    //
    // dragon_audit.triggers.table.after.update = function (data) {
    //     //console.log(`dragon_audit.triggers.table.after.update dragon_audit`);
    // };
    // dragon_audit.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`dragon_audit.triggers.table.before.update dragon_audit`);
    //     resolve(true);
    // });
    //
    // dragon_audit.triggers.table.after.control = function (data) {
    //     //console.log(`dragon_audit.triggers.table.after.control dragon_audit ${data}`);
    // };
    // dragon_audit.triggers.table.before.control = function (data) {
    //     //console.log(`dragon_audit.triggers.table.before.control dragon_audit ${data}`);
    // };
    //dragon_audit.beforeDelete = function (data) {
    //    return false;
    //};
    //dragon_audit.afterDelete = function (data) {
    //};
});