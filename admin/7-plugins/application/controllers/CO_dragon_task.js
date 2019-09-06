app.controller("dragon_task", function ($scope, $http, $compile) {
    dragon_task = this;
    //dragon_task.fixFilters = [];
    //dragon_task.singular = "singular";
    //dragon_task.plural = "plural";
    //dragon_task.headertitle = "Hola Title";
    //dragon_task.destroyForm = false;
    //dragon_task.permissionTable = "tabletopermission";
    RUNCONTROLLER("dragon_task", dragon_task, $scope, $http, $compile);
    dragon_task.formulary = function (data, mode, defaultData) {
        if (dragon_task !== undefined) {
            RUN_B("dragon_task", dragon_task, $scope, $http, $compile);
            dragon_task.form.modalWidth = ENUM.modal.width.full;
            dragon_task.form.readonly = {};
            dragon_task.createForm(data, mode, defaultData);
            $scope.$watch("dragon_task.name", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_task, 'name', rules);
            });
            $scope.$watch("dragon_task.description", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_task, 'description', rules);
            });
            $scope.$watch("dragon_task.script", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_task, 'script', rules);
            });
            $scope.$watch("dragon_task.second", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_task, 'second', rules);
            });
            $scope.$watch("dragon_task.minute", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_task, 'minute', rules);
            });
            $scope.$watch("dragon_task.hour", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_task, 'hour', rules);
            });
            $scope.$watch("dragon_task.day", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_task, 'day', rules);
            });
            $scope.$watch("dragon_task.month", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_task, 'month', rules);
            });
            $scope.$watch("dragon_task.year", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_task, 'year', rules);
            });
            $scope.$watch("dragon_task.dayOfWeek", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_task, 'dayOfWeek', rules);
            });
            $scope.$watch("dragon_task.start", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_task, 'start', rules);
            });
            $scope.$watch("dragon_task.end", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_task, 'end', rules);
            });
            $scope.$watch("dragon_task.enabled", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_task, 'enabled', rules);
            });
        }
    };
    // dragon_task.triggers.table.after.load = function (records) {
    //     //dragon_task.runMagicOneToOne('@column');
    //     //dragon_task.runMagicOneToMany('@column', '@tablerelation', '@fieldrelation');
    //     //dragon_task.runMagicManyToMany('@thistable', '@tabledescription', '@idfromManyToManyTable');
    //     //console.log(`dragon_task.triggers.table.after.load dragon_task`);
    // };
    // dragon_task.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_task.triggers.table.before.load dragon_task`);
    //     resolve(true);
    // });
    //
    // dragon_task.triggers.table.after.open = function (data) {
    //     //console.log(`dragon_task.triggers.table.after.open dragon_task`);
    // };
    // dragon_task.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_task.triggers.table.before.open dragon_task`);
    //     resolve(true);
    // });
    //
    // dragon_task.triggers.table.after.close = function (data) {
    //     //console.log(`dragon_task.triggers.table.after.close dragon_task`);
    // };
    // dragon_task.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`dragon_task.triggers.table.before.close dragon_task`);
    //     resolve(true);
    // });
    //
    // dragon_task.triggers.table.after.insert = function (data) {
    //     //console.log(`dragon_task.triggers.table.after.insert dragon_task`);
    //     return true;
    // };
    // dragon_task.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`dragon_task.triggers.table.before.insert dragon_task`);
    //     resolve(true);
    // });
    //
    // dragon_task.triggers.table.after.update = function (data) {
    //     //console.log(`dragon_task.triggers.table.after.update dragon_task`);
    // };
    // dragon_task.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`dragon_task.triggers.table.before.update dragon_task`);
    //     resolve(true);
    // });
    //
    // dragon_task.triggers.table.after.control = function (data) {
    //     //console.log(`dragon_task.triggers.table.after.control dragon_task ${data}`);
    // };
    // dragon_task.triggers.table.before.control = function (data) {
    //     //console.log(`dragon_task.triggers.table.before.control dragon_task ${data}`);
    // };
    //dragon_task.beforeDelete = function (data) {
    //    return false;
    //};
    //dragon_task.afterDelete = function (data) {
    //};
});