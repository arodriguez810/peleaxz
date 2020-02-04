app.controller("datasource", function ($scope, $http, $compile) {
    datasource = this;
    //datasource.fixFilters = [];
    //datasource.singular = "singular";
    //datasource.plural = "plural";
    //datasource.headertitle = "Hola Title";
    //datasource.destroyForm = false;
    //datasource.permissionTable = "tabletopermission";
    RUNCONTROLLER("datasource", datasource, $scope, $http, $compile);
    datasource.infields = function (field) {
        if (!datasource.form)
            return false;
        if (!datasource.form.selected('datasource_engine'))
            return false;
        return datasource.form.selected('datasource_engine').fields_tags.split(',').indexOf(field) !== -1;
    };
    datasource.formulary = function (data, mode, defaultData) {
        if (datasource !== undefined) {
            RUN_B("datasource", datasource, $scope, $http, $compile);
            datasource.form.modalWidth = ENUM.modal.width.full;
            datasource.form.readonly = {};
            datasource.createForm(data, mode, defaultData);
            $scope.$watch("datasource.name", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource, 'name', rules);
            });
            $scope.$watch("datasource.description", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource, 'description', rules);
            });
            //ms_product.selectQueries['datasource_engine'] = [
            //    {
            //    field: 'id',
            //    operator: '!=',
            //    value: -1
            //    }
            //];
            $scope.$watch("datasource.datasource_engine", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource, 'datasource_engine', rules);
            });
            $scope.$watch("datasource.server", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource, 'server', rules);
            });
            $scope.$watch("datasource.user", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource, 'user', rules);
            });
            $scope.$watch("datasource.password", function (value) {
                var rules = [];
                //rules here
                VALIDATION.validate(datasource, 'password_confirm', rules);
            });

            $scope.$watch("datasource.database", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource, 'database', rules);
            });
            $scope.$watch("datasource.port", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource, 'port', rules);
            });
            $scope.$watch("datasource.query", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource, 'query', rules);
            });
            $scope.$watch("datasource.tns", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource, 'tns', rules);
            });
            $scope.$watch("datasource.url", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(datasource, 'url', rules);
            });
        }
    };
    // datasource.triggers.table.after.load = function (records) {
    //     //datasource.runMagicOneToOne('@column');
    //     //datasource.runMagicOneToMany('@column', '@tablerelation', '@fieldrelation');
    //     //datasource.runMagicManyToMany('@thistable', '@tabledescription', '@idfromManyToManyTable');
    //     //console.log(`datasource.triggers.table.after.load datasource`);
    // };
    // datasource.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource.triggers.table.before.load datasource`);
    //     resolve(true);
    // });
    //
    // datasource.triggers.table.after.open = function (data) {
    //     //console.log(`datasource.triggers.table.after.open datasource`);
    // };
    // datasource.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource.triggers.table.before.open datasource`);
    //     resolve(true);
    // });
    //
    // datasource.triggers.table.after.close = function (data) {
    //     //console.log(`datasource.triggers.table.after.close datasource`);
    // };
    // datasource.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`datasource.triggers.table.before.close datasource`);
    //     resolve(true);
    // });
    //
    // datasource.triggers.table.after.insert = function (data) {
    //     //console.log(`datasource.triggers.table.after.insert datasource`);
    //     return true;
    // };
    // datasource.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource.triggers.table.before.insert datasource`);
    //     resolve(true);
    // });
    //
    // datasource.triggers.table.after.update = function (data) {
    //     //console.log(`datasource.triggers.table.after.update datasource`);
    // };
    // datasource.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
    //     //console.log(`datasource.triggers.table.before.update datasource`);
    //     resolve(true);
    // });
    //
    // datasource.triggers.table.after.control = function (data) {
    //     //console.log(`datasource.triggers.table.after.control datasource ${data}`);
    // };
    // datasource.triggers.table.before.control = function (data) {
    //     //console.log(`datasource.triggers.table.before.control datasource ${data}`);
    // };
    //datasource.beforeDelete = function (data) {
    //    return false;
    //};
    //datasource.afterDelete = function (data) {
    //};
});
