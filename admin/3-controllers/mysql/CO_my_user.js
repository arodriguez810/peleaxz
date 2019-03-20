app.controller("my_user", function ($scope, $http, $compile) {
    my_user = this;
    RUNCONTROLLER("my_user", my_user, $scope, $http, $compile);
    my_user.formulary = function (data, mode, defaultData) {
        if (my_user !== undefined) {
            RUN_B("my_user", my_user, $scope, $http, $compile);
            my_user.form.schemas.insert = {
                password: FORM.schemasType.password,
                profileimage: FORM.schemasType.upload
            };
            my_user.form.schemas.select = {
                password: FORM.schemasType.password
            };
            my_user.form.readonly = {};
            my_user.createForm(data, mode, defaultData);
            my_user.form.rules = {
                name: function () {
                    var rules = [];
                    var value = my_user.name;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(my_user, "name", rules)
                },
                lastname: function () {
                    var rules = [];
                    var value = my_user.lastname;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(my_user, "lastname", rules)
                },
                username: function () {
                    var rules = [];
                    var value = my_user.username;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(my_user, "username", rules)
                },
                password: function () {
                    var rules = [];
                    var value = my_user.password;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(my_user, "password", rules)
                },
                email: function () {
                    var rules = [];
                    var value = my_user.email;
                    rules.push(VALIDATION.text.email(value));
                    return VALIDATION.process(my_user, "email", rules)
                }
            };
            my_user.form.rulesGroup = {
                all: function () {
                    return my_user.validation.stateIcon(my_user.form.fileds);
                },
            };
        }
    };
});