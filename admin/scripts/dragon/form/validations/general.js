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
        },
        maliciousCode: function (value) {
            value = value || "";
            let positive = true;

            if (value.match(/<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2/)) {
                positive = false;
            }
            else if (value.match(/(([ trn]*)([a-zA-Z-]*)([.#]{1,1})([a-zA-Z-]*)([ trn]*)+)([{]{1,1})((([ trn]*)([a-zA-Z-]*)([:]{1,1})((([ trn]*)([a-zA-Z-0-9#]*))+)[;]{1})*)([ trn]*)([}]{1,1})([ trn]*)/)) {
                positive = false;
            } else if (value.match(/^<[^>]+>/)) {
                positive = false;
            }
            else if (value.match(/^(#|\.)?[^{]+{/)) {
                positive = false;
            }
            else if (value.match(/`/)){
                positive = false;
            }

            return {
                valid: positive,
                message:  MESSAGE.i('validations.malicious_code'),
                type: VALIDATION.types.error
            }
        }
    }
});