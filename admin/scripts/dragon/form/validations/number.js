VALIDATION = DSON.merge(VALIDATION, {
    number: {
        range: function (value, from, to) {
            return {
                valid: (value >= from && value <= to),
                message: `The number must be between ${from} and ${to}`,
                type: VALIDATION.types.error
            };
        }
    }
});