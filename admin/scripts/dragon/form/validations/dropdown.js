VALIDATION = DSON.merge(VALIDATION, {
    dropdown: {
        atLeast: function (value, count, soft) {
            if (DSON.oseaX(value))
                return {valid: true, message: ``, type: VALIDATION.types.success};
            if (!soft)
                return {
                    valid: value.length >= count,
                    message: `You must select at least ${count} elements`,
                    type: VALIDATION.types.error
                };
            else
                return {
                    valid: value.length >= count,
                    message: `We recommend that you select at least ${count} items`,
                    type: VALIDATION.types.warning
                };
        }
    }
});