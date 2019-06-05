VALIDATION = {
    types: {
        success: "success",
        warning: "warning",
        error: "error"
    },
    run: function ($scope) {
        $scope.validation = {};
        $scope.validation.fields = {};
        $scope.validation.stateIcon = function (fields) {
            if ($scope === undefined)
                return;
            return $scope.validation.state(fields || eval(`$scope.form.fileds`))
                .replace(VALIDATION.types.success, 'icon-checkmark4 text-success')
                .replace("danger", 'icon-cancel-circle2 text-danger')
                .replace(VALIDATION.types.warning, 'icon-notification2 text-warning');
        };
        $scope.validation.state = function (fieldsy) {
            if ($scope === undefined)
                return;
            var fields = fieldsy || eval(`$scope.form.fileds`);
            var result = VALIDATION.types.success;
            for (const i in  $scope.validate) {
                if (!DSON.oseaX(fields))
                    if (fields.indexOf(i) === -1)
                        continue;

                var rule = $scope.validate[i];
                var type = rule.type;
                if (type !== VALIDATION.types.success) {
                    if (type === VALIDATION.types.error)
                        return "danger";
                    else if (type !== VALIDATION.types.success)
                        result = type;
                }
            }
            return result;
        };
        $scope.validation.statePure = function (fieldsy) {
            var fields = fieldsy || eval(`$scope.form.fileds`);
            var result = VALIDATION.types.success;
            for (const i in  $scope.validate) {
                if (!DSON.oseaX(fields))
                    if (fields.indexOf(i) === -1)
                        continue;

                var rule = $scope.validate[i];
                var type = rule.type;
                if (type !== VALIDATION.types.success) {
                    if (type === VALIDATION.types.error)
                        return type;
                    else if (type !== VALIDATION.types.success)
                        result = type;
                }
            }
            return result;
        };
        $scope.validation.warningClose = function () {
            var result = [];
            var success = 0;
            for (const i in  $scope.validate) {
                var rule = $scope.validate[i];
                var type = rule.type;
                if (type !== VALIDATION.types.success) {
                    if (type === VALIDATION.types.error) {
                        result.push("danger");
                    }
                    else if (type !== VALIDATION.types.success) {
                        result.push(type);
                    }

                } else {
                    result.push(type);
                    success++;
                }
            }
            return success >= (result.length / 2);
        };
        $scope.validation.stateDefault = function () {
            return $scope.validation.state().replace(VALIDATION.types.success, COLOR.primary);
        };
        $scope.validation.destroy = function () {
            $scope.validation = {};
        };
    },
    process: function ($scope, field, rules) {
        var value = eval(`$scope.${field}_clean || $scope.${field}`);
        var messages = [];
        var type = VALIDATION.types.warning;
        for (const rule of rules)
            if (!rule.valid) {
                if (rule.type === VALIDATION.types.error)
                    type = VALIDATION.types.error;
                messages.push(JSON.stringify({
                    message: rule.message,
                    icon: rule.type.replace(VALIDATION.types.error, 'danger').replace(VALIDATION.types.success, 'icon-checkmark4 text-success')
                        .replace('danger', 'icon-cancel-circle2 text-danger')
                        .replace(VALIDATION.types.warning, 'icon-notification2 text-warning'),
                    type: rule.type.replace(VALIDATION.types.error, 'danger')
                }));
            }
        var valid = (messages.length === 0 && type !== VALIDATION.types.error);
        type = (valid ? VALIDATION.types.success : type);
        return {valid: valid, messages: messages, type: type};
    },
    validate: function (scope, field, rules) {
        if (scope.validate === undefined)
            scope.validate = [];
        var messages = [];
        var type = VALIDATION.types.warning;
        for (const rule of rules)
            if (!rule.valid) {
                if (rule.type === VALIDATION.types.error)
                    type = VALIDATION.types.error;
                messages.push({
                    message: rule.message,
                    icon: rule.type.replace(VALIDATION.types.error, 'danger').replace(VALIDATION.types.success, 'icon-checkmark4 text-success')
                        .replace('danger', 'icon-cancel-circle2 text-danger')
                        .replace(VALIDATION.types.warning, 'icon-notification2 text-warning'),
                    type: rule.type.replace(VALIDATION.types.error, 'danger'),
                    visible: rule.visible
                });
            }
        var valid = (messages.length === 0 && type !== VALIDATION.types.error);
        type = (valid ? VALIDATION.types.success : type);
        scope.validate[field] = {valid: valid, messages: messages, type: type};
        return {valid: valid, messages: messages, type: type};
    },
    save: function (scope, save, direct) {
        var state = scope.validation.statePure(direct);
        if (state === VALIDATION.types.success) {
            save();
        } else {
            if (state === VALIDATION.types.warning) {
                SWEETALERT.confirm({
                    message:
                        MESSAGE.i('alerts.preventClose'),
                    confirm: function () {
                        save();
                    }
                });
            } else {
                SWEETALERT.show({
                    type: "error",
                    message: MESSAGE.i('alerts.ContainsError'),
                    confirm: function () {
                        setTimeout(function () {
                            var firstFieldWithError = $(".help-block:visible:has('p'):eq(0)").closest('.form-group-material');
                            firstFieldWithError.find('.form-control').focus();
                            var tab = firstFieldWithError.closest('.tab-pane');
                            $(`[href='#${tab.attr('id')}']`).trigger('click');
                            new ANIMATION().playPure(firstFieldWithError, "shake", function () {
                                firstFieldWithError.find('.form-control').focus();
                            });
                        }, 500);
                    }
                });

            }
        }
    }
};