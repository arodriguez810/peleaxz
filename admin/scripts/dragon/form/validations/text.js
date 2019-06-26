VALIDATION = DSON.merge(VALIDATION, {
    text: {
        realdata: function (value) {
            if (DSON.oseaX(value))
                return {valid: true, message: ``, type: VALIDATION.types.success};
            return {
                valid: String.prototype.concat(...new Set(value)).length >= 5 &&
                    (String.prototype.concat(...new Set(value)).length >= Math.ceil(value.length / 2)),
                message: MESSAGE.i('validations.Valuemaynotbereal'),
                type: VALIDATION.types.warning
            };
        },
        noContainsColor: function (value, colors) {
            if (DSON.oseaX(value))
                return {valid: true, message: ``, type: VALIDATION.types.success};
            return {
                valid: colors.indexOf(value),
                message: MESSAGE.i('validations.Colorisnotallowed'),
                type: VALIDATION.types.error
            };
        },
        email: function (value) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return {
                valid: re.test(String(value).toLowerCase()) || DSON.oseaX(value),
                message: MESSAGE.i('validations.Isnotavalidemail'),
                type: VALIDATION.types.error
            };
        },
        exist: function (value, values, message) {

            return {
                valid: values.indexOf(value) === -1,
                message: message,
                type: VALIDATION.types.error
            };
        },
        password_min: function (value) {
            value = value || "";
            if (CONFIG.users.rules.min === 0) {
                return {
                    valid: true,
                    message: '',
                    type: VALIDATION.types.error
                };
            }
            if (value === FORM.config.password) {
                return {
                    valid: true,
                    message: '',
                    type: VALIDATION.types.error
                };
            }
            return {
                valid: ((value.length >= CONFIG.users.rules.min)),
                message: MESSAGE.ieval('validations.config_users_rules_min'),
                type: VALIDATION.types.error
            };
        },
        password_max: function (value) {
            value = value || "";
            if (CONFIG.users.rules.max === 0) {
                return {
                    valid: true,
                    message: '',
                    type: VALIDATION.types.error
                };
            }
            if (value === FORM.config.password) {
                return {
                    valid: true,
                    message: '',
                    type: VALIDATION.types.error
                };
            }
            return {
                valid: ((value.length <= CONFIG.users.rules.max)),
                message: MESSAGE.ieval('validations.config_users_rules_max'),
                type: VALIDATION.types.error
            };
        },
        password_number: function (value) {
            value = value || "";
            if (CONFIG.users.rules.number === 0) {
                return {
                    valid: true,
                    message: '',
                    type: VALIDATION.types.error
                };
            }
            var count = 0;
            for (var char of value) {
                if (/\d/.test(char))
                    count++;
            }
            if (value === FORM.config.password) {
                return {
                    valid: true,
                    message: '',
                    type: VALIDATION.types.error
                };
            }
            return {
                valid: ((count >= CONFIG.users.rules.number)),
                message: MESSAGE.ieval('validations.config_users_rules_number'),
                type: VALIDATION.types.error
            };
        },
        password_mayus: function (value) {
            value = value || "";
            if (CONFIG.users.rules.mayus === 0) {
                return {
                    valid: true,
                    message: '',
                    type: VALIDATION.types.error
                };
            }
            var count = 0;
            for (var char of value) {
                if (/[a-zA-Z]/.test(char))
                    if (char === char.toUpperCase())
                        count++;
            }
            if (value === FORM.config.password) {
                return {
                    valid: true,
                    message: '',
                    type: VALIDATION.types.error
                };
            }
            return {
                valid: ((count >= CONFIG.users.rules.mayus)),
                message: MESSAGE.ieval('validations.config_users_rules_mayus'),
                type: VALIDATION.types.error
            };
        },
        password_letter: function (value) {
            value = value || "";
            if (CONFIG.users.rules.letter === 0) {
                return {
                    valid: true,
                    message: '',
                    type: VALIDATION.types.error
                };
            }
            var count = 0;
            for (var char of value) {
                if (/[a-zA-Z]/.test(char))
                    count++;
            }
            if (value === FORM.config.password) {
                return {
                    valid: true,
                    message: '',
                    type: VALIDATION.types.error
                };
            }
            return {
                valid: ((count >= CONFIG.users.rules.letter)),
                message: MESSAGE.ieval('validations.config_users_rules_letter'),
                type: VALIDATION.types.error
            };
        },
        password_specialchar: function (value) {
            value = value || "";
            if (CONFIG.users.rules.specialchar === 0) {
                return {
                    valid: true,
                    message: '',
                    type: VALIDATION.types.error
                };
            }
            var count = 0;
            for (var char of value) {
                if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(char))
                    count++;
            }
            if (value === FORM.config.password) {
                return {
                    valid: true,
                    message: '',
                    type: VALIDATION.types.error
                };
            }
            return {
                valid: ((count >= CONFIG.users.rules.specialchar)),
                message: MESSAGE.ieval('validations.config_users_rules_specialchar'),
                type: VALIDATION.types.error
            };
        },
        password_notusername: function (value, username) {
            value = value || "";
            username = username || "";
            if (CONFIG.users.rules.notusername === 0 || username === "") {
                return {
                    valid: true,
                    message: '',
                    type: VALIDATION.types.error
                };
            }
            if (value === FORM.config.password) {
                return {
                    valid: true,
                    message: '',
                    type: VALIDATION.types.error
                };
            }
            return {
                valid: ((value.toLowerCase() !== username.toLowerCase())),
                message: MESSAGE.ieval('validations.config_users_rules_notusername'),
                type: VALIDATION.types.error
            };
        },
        password: function (rules, value, username) {
            value = value || "";
            username = username || "";
            rules.push(VALIDATION.text.password_min(value));
            rules.push(VALIDATION.text.password_max(value));
            rules.push(VALIDATION.text.password_number(value));
            rules.push(VALIDATION.text.password_mayus(value));
            rules.push(VALIDATION.text.password_letter(value));
            rules.push(VALIDATION.text.password_specialchar(value));
            rules.push(VALIDATION.text.password_notusername(value, username));

        }
    }
});