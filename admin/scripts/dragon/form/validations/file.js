VALIDATION = DSON.merge(VALIDATION, {
    file: {
        countRange: function (count, from, to) {
            count = DSON.ifundefined(count, 0);
            return {
                valid: (count >= from && value <= to),
                message: `${MESSAGE.i('validations.Youmustuploadbetween')} ${from} ${MESSAGE.i('mono.and')} ${to} ${MESSAGE.i('mono.files')}`,
                type: VALIDATION.types.error
            };
        },
        count: function (count, from) {
            count = DSON.ifundefined(count, 0);
            return {
                valid: (count >= from),
                message: `${MESSAGE.i('validations.Youmustuploadatleast')} ${from} ${MESSAGE.i('mono.files')}`,
                type: VALIDATION.types.error
            };
        }
    }
});