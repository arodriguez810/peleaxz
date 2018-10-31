FORM = {
    run: function ($scope, $http) {
        $scope.form = {};
        $scope.form.options = {};
        $scope.form.rules = {};
        $scope.form.events = {};

        $scope.form.getOption = function (name, option) {
            var property = eval(`$scope.form.options.${name}.${option}`);
            if (!DSON.oseaX(property))
                return property;
            return "";
        };
        $scope.form.setOption = function (name, option, value) {
            var property = eval(`$scope.form.options.${name}.${option}`);
            if (!DSON.oseaX(property))
                eval(`$scope.form.options.${name}.${option} = ${value}`);
        };
        $scope.form.event = function (name) {
            var func = eval(`$scope.form.events.${name}`);
            if (DSON.iffunction(func)) {
                func();
            }
        };
        $scope.form.registerField = function (name, properties) {
            eval(`$scope.form.options.${name} = ${properties.replaceAll("&#34;", '"')}`);
        };
        $scope.form.LabelVisible = function (name) {
            var value = eval("$scope." + name);
            return !DSON.oseaX(value);
        };
        $scope.form.validate = function (validations) {

        };
    }
};