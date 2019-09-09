app.controller("users", function ($scope, $http, $compile) {
    users = this;
    RUNCONTROLLER("users", users, $scope, $http, $compile);
    users.permissionTable = "users";
    users.repeatPasswordMessage = MESSAGE.ic('mono.repeatpassword');
    users.passwordMessage = MESSAGE.ic('mono.password');
    users.formulary = function (data, mode, defaultData) {
        if (users !== undefined) {
            RUN_B("users", users, $scope, $http, $compile);
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
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(users, "group", rules);
            });
            users.$scope.$watch('users.email', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(users, "email", rules);
            });
            users.$scope.$watch('users.username', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(users, "username", rules);

                var rulesPasswprd = [];
                VALIDATION.text.password(rulesPasswprd, users.password, value);
                VALIDATION.validate(users, "password", rulesPasswprd);
            });
            users.$scope.$watch('users.password', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.general.equal(value, users.confirmpassword, users.passwordMessage, users.repeatPasswordMessage));
                VALIDATION.text.password(rules, value, users.username);
                VALIDATION.validate(users, "password", rules);

                var rulesRepeat = [];
                rulesRepeat.push(VALIDATION.general.equal(users.confirmpassword, value, users.repeatPasswordMessage, users.passwordMessage));
                VALIDATION.validate(users, "confirmpassword", rulesRepeat);
            });

            $scope.$watch('users.confirmpassword', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.general.equal(value, users.password, users.repeatPasswordMessage, users.passwordMessage));
                VALIDATION.validate(users, "confirmpassword", rules);

                var rulesRepeat = [];
                rulesRepeat.push(VALIDATION.general.equal(users.password, value, users.passwordMessage, users.repeatPasswordMessage));
                VALIDATION.text.password(rulesRepeat, users.password, users.username);
                VALIDATION.validate(users, "password", rulesRepeat);
            });

            users.$scope.$watch('users.email', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.email(value));
                VALIDATION.validate(users, "email", rules);
            });

        }
    };
});