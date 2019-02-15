VALIDATION = {
    types: {
        success: "success",
        warning: "warning",
        error: "error"
    },
    run: function ($scope) {
        $scope.validation = {};
        $scope.validation.fields = {};
        $scope.validation.existRule = function (name) {
            var rule = eval(`$scope.form.rules.${name}`);
            return !DSON.oseaX(rule);
        };
        $scope.validation.getRule = function (name) {
            var rule = eval(`$scope.form.rules.${name}()`);
            if ($scope.validation.existRule(name))
                return rule;
            return {valid: true, messages: [], type: "success"};
        };
        $scope.validation.getType = function (name) {
            if ($scope !== undefined)
                if ($scope.validation.existRule(name))
                    return eval(`$scope.form.rules.${name}().type`);
            return "success";
        };
        $scope.validation.getMessages = function (name) {
            if ($scope.validation.existRule(name)) {
                return eval(`$scope.form.rules.${name}().messages`);
            }
            return [];
        };
        $scope.validation.getValid = function (name) {
            if ($scope.validation.existRule(name))
                return eval(`$scope.form.rules.${name}().valid`);
            return true;
        };
        $scope.validation.getColor = function (name, color) {
            if ($scope.validation.existRule(name)) {
                var type = $scope.validation.getType(name);
                if (type !== VALIDATION.types.success)
                    return type.replace(VALIDATION.types.error, 'danger');
                return color;
            }
            return color;
        };
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
            for (const i in  $scope.form.rules) {
                if (!DSON.oseaX(fields))
                    if (fields.indexOf(i) === -1)
                        continue;

                var rule = $scope.form.rules[i];
                var type = $scope.validation.getType(i);
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
            for (const i in  $scope.form.rules) {
                if (!DSON.oseaX(fields))
                    if (fields.indexOf(i) === -1)
                        continue;

                var rule = $scope.form.rules[i];
                var type = $scope.validation.getType(i);
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
            for (const i in  $scope.form.rules) {
                var rule = $scope.form.rules[i];
                var type = $scope.validation.getType(i);
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
    }
};