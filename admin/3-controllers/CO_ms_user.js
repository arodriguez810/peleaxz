app.controller("ms_user", function ($scope, $http, $compile) {
    ms_user = this;
    RUNCONTROLLER("ms_user", ms_user, $scope, $http, $compile);
    ms_user.formulary = function (data, mode, defaultData) {
        if (ms_user !== undefined) {
            RUN_B("ms_user", ms_user, $scope, $http, $compile);
            ms_user.form.schemas.insert = {
                password: FORM.schemasType.password,
                profileimage: FORM.schemasType.upload
            };
            ms_user.form.schemas.select = {
                password: FORM.schemasType.password
            };
            ms_user.form.readonly = {};
            ms_user.createForm(data, mode, defaultData);
            ms_user.form.rules = {
                name: function () {
                    var rules = [];
                    var value = ms_user.name;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(ms_user, "name", rules)
                },
                lastname: function () {
                    var rules = [];
                    var value = ms_user.lastname;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(ms_user, "lastname", rules)
                },
                username: function () {
                    var rules = [];
                    var value = ms_user.username;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(ms_user, "username", rules)
                },
                password: function () {
                    var rules = [];
                    var value = ms_user.password;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(ms_user, "password", rules)
                },
                email: function () {
                    var rules = [];
                    var value = ms_user.email;
                    rules.push(VALIDATION.text.email(value));
                    return VALIDATION.process(ms_user, "email", rules)
                }
            };
            ms_user.form.rulesGroup = {
                all: function () {
                    return ms_user.validation.stateIcon(ms_user.form.fileds);
                },
            };
        }
    };
});