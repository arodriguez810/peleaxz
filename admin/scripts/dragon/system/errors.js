ERROR = {
    E500: "",
    category: {
        database: "database"
    },
    alert: function (error, category) {
        if (CONFIG.mode !== 'developer') {
            switch (category) {
                case category.database: {
                    SWEETALERT.show({
                        type: "error",
                        message: MESSAGE.i('alerts.ClientDbError')
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
                case category.database: {
                    SWEETALERT.show({
                        type: "error",
                        message:  MESSAGE.i('alerts.ClientDbError')
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