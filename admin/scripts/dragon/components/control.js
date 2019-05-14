CONTROL = {
    run: function ($scope, $compile) {
        $scope.control = {};
        $scope.control.draw = (content, url, name, opts) => new Promise((resolve, reject) => {
            new LOAD().templatePost(`dragoncontrol/${url}`, {
                name: name,
                model: $scope.modelName,
                opts: opts
            }, function (control) {
                if (control !== false) {
                    $(content).html($compile(control)($scope.$scope));
                    resolve(true);
                } else {
                    $(content).html(`${url}->${name}->error`);
                    resolve(true);
                }
            });
        });
        for (var i of CONTROLS) {
            var nameData = i.replace(".ejs", "");
            eval(`$scope.control.${nameData} = (content, name, opts) => new Promise(async (resolve, reject) => {
                await $scope.control.draw(content, "${nameData}", name, opts);
                resolve(true);
            })`);
        }
    }
};