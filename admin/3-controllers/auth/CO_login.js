app.controller("auth_login", function ($scope, $http, $compile) {
    auth_login = this;
    RUN_A("auth_login", auth_login, $scope, $http, $compile);
    auth_login.form.rules = {
        username: function () {
            var rules = [];
            var value = auth_login.username;
            rules.push(VALIDATION.general.required(value));
            return VALIDATION.process(auth_login, "username", rules)
        },
        password: function () {
            var rules = [];
            var value = auth_login.password;
            rules.push(VALIDATION.general.required(value));
            var validation = VALIDATION.process(auth_login, "username", rules);
            if (value !== undefined) {
                if (value.length >= 5)
                    auth_login.form.options.password.icon.class = "lock2";
                else
                    auth_login.form.options.password.icon.class = "unlocked2";
            }
            return validation;
        }
    };
    auth_login.makeLogin = function () {
        SWEETALERT.loading("Validating credentials");
        SERVICE.base_auth.login({username: auth_login.username, password: auth_login.password}, function (data) {
            SWEETALERT.stop();
            var response = data.data;
            if (response.error !== false) {
                SWEETALERT.show({
                    type: 'error',
                    message: MESSAGE.ieval('login.blocked'),
                    close: function () {
                        auth_login.password = "";
                    }
                });
            } else {
                if (response.count[0] > 0) {
                    var user = response.data[0];
                    SESSION.register(user);
                    HTTP.redirect('');
                } else {
                    SWEETALERT.show({
                        type: 'error',
                        message: MESSAGE.i('login.invalid'),
                        close: function () {
                            auth_login.password = "";
                        }
                    });
                }
            }
        });
    };
    auth_login.login_click = function () {
        if (auth_login.validation.state() === "warning") {
            SWEETALERT.confirm({
                type: "warning",
                title: "Warnings",
                message: MESSAGE.i('alerts.preventClose'),
                confirm: function () {
                    auth_login.makeLogin();
                }
            });
            return;
        }
        if (auth_login.validation.state() === "success") {
            auth_login.makeLogin();
            return;
        }
        SWEETALERT.show({
            message: MESSAGE.i('alerts.ContainsError')
        });
    };
});