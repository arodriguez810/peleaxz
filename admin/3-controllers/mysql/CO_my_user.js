app.controller("my_user", function ($scope, $http, $compile) {
    my_user = this;
    RUNCONTROLLER("my_user", my_user, $scope, $http, $compile);

    my_user.permissionTable = "my_user";

    my_user.beforeDelete = function (data) {
        alert("sure bye?");
        return false;
    };
    my_user.afterDelete = function (data) {
        alert("good bye ");
        return false;
    };
    my_user.formulary = function (data, mode, defaultData) {
        if (my_user !== undefined) {
            RUN_B("my_user", my_user, $scope, $http, $compile);

            my_user.form.before.insert = function (data) {
                if (data.inserting.username === "mmm") {
                    SWEETALERT.show({message: `El nombre ${data.inserting.username} no es permitido`});
                    return true;
                }
                return false;
            };
            my_user.form.before.update = function (data) {
                if (data.updating.username === "admin") {
                    SWEETALERT.show({message: "El admin no se puede actualizar"});
                    return true;
                }
                return false;
            };
            my_user.form.after.insert = function (data) {
                alert("Bienvenido " + data.inserting.username);
                return false;
            };
            my_user.form.after.update = function (data) {
                alert("Disfruta tus nuevos datos " + data.updating.username);
                return false;
            };

            my_user.form.readonly = {};
            my_user.createForm(data, mode, defaultData);

            my_user.$scope.$watch('my_user.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(my_user, "name", rules);
            });
            my_user.$scope.$watch('my_user.lastname', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(my_user, "lastname", rules);
            });
            my_user.$scope.$watch('my_user.group', function (value) {
                console.log(value);
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(my_user, "group", rules);
            });
            my_user.$scope.$watch('my_user.username', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(my_user, "username", rules);
            });
            my_user.$scope.$watch('my_user.password', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(my_user, "password", rules);
            });
            my_user.$scope.$watch('my_user.email', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(my_user, "email", rules);
            });

        }
    };
});