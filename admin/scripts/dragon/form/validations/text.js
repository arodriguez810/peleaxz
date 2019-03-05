VALIDATION = DSON.merge(VALIDATION, {
    text: {
        realdata: function (value) {
            if (DSON.oseaX(value))
                return {valid: true, message: ``, type: VALIDATION.types.success};
            return {
                valid: String.prototype.concat(...new Set(value)).length >= 5 &&
                    (String.prototype.concat(...new Set(value)).length >= Math.ceil(value.length / 2)),
                message: `Value may not be real`,
                type: VALIDATION.types.warning
            };
        },
        noContainsColor: function (value, colors) {
            if (DSON.oseaX(value))
                return {valid: true, message: ``, type: VALIDATION.types.success};
            return {
                valid: colors.indexOf(value),
                message: `Color is not allowed`,
                type: VALIDATION.types.error
            };
        },
        email: function (value) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return {
                valid: re.test(String(value).toLowerCase()) || DSON.oseaX(value),
                message: `Is not a valid email`,
                type: VALIDATION.types.error
            };
        }
    }
});