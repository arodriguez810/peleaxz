app.controller("auth_login", function ($scope, $http, $compile) {
    auth_login = this;
    RUN_A("auth_login", auth_login, $scope, $http, $compile);
    auth_login.form.rules = {
        username: function () {
            var rules = [];
            var value = auth_login.username;
            rules.push(VALIDATION.required(value));
            if (value !== undefined) {
                rules.push({
                    valid: value.toLowerCase() !== "angel",
                    message: "Le recomiendo que no use angel",
                    type: "warning"
                });
            }
            return VALIDATION.process(auth_login, "username", rules)
        },
        password: function () {
            var rules = [];
            var value = auth_login.password;
            rules.push(VALIDATION.required(value));
            if (value !== undefined) {
                if (value.length >= 16)
                    rules.push({
                        valid: false,
                        message: "Is too long",
                        type: "error"
                    });
                if (value.length > 0 && value.length < 5)
                    rules.push({
                        valid: false,
                        message: "",
                        type: "error"
                    });
            }

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

    auth_login.sumAB = function (...values) {
        var total = 0;
        values.forEach(function (item) {
            total += parseInt(item || 0);
        });
        return total;
    };

    auth_login.makeLogin = function () {
        SWEETALERT.loading("Validating credentials");
        SERVICE.base_auth.login({username: auth_login.username, password: auth_login.password}, function (data) {
            SWEETALERT.stop();
            var response = data.data;
            if (response.count[0] > 0) {
                var user = response.data[0];
                SESSION.register(user);
                HTTP.redirect('');
            } else {
                SWEETALERT.show({
                    type: 'error',
                    message: "Invalid credentials, please try again",
                    close: function () {
                        auth_login.password = "";
                    }
                });
            }
        });
    };
    auth_login.login_click = function () {
        if (auth_login.validation.state() === "warning") {
            SWEETALERT.confirm({
                type: "warning",
                title: "Warnings",
                message: "¿There are warnings in your form, are you sure want continue?",
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
            message: "Please complete the form before continue."
        });
    };

});