app.controller("usuario", function ($scope, $http, $compile) {
    usuario = this;
    RUNCONTROLLER("usuario", usuario, $scope, $http, $compile);

    usuario.permissionTable = "usuario";

    usuario.beforeDelete = function (data) {
        alert("sure bye?");
        return false;
    };
    usuario.afterDelete = function (data) {
        alert("good bye ");
        return false;
    };
    usuario.formulary = function (data, mode, defaultData) {
        if (usuario !== undefined) {
            RUN_B("usuario", usuario, $scope, $http, $compile);

            usuario.form.before.insert = function (data) {
                if (data.inserting.username === "mmm") {
                    SWEETALERT.show({message: `El nombre ${data.inserting.username} no es permitido`});
                    return true;
                }
                return false;
            };
            // usuario.form.before.update = function (data) {
            //     if (data.updating.username === "admin") {
            //         SWEETALERT.show({message: "El admin no se puede actualizar"});
            //         return true;
            //     }
            //     return false;
            // };
            usuario.form.after.insert = function (data) {
                alert("Bienvenido " + data.inserting.username);
                return false;
            };
            usuario.form.after.update = function (data) {
                alert("Disfruta tus nuevos datos " + data.updating.username);
                return false;
            };

            usuario.form.readonly = {};
            usuario.createForm(data, mode, defaultData);

            usuario.$scope.$watch('usuario.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(usuario, "name", rules);
            });
            usuario.$scope.$watch('usuario.lastname', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(usuario, "lastname", rules);
            });
            usuario.$scope.$watch('usuario.group', function (value) {
                console.log(value);
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(usuario, "group", rules);
            });
            usuario.$scope.$watch('usuario.username', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(usuario, "username", rules);
            });
            usuario.$scope.$watch('usuario.password', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(usuario, "password", rules);
            });
            usuario.$scope.$watch('usuario.email', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(usuario, "email", rules);
            });

        }
    };
});