VALIDATION = {
    run: function ($scope) {
        $scope.validation = {};
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
                if (type !== "success")
                    return type.replace('error', 'danger');
                return color;
            }
            return color;
        };
        $scope.validation.state = function () {
            var result = "success";
            for (const i in  $scope.form.rules) {
                var rule = $scope.form.rules[i];
                var type = $scope.validation.getType(i);
                if (type !== "success") {
                    if (type === "error")
                        return "danger";
                    else if (type !== "success")
                        result = type;
                }
            }
            return result;
        };

        $scope.validation.stateDefault = function () {
            return $scope.validation.state().replace('success', COLOR.primary);
        };
    },
    process: function ($scope, field, rules) {
        var value = eval("$scope." + field);
        var messages = [];
        var type = "warning";
        for (const rule of rules)
            if (!rule.valid) {
                if (rule.type === "error")
                    type = "error";
                messages.push(rule.message);
            }
        var valid = (messages.length === 0 && type !== "error");
        type = (valid ? "success" : type);
        return {valid: valid, messages: messages, type: type};
    },
    required: function (value) {
        return {valid: !DSON.oseaX(value), message: `This field is required!`, type: "error"};
    }
};