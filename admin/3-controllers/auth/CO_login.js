app.controller("auth", function ($scope, $http, $compile) {
    auth = this;
    RUN_A("auth", auth, $scope, $http, $compile);
    auth.form.rules = {
        username: function () {
            var rules = [];
            var value = auth.username;
            rules.push(VALIDATION.general.required(value));
            return VALIDATION.process(auth, "username", rules)
        },
        password: function () {
            var rules = [];
            var value = auth.password;
            rules.push(VALIDATION.general.required(value));
            var validation = VALIDATION.process(auth, "username", rules);
            if (value !== undefined) {
                if (value.length >= 5)
                    auth.form.options.password.icon.class = "lock2";
                else
                    auth.form.options.password.icon.class = "unlocked2";
            }
            return validation;
        }
    };
    auth.makeLogin = function () {
        SWEETALERT.loading("Validating credentials");
        SERVICE.base_auth.login({username: auth.username, password: auth.password}, function (data) {
            SWEETALERT.stop();
            var response = data.data;
            if (response.error !== false) {
                SWEETALERT.show({
                    type: 'error',
                    message: MESSAGE.ieval('login.blocked'),
                    close: function () {
                        auth.password = "";
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
                            auth.password = "";
                        }
                    });
                }
            }
        });
    };
    auth.login_click = function () {
        if (auth.validation.state() === "warning") {
            SWEETALERT.confirm({
                type: "warning",
                title: "Warnings",
                message: MESSAGE.i('alerts.preventClose'),
                confirm: function () {
                    auth.makeLogin();
                }
            });
            return;
        }
        if (auth.validation.state() === "success") {
            auth.makeLogin();
            return;
        }
        SWEETALERT.show({
            message: MESSAGE.i('alerts.ContainsError')
        });
    };
});