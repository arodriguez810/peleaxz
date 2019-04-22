app.controller("auth", function ($scope, $http, $compile) {
    auth = this;
    RUN_A("auth", auth, $scope, $http, $compile);

    $scope.$watch('auth.username', function (value) {
        var rules = [];
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(auth, "username", rules);
    });
    $scope.$watch('auth.password', function (value) {
        var rules = [];
        rules.push(VALIDATION.general.required(value));
        var validation = VALIDATION.validate(auth, "password", rules);
        if (value !== undefined) {
            if (value.length >= 5)
                auth.form.options.password.icon.class = "lock2";
            else
                auth.form.options.password.icon.class = "unlocked2";
        }
        return validation;
    });
    auth.makeLogin = function () {
        SWEETALERT.loading("Validating credentials");
        SERVICE.base_auth.login({
            username: auth.username,
            password: auth.password,
            playerID: PLAYERID
        }, function (data) {
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
                    new SESSION().register(user);
                    var http = new HTTP();
                    http.redirect('');
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