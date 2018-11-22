VALIDATION = DSON.merge(VALIDATION, {
    text: {
        realdata: function (value) {
            if (DSON.oseaX(value))
                return {valid: true, message: ``, type: VALIDATION.types.success};
            return {
                valid: String.prototype.concat(...new Set(value)).length >= 5 &&
                    (String.prototype.concat(...new Set(value)).length >= Math.ceil(value.length / 2)),
                message: `this value may not be real`,
                type: VALIDATION.types.warning
            };
        },
        noContainsColor: function (value, colors) {
            if (DSON.oseaX(value))
                return {valid: true, message: ``, type: VALIDATION.types.success};
            return {
                valid: colors.indexOf(value),
                message: `This color is not allowed`,
                type: VALIDATION.types.error
            };
        }
    }
});