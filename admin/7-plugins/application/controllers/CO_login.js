app.controller("auth", function ($scope, $http, $compile) {
    auth = this;
    RUNCONTROLLER("auth", auth, $scope, $http, $compile);
    RUN_B("auth", auth, $scope, $http, $compile);
    var http = new HTTP();
    auth.queries = http.hrefToObj();
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
    $scope.$watch('auth.forgotfield', function (value) {
        var rules = [];
        rules.push(VALIDATION.general.required(value));
        rules.push(VALIDATION.text.email(value));
        VALIDATION.validate(auth, "forgotfield", rules);
    });
    var repeatPasswordMessage = MESSAGE.ic('mono.repeatpassword');
    var passwordMessage = MESSAGE.ic('mono.password');
    $scope.$watch('auth.newpassword', function (value) {
        var rules = [];
        rules.push(VALIDATION.general.required(value));
        rules.push(VALIDATION.general.equal(value, auth.repeatPassword, passwordMessage, repeatPasswordMessage));
        VALIDATION.validate(auth, "newpassword", rules)

        var rulesRepeat = [];
        rulesRepeat.push(VALIDATION.general.equal(auth.repeatPassword, value, repeatPasswordMessage, passwordMessage));
        VALIDATION.validate(auth, "confirmpassword", rulesRepeat);
    });
    $scope.$watch('auth.confirmpassword', function (value) {
        var rules = [];
        rules.push(VALIDATION.general.required(value));
        rules.push(VALIDATION.general.equal(value, auth.newpassword, repeatPasswordMessage, passwordMessage));
        VALIDATION.validate(auth, "confirmpassword", rules);

        var rulesRepeat = [];
        rulesRepeat.push(VALIDATION.general.equal(auth.newpassword, value, passwordMessage, repeatPasswordMessage));
        VALIDATION.validate(auth, "newpassword", rulesRepeat)
    });
    auth.sendForgotPassword = async function () {
        VALIDATION.save(auth, async function () {
            var animation = new ANIMATION();

            var where = {where: [{field: CONFIG.users.fields.email, value: auth.forgotfield}]};
            var user = await
                DRAGONAPI.firstp(CONFIG.users.model, where);
            if (user !== null) {
                user = new SESSION().runFunction(user);
                animation.loadingPure($("#idsend"), "", $("#spinersend"), '30');
                var date = new Date();
                var token = `${date.getFullYear()}${date.getMonth()}${date.getDay()}${user.getID()}`;
                SERVICE.base_auth.md5({value: token}, function (result) {
                    DRAGONAPI.mail({
                        "to": eval(`user.${CONFIG.users.fields.email}`),
                        "subject": `${CONFIG.appName} - ${MESSAGE.ic('login.passwordrecovery')}`,
                        "name": user.fullName(),
                        "template": 'email/forgotpassword',
                        "fields": {
                            name: user.fullName(),
                            username: eval(`user.${CONFIG.users.fields.username}`),
                            phone: CONFIG.support.phone,
                            "button": MESSAGE.i('login.button'),
                            "a": MESSAGE.i('login.a'),
                            "b": MESSAGE.i('login.b'),
                            "c": MESSAGE.i('login.c'),
                            "d": MESSAGE.i('login.d'),
                            "url": new HTTP().path(["#auth", `login?restore=${result.data.md5}`])
                        }
                    }, function (result) {
                        animation.stoploading($("#idsend"), $("#spinersend"));
                        SWEETALERT.show({message: MESSAGE.i('login.restoreemailsend')});
                    });
                });

            } else {
                SWEETALERT.show({message: MESSAGE.i('login.restoreemailsend')});
            }
        }, ["forgotfield"]);

    };
    auth.restorePassword = async function () {
        VALIDATION.save(auth, async function () {
            var animation = new ANIMATION();
            animation.loadingPure($("#idsend"), "", $("#spinersend"), '30');
            SERVICE.base_auth.changePassword({
                restore: auth.queries.restore,
                newpassword: auth.newpassword
            }, function (result) {
                animation.stoploading($("#idsend"), $("#spinersend"));
                if (result.data.success) {
                    SWEETALERT.show({message: MESSAGE.i('login.passwordrestored')});
                    MODAL.close(auth);
                }
            });
        }, ["newpassword", "confirmpassword"]);
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
        VALIDATION.save(auth, async function () {
            auth.makeLogin();
        });
    };
    if (auth.queries.restore !== undefined) {
        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
        SERVICE.base_auth.matchtoken({restore: auth.queries.restore}, function (result) {
            SWEETALERT.stop();
            if (result.data.user !== false) {
                auth.restoreUser = new SESSION().runFunction(result.data.user);
                auth.modal.modalView("auth/restore", {
                    width: ENUM.modal.width.large,
                    header: {
                        title: MESSAGE.ic("login.resetpassword"),
                        icon: "lock"
                    },
                    footer: {
                        cancelButton: false
                    },
                    content: {
                        loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                        sameController: true
                    },
                });
            } else {
                SWEETALERT.show({message: MESSAGE.i('login.expire')});
            }
        });

    }


});