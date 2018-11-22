VALIDATION = DSON.merge(VALIDATION, {
    file: {
        countRange: function (count, from, to) {
            count = DSON.ifundefined(count, 0);
            return {
                valid: (count >= from && value <= to),
                message: `You must upload between ${from} and ${to} files`,
                type: VALIDATION.types.error
            };
        },
        count: function (count, from) {
            count = DSON.ifundefined(count, 0);
            return {
                valid: (count >= from),
                message: `You must upload at least ${from} files`,
                type: VALIDATION.types.error
            };
        }
    }
});