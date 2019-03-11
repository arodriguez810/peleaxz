VALIDATION = DSON.merge(VALIDATION, {
    dropdown: {
        atLeast: function (value, count, soft) {
            if (DSON.oseaX(value))
                return {valid: true, message: ``, type: VALIDATION.types.success};
            if (!soft)
                return {
                    valid: value.length >= count,
                    message: `${MESSAGE.i('validations.Youmustselectatleast')} ${count} ${MESSAGE.i('mono.elements')}`,
                    type: VALIDATION.types.error
                };
            else
                return {
                    valid: value.length >= count,
                    message: `${MESSAGE.i('validations.Werecommendthatyouselectatleast')} ${count} ${MESSAGE.i('mono.items')}`,
                    type: VALIDATION.types.warning
                };
        },
        range: function (value, from, to, soft) {
            if (DSON.oseaX(value))
                return {valid: true, message: ``, type: VALIDATION.types.success};
            if (!soft)
                return {
                    valid: value.length >= count,
                    message: `${MESSAGE.i('validations.Youmustselectatleast')} ${count} ${MESSAGE.i('mono.elements')}`,
                    type: VALIDATION.types.error
                };
            else
                return {
                    valid: value.length >= count,
                    message: `${MESSAGE.i('validations.Werecommendthatyouselectatleast')} ${count} ${MESSAGE.i('mono.items')}`,
                    type: VALIDATION.types.warning
                };
        }
    }
});