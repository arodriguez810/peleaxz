app.controller("configuration", function ($scope, $http, $compile) {
    configuration = this;
    RUNCONTROLLER("configuration", configuration, $scope, $http, $compile);
    RUN_B("configuration", configuration, $scope, $http, $compile);
    configuration.config = {};
    DSON.merge(configuration.config, CONFIG, true);
    configuration.configurationClose = function () {
        MODAL.close(configuration);
    };
    var user = new SESSION().current();

    configuration.mode = user.super ? 'super' : 'admin';

    configuration.$scope.$watch('configuration.config.appName', function (value) {
        var rules = [];
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(configuration, "config.appName", rules);
    });

    configuration.$scope.$watch('configuration.config.ui.colors.primary', function (value) {
        configuration.config.ui.colors.menu = value;
    });

    configuration.saveConfiguration = function () {
        if (user.super)
            VALIDATION.save(configuration, function () {
                SWEETALERT.confirm({
                    message:
                        MESSAGE.i('alerts.saveConfigSuper'),
                    confirm: function () {
                        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                        BASEAPI.ajax.post('dragon/api/saveConfigSuper', {json: JSON.stringify(configuration.config)}, function () {
                            SWEETALERT.loading({message: MESSAGE.ic('mono.restarting')});
                            setTimeout(() => {
                                location.reload();
                            }, 5000);
                        });
                    }
                });
            });
        else
            VALIDATION.save(configuration, function () {
                SWEETALERT.confirm({
                    message:
                        MESSAGE.i('alerts.saveConfig'),
                    confirm: function () {
                        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                        BASEAPI.ajax.post('dragon/api/saveConfig', {json: JSON.stringify(configuration.config)}, function () {
                            SWEETALERT.loading({message: MESSAGE.ic('mono.saving')});
                            setTimeout(() => {
                                location.reload();
                            }, 5000);
                        });
                    }
                });
            });
    };

});