app.controller("oc_user", function ($scope, $http, $compile) {
    oc_user = this;
    RUNCONTROLLER("oc_user", oc_user, $scope, $http, $compile);
    oc_user.formulary = function (data, mode, defaultData) {
        if (oc_user !== undefined) {
            RUN_B("oc_user", oc_user, $scope, $http, $compile);
            oc_user.form.schemas.insert = {
                password: FORM.schemasType.password,
                profileimage: FORM.schemasType.upload
            };
            oc_user.form.schemas.select = {
                password: FORM.schemasType.password
            };
            oc_user.form.readonly = {};
            oc_user.createForm(data, mode, defaultData);
            oc_user.form.rules = {
                name: function () {
                    var rules = [];
                    var value = oc_user.name;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(oc_user, "name", rules)
                },
                lastname: function () {
                    var rules = [];
                    var value = oc_user.lastname;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(oc_user, "lastname", rules)
                },
                username: function () {
                    var rules = [];
                    var value = oc_user.username;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(oc_user, "username", rules)
                },
                password: function () {
                    var rules = [];
                    var value = oc_user.password;
                    rules.push(VALIDATION.general.required(value));
                    return VALIDATION.process(oc_user, "password", rules)
                },
                email: function () {
                    var rules = [];
                    var value = oc_user.email;
                    rules.push(VALIDATION.text.email(value));
                    return VALIDATION.process(oc_user, "email", rules)
                }
            };
            oc_user.form.rulesGroup = {
                all: function () {
                    return oc_user.validation.stateIcon(oc_user.form.fileds);
                },
            };
        }
    };
});