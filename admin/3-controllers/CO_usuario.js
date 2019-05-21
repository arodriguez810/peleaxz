app.controller("users", function ($scope, $http, $compile) {
    users = this;
    RUNCONTROLLER("users", users, $scope, $http, $compile);

    users.permissionTable = "users";

    users.beforeDelete = function (data) {
        alert("sure bye?");
        return false;
    };
    users.afterDelete = function (data) {
        alert("good bye ");
        return false;
    };
    users.formulary = function (data, mode, defaultData) {
        if (users !== undefined) {
            RUN_B("users", users, $scope, $http, $compile);

            users.form.before.insert = function (data) {
                if (data.inserting.username === "mmm") {
                    SWEETALERT.show({message: `El nombre ${data.inserting.username} no es permitido`});
                    return true;
                }
                return false;
            };
            // users.form.before.update = function (data) {
            //     if (data.updating.username === "admin") {
            //         SWEETALERT.show({message: "El admin no se puede actualizar"});
            //         return true;
            //     }
            //     return false;
            // };
            users.form.after.insert = function (data) {
                alert("Bienvenido " + data.inserting.username);
                return false;
            };
            users.form.after.update = function (data) {
                alert("Disfruta tus nuevos datos " + data.updating.username);
                return false;
            };

            users.form.readonly = {};
            users.createForm(data, mode, defaultData);

            users.$scope.$watch('users.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(users, "name", rules);
            });
            users.$scope.$watch('users.lastname', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(users, "lastname", rules);
            });
            users.$scope.$watch('users.group', function (value) {
                console.log(value);
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(users, "group", rules);
            });
            users.$scope.$watch('users.username', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(users, "username", rules);
            });
            users.$scope.$watch('users.password', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(users, "password", rules);
            });
            users.$scope.$watch('users.email', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(users, "email", rules);
            });

        }
    };
});