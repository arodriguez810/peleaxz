VALIDATION = DSON.merge(VALIDATION, {
    general: {
        required: function (value) {
            value = value || "";
            return {
                valid: (!DSON.oseaX(value) && value !== "[NULL]"),
                message: MESSAGE.i('validations.Fieldisrequired'),
                type: VALIDATION.types.error
            };
        }
    }
});