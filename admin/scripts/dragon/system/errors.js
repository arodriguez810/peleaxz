ERROR = {
    E500: "",
    category: {
        database: "database"
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
                        message: MESSAGE.i('alerts.ClientDbError'),
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
                message: JSON.stringify(error)
            });
        }
    },
    multiAlert: function (errors, category) {
        if (CONFIG.mode !== 'developer') {
            switch (category) {
                case ERROR.category.database: {
                    SWEETALERT.confirm({
                        type: "error",
                        message: MESSAGE.i('alerts.ClientDbError'),
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
                message: errors.join('<br>')
            });
        }
    }
};