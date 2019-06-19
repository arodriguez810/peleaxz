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

    configuration.$scope.$watch('configuration.config.ui.theme.primary', function (value) {
        configuration.primary_example = CONTROL.shadesMonochrome(value, CONFIG.ui.shadows[configuration.config.ui.theme.primaryShades]);
        configuration.primary_example = eval(`configuration.primary_example.color${CONFIG.ui.shadows[configuration.config.ui.theme.primaryShades].split(",")[6]}`);
    });

    configuration.$scope.$watch('configuration.config.ui.theme.secundary', function (value) {
        configuration.secundary_example = CONTROL.shadesMonochrome(value, CONFIG.ui.shadows[configuration.config.ui.theme.secundaryShades]);
        configuration.secundary_example = eval(`configuration.secundary_example.color${CONFIG.ui.shadows[configuration.config.ui.theme.secundaryShades].split(",")[5]}`);
    });

    configuration.$scope.$watch('configuration.config.ui.theme.extra', function (value) {
        configuration.extra_example = CONTROL.shadesMonochrome(value, CONFIG.ui.shadows[configuration.config.ui.theme.extraShades]);
        configuration.extra_example = eval(`configuration.extra_example.color${CONFIG.ui.shadows[configuration.config.ui.theme.extraShades].split(",")[6]}`);
    });

    configuration.$scope.$watch('configuration.config.ui.theme.primaryShades', function (value) {
        configuration.primary_example = CONTROL.shadesMonochrome(configuration.config.ui.theme.primary, CONFIG.ui.shadows[configuration.config.ui.theme.primaryShades]);
        configuration.primary_example = eval(`configuration.primary_example.color${CONFIG.ui.shadows[configuration.config.ui.theme.primaryShades].split(",")[6]}`);
    });

    configuration.$scope.$watch('configuration.config.ui.theme.secundaryShades', function (value) {
        configuration.secundary_example = CONTROL.shadesMonochrome(configuration.config.ui.theme.secundary, CONFIG.ui.shadows[configuration.config.ui.theme.secundaryShades]);
        configuration.secundary_example = eval(`configuration.secundary_example.color${CONFIG.ui.shadows[configuration.config.ui.theme.secundaryShades].split(",")[5]}`);
    });

    configuration.$scope.$watch('configuration.config.ui.theme.extraShades', function (value) {
        configuration.extra_example = CONTROL.shadesMonochrome(configuration.config.ui.theme.extra, CONFIG.ui.shadows[configuration.config.ui.theme.extraShades]);
        configuration.extra_example = eval(`configuration.extra_example.color${CONFIG.ui.shadows[configuration.config.ui.theme.extraShades].split(",")[6]}`);
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
                        BASEAPI.ajax.post('dragon/api/saveConfigSuper', {json: JSON.stringify(configuration.config)}, function () {
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