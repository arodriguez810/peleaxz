QUOTES = {
    doblequote: function (value) {
        return QUOTES.base(value, "\"");
    },
    singlequote: function (value) {
        return QUOTES.base(value, "'");
    },
    parenthesis: function (value) {
        return QUOTES.base(value, "(", ")");
    },
    keys: function (value) {
        return QUOTES.base(value, "{", "}");
    },
    base: function (value, open, close) {
        return String.format("{1}{0}{2}", value, open, close || open);
    },
};