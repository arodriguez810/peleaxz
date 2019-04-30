ERROR = {
    E500: "",
    category: {
        database: "database"
    },
    regulate: function (error) {
        var regulated = MESSAGE.i('alerts.ClientDbError');
        var regul = false
        if (error.indexOf('REFERENCE constraint') !== -1) {
            regul = true;
            return MESSAGE.i('error.dbreference');
        }
        if (error.indexOf('a foreign key constraint fails') !== -1) {
            regul = true;
            return MESSAGE.i('error.dbreference');
        }
        if (CONFIG.mode !== 'developer') {
            return JSON.stringify({trueerror: error, regulated: regulated});
        } else {
            return regul ? regulated : error;
        }
    },
    send: function (error) {
        SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        var session = new SESSION();
        BASEAPI.mail({
            "to": CONFIG.support.email,
            "subject": "Database Error Reporting Code: " + new Date().getTime(),
            "name": session.current().fullName(),
            "template": 'email/usersenderror',
            "fields": {
                profileimage: $("#profileImage").attr('src'),
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
    },
    alert: function (error, category) {
        if (CONFIG.mode !== 'developer') {
            switch (category) {
                case ERROR.category.database: {
                    SWEETALERT.confirm({
                        type: "error",
                        message: ERROR.regulate(JSON.stringify(error)),
                        confirm: function () {
                            ERROR.send(JSON.stringify(error));
                        }
                    });
                    break;
                }
            }
        } else {
            SWEETALERT.show({
                type: "error",
                title: capitalize(`${category} errors`),
                message: ERROR.regulate(JSON.stringify(error))
            });
        }
    },
    multiAlert: function (errors, category) {
        if (CONFIG.mode !== 'developer') {
            switch (category) {
                case ERROR.category.database: {
                    SWEETALERT.confirm({
                        type: "error",
                        message: ERROR.regulate(errors.join('<br>')),
                        confirm: function () {
                            ERROR.send(errors.join('<br>'));
                        }
                    });
                    break;
                }
            }
        } else {
            errors.forEach((item) => {
                item = JSON.stringify(item);
            });
            SWEETALERT.show({
                type: "error",
                title: capitalize(`${category} errors`),
                message: ERROR.regulate(errors.join('<br>'))
            });
        }
    }
};