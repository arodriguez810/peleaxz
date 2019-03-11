VALIDATION = DSON.merge(VALIDATION, {
    number: {
        range: function (value, from, to) {
            return {
                valid: (value >= from && value <= to),
                message: `${MESSAGE.i('validations.Numbermustbebetween')} ${from} ${MESSAGE.i('mono.and')} ${to}`,
                type: VALIDATION.types.error
            };
        }
    }
});