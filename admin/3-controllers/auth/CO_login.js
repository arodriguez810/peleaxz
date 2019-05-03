app.controller("auth", function ($scope, $http, $compile) {
    auth = this;
    RUNCONTROLLER("auth", auth, $scope, $http, $compile);
    RUN_B("auth", auth, $scope, $http, $compile);

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
    auth.sendForgotPassword = async function () {
        var where = {where: [{field: CONFIG.users.fields.email, value: auth.forgotfield}]};
        var user = await BASEAPI.firstp(CONFIG.users.model, where);
        for (var i in CONFIG.users.addFields) {
            var calc = CONFIG.users.addFields[i];
            eval(`user.${i} = function () { return ${calc};}`);
        }
        if (user !== undefined) {
            BASEAPI.mail({
                "to": auth.forgotfield,
                "subject": `${CONFIG.appName} - ${MESSAGE.ic('login.passwordrecovery')}`,
                "name": session.current().fullName(),
                "template": 'email/usersenderror',
                "fields": {
                    profileimage: '',
                    name: session.current().fullName(),
                    username: eval(`session.current().${CONFIG.users.fields.username}`),
                    error: error,
                    phone: CONFIG.support.phone,
                    type: "Database Error",
                }
            }, function (result) {
                SWEETALERT.stop();
                SWEETALERT.show({message: MESSAGE.i('alerts.providerError')});
            });
        }

    };
    auth.forgotPassword = function () {
        auth.modal.modalView("auth/forgot", {
            width: ENUM.modal.width.large,
            header: {
                title: MESSAGE.ic("login.forgotpassword"),
                icon: "user-block"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: true
            },
        });
    };
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