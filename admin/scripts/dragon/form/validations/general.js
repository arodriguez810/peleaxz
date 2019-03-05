VALIDATION = DSON.merge(VALIDATION, {
    general: {
        required: function (value) {
            value = value || "";
            return {
                valid: (!DSON.oseaX(value) && value !== "[NULL]"),
                message: `Field is required!`,
                type: VALIDATION.types.error
            };
        }
    }
});