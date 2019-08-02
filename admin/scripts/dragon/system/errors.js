ERROR = {
    E500: "",
    category: {
        database: "database"
    },
    regulate: function (error) {
        var regulated = MESSAGE.i('alerts.ClientDbError');
        var regul = false;
        if (error.indexOf('Duplicate entry \'') !== -1) {
            regul = true;
            var part1 = MESSAGE.ic('error.dbexist1');
            var part2 = MESSAGE.i('error.dbexist2');

            var errord = error.replace('Duplicate entry \'', part1);
            errord = errord.replace('\' for key', part2);
            regulated = errord;
        }
        if (error.indexOf('REFERENCE constraint') !== -1) {
            regul = true;
            regulated = MESSAGE.i('error.dbreference');
        }
        if (error.indexOf('a foreign key constraint fails') !== -1) {
            regul = true;
            regulated = MESSAGE.i('error.dbreference');
        }
        if (CONFIG.mode !== 'developer') {
            return {trueerror: error, regulated: regulated, regul: regul};
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
                    var errorfinal = ERROR.regulate(JSON.stringify(error));
                    console.log(errorfinal);
                    if (errorfinal.regul) {
                        SWEETALERT.show({
                            type: "error",
                            message: errorfinal.regulated,
                        });
                    } else {
                        SWEETALERT.confirm({
                            type: "error",
                            message: MESSAGE.i('alerts.ClientDbError'),
                            confirm: function () {
                                ERROR.send(JSON.stringify(error));
                            }
                        });
                    }

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
                    var errorfinal = ERROR.regulate(JSON.stringify(errors.join('<br>')));

                    if (errorfinal.regul) {
                        SWEETALERT.show({
                            type: "error",
                            message: ERROR.regulate(errors.join('<br>')).regulated
                        });
                    } else {
                        SWEETALERT.confirm({
                            type: "error",
                            message: MESSAGE.i('alerts.ClientDbError'),
                            confirm: function () {
                                ERROR.send(JSON.stringify(error));
                            }
                        });
                    }

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