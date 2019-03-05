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
                        message: "An error occurred in the database, would you like to send this error?"
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
                        message: "Some errors occurred in the database, would you like to send errors?"
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