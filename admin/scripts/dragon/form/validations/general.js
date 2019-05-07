VALIDATION = DSON.merge(VALIDATION, {
    general: {
        required: function (value) {
            value = value || "";
            return {
                valid: (!DSON.oseaX(value) && value !== "[NULL]"),
                message: MESSAGE.i('validations.Fieldisrequired'),
                type: VALIDATION.types.error,
                visible: false
            };
        },
        equal: function (value, value2, field, field2) {
            value = value || "";
            value2 = value2 || "";
            return {
                valid: (value === value2),
                message: MESSAGE.ieval('validations.fieldPassword', {field: field, field2: field2}),
                type: VALIDATION.types.error
            };
        },
        greaterThan: function (value, value2, field, field2) {
            value = value || "";
            value2 = value2 || "";
            return {
                valid: (value < value2),
                message: MESSAGE.ieval('validations.greaterThan', {field: field, field2: field2}),
                type: VALIDATION.types.error
            };
        }
    }
});