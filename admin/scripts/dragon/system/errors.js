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
                message: JSON.stringify(error)
            });
        }
    }
};