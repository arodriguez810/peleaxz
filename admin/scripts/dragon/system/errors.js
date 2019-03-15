ERROR = {
    E500: "",
    category: {
        database: "database"
    },
    alert: function (error, category) {
        if (CONFIG.mode !== 'developer') {
            switch (category) {
                case ERROR.category.database: {
                    SWEETALERT.confirm({
                        type: "error",
                        message: MESSAGE.i('alerts.ClientDbError'),
                        confirm: function () {
                            SWEETALERT.show({message: MESSAGE.i('alerts.providerError')});
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
                            SWEETALERT.show({message: MESSAGE.i('alerts.providerError')});
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