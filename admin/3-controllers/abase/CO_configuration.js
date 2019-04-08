app.controller("configuration", function ($scope, $http, $compile) {
    configuration = this;
    RUNCONTROLLER("configuration", configuration, $scope, $http, $compile);
    RUN_B("configuration", configuration, $scope, $http, $compile);
    configuration.config = {};
    DSON.merge(configuration.config, CONFIG, true);
    configuration.configurationClose = function () {
        MODAL.close(configuration);
    };

    configuration.$scope.$watch('configuration.config.appName', function (value) {
        var rules = [];
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(configuration, "config.appName", rules);
    });

    configuration.saveConfiguration = function () {
        VALIDATION.save(configuration, function () {
            SWEETALERT.confirm({
                message:
                    MESSAGE.i('alerts.saveConfig'),
                confirm: function () {
                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                    BASEAPI.ajax.post('dragon/api/saveConfig', {json: JSON.stringify(configuration.config)}, function () {
                        SWEETALERT.loading({message: MESSAGE.ic('mono.restarting')});
                        setTimeout(() => {
                            location.reload();
                        }, 5000);
                    });
                }
            });
        });
    };

});