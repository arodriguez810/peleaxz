app.controller("hint_fields", function ($scope, $http, $compile) {
    hint_fields = this;
    var user_info = new SESSION().current();
    hint_fields.super = user_info.super;
    if (!user_info.super)
        hint_fields.fixFilters = [{
        field: 'company',
        value: user_info.compania_id
        }];
    hint_fields.singular = MESSAGE.i('columns.hint_fields');;
    hint_fields.plural = MESSAGE.i('columns.hint_fields');;
    hint_fields.headertitle = MESSAGE.i('columns.hint_fields');;
    //hint_fields.destroyForm = false;
    //hint_fields.permissionTable = "tabletopermission";
    ENTITIES = [];
    FIELDS = [];

    for (var i of CONFIG.entities){
        ENTITIES.push({
            id: i.id,
            name: i.displayName
        });
    };

    for (var i of CONFIG.hint_fields){
        // if (DSON.oseaX(i.cousin)){
            FIELDS.push({
                id: i.fieldName,
                name: i.displayName,
                entity: i.entity,
                cousin: i.cousin
            })
        // }
    }

    RUNCONTROLLER("hint_fields", hint_fields, $scope, $http, $compile);
    hint_fields.formulary = function (data, mode, defaultData) {
        if (hint_fields !== undefined) {
            RUN_B("hint_fields", hint_fields, $scope, $http, $compile);
            hint_fields.form.modalWidth = ENUM.modal.width.full;
            hint_fields.form.readonly = {};
            hint_fields.createForm(data, mode, defaultData);
            $scope.$watch("hint_fields.entities", function (value) {
                var rules = [];
                // rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(hint_fields, 'entities', rules);
            });
            $scope.$watch("hint_fields.field_names", function (value) {
                var rules = [];
                // rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(hint_fields, 'field_names', rules);
            });
            $scope.$watch("hint_fields.text", function (value) {
                var rules = [];
                // rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(hint_fields, 'text', rules);
            });
            $scope.$watch("hint_fields.company", function (value) {
                var rules = [];
                // rules here
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(hint_fields, 'company', rules);
            });
        }
    };
    hint_fields.triggers.table.after.load = async function (records) {
        if (!user_info.super){
            CRUD_hint_fields.table.columns.company.visible = false;
            CRUD_hint_fields.table.columns.company.visibleDetail = false;
            CRUD_hint_fields.table.columns.company.dead = true;
            CRUD_hint_fields.table.columns.company.export = false;
            CRUD_hint_fields.table.columns.company.exportExample = false;
            CRUD_hint_fields.table.filters.columns.splice(4, 4);
            CRUD_hint_fields.table.filters.columns.splice(0, 1);
        }
        // if (hint_entity.form.mode != FORM.modes.new){
            hint_fields.runMagicColum('company', 'compania', "id", "nombre");
            hint_fields.refreshAngular();
        // }
    };
    // $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.open = function (data) {
    //     //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // $scope.triggers.table.after.close = function (data) {
    //     //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
    // };
    // $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
    //     //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
    //     resolve(true);
    // });
    //
    // hint_fields.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    hint_fields.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        if (!user_info.super){
            data.inserting.company = user_info.compania_id.toString();
        }
        if (hint_fields.form.selected('field_names') != null){
            if (hint_fields.form.selected('field_names').cousin != undefined)
                data.inserting.cousin = hint_fields.form.selected('field_names').cousin;
            else
                data.inserting.cousin = "";
        }
        // SWEETALERT.confirm({
        //     type: "warning",
        //     title: "Deseas añadir este cambio?",
        //     message: "Este cambio reiniciar el sistema por favor espere...",
        //     confirm: function () {
        //         BASEAPI.ajax.get("/files/restart/",{},function(){
        //             setTimeout(() => {
        //                 location.reload();
        //             }, 5000);
                    resolve(true);
        //         });
        //     }
        // });
    });
    //
    // hint_fields.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    hint_fields.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        if (!user_info.super){
            data.updating.company = user_info.compania_id.toString();
        }
        if (hint_fields.form.selected('field_names') != null){
            if (hint_fields.form.selected('field_names').cousin != undefined)
                data.updating.cousin = hint_fields.form.selected('field_names').cousin;
            else
                data.updating.cousin = "";
        }
        // SWEETALERT.confirm({
        //     type: "warning",
        //     title: "Deseas realizar este cambio?",
        //     message: "Este cambio reiniciar el sistema por favor espere...",
        //     confirm: function () {
        //         BASEAPI.ajax.get("/files/restart/",{},function(){
        //             setTimeout(() => {
        //                 location.reload();
        //             }, 5000);
                    resolve(true);
        //         });
        //     }
        // });

    });
    //
    // hint_fields.triggers.table.after.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    // $scope.triggers.table.before.control = function (data) {
    //     //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
    // };
    //$scope.beforeDelete = function (data) {
    //    return false;
    //};
    //$scope.afterDelete = function (data) {
    //};
});