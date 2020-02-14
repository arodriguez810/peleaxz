app.controller("hint_entity", function ($scope, $http, $compile) {
    hint_entity = this;
    var user_info = new SESSION().current();
    hint_entity.super = user_info.super;
    if (!user_info.super)
        hint_entity.fixFilters = [{
            field: 'company',
            value: user_info.compania_id
        }];
    hint_entity.singular = MESSAGE.i('columns.hint_entity');
    hint_entity.plural = MESSAGE.i('columns.hint_entity');
    hint_entity.headertitle = MESSAGE.i('columns.hint_entity');
    //hint_entity.destroyForm = false;
    //hint_entity.permissionTable = "tabletopermission";
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

    RUNCONTROLLER("hint_entity", hint_entity, $scope, $http, $compile);
    hint_entity.formulary = function (data, mode, defaultData) {
        if (hint_entity !== undefined) {
            RUN_B("hint_entity", hint_entity, $scope, $http, $compile);
            hint_entity.form.modalWidth = ENUM.modal.width.full;
            hint_entity.form.readonly = {};
            hint_entity.createForm(data, mode, defaultData);
            $scope.$watch("hint_entity.name", function (value) {
                var rules = [];
                // rules here
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(hint_entity, 'name', rules);
            });
            $scope.$watch("hint_entity.description", function (value) {
                var rules = [];
                rules.push(VALIDATION.yariel.maliciousCode(value));
                VALIDATION.validate(hint_entity, 'description', rules);
            });
        }
    };
    hint_entity.triggers.table.after.load = async function (records) {
        // if (!user_info.super){
        //     CRUD_hint_entity.table.columns.company.visible = false;
        //     CRUD_hint_entity.table.columns.company.visibleDetail = false;
        //     CRUD_hint_entity.table.columns.company.dead = true;
        //     CRUD_hint_entity.table.columns.company.export = false;
        //     CRUD_hint_entity.table.columns.company.exportExample = false;
        //     CRUD_hint_entity.table.filters.columns.splice(4, 4);
        //     CRUD_hint_entity.table.filters.columns.splice(0, 1);
        // }
        // hint_entity.runMagicColum('company', 'compania', "id", "nombre");
        // hint_entity.refreshAngular();
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
    // hint_entity.triggers.table.after.insert = function (data) {
    //     //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
    //     return true;
    // };
    hint_entity.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
        if (!user_info.super){
            data.inserting.company = user_info.compania_id.toString();
        }
        if (hint_fields.company_object != null){
            if (hint_fields.company_object.id != undefined)
                data.inserting.company = hint_fields.company_object.id;
            else
                data.inserting.company = "";
        }
        SWEETALERT.confirm({
            type: "warning",
            title: "Deseas añadir este cambio?",
            message: "Este cambio reiniciar el sistema por favor espere...",
            confirm: function () {
                BASEAPI.ajax.get("/files/restart/",{},function(){
                    setTimeout(() => {
                        location.reload();
                    }, 5000);
                    resolve(true);
                });
            }
        });
    });
    //
    // hint_entity.triggers.table.after.update = function (data) {
    //     //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
    // };
    hint_entity.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
        if (!user_info.super){
            data.updating.company = user_info.compania_id.toString();
        }
        if (hint_fields.company_object != null){
            if (hint_fields.company_object.id != undefined)
                data.updating.company = hint_fields.company_object.id;
            else
                data.updating.company = "";
        }
        SWEETALERT.confirm({
            type: "warning",
            title: "Deseas realizar este cambio?",
            message: "Este cambio reiniciar el sistema por favor espere...",
            confirm: function () {
                BASEAPI.ajax.get("/files/restart/",{},function(){
                    setTimeout(() => {
                        location.reload();
                    }, 5000);
                    resolve(true);
                });
            }
        });

    });
    //
    // hint_entity.triggers.table.after.control = function (data) {
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