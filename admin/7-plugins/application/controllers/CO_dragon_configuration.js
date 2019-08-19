app.controller("dragon_configuration", function ($scope, $http, $compile) {
    dragon_configuration = this;
    RUNCONTROLLER("dragon_configuration", dragon_configuration, $scope, $http, $compile);
    RUN_B("dragon_configuration", dragon_configuration, $scope, $http, $compile);
    dragon_configuration.config = {};
    DSON.merge(dragon_configuration.config, CONFIG, true);
    dragon_configuration.configurationClose = function () {
        MODAL.close(dragon_configuration);
    };
    var user = new SESSION().current();

    dragon_configuration.mode = user.super ? 'super' : 'admin';

    dragon_configuration.$scope.$watch('dragon_configuration.config.appName', function (value) {
        var rules = [];
        rules.push(VALIDATION.general.required(value));
        VALIDATION.validate(dragon_configuration, "config.appName", rules);
    });

    dragon_configuration.$scope.$watch('dragon_configuration.config.ui.theme.primary', function (value) {
        dragon_configuration.primary_example = CONTROL.shadesMonochrome(value, CONFIG.ui.shadows[dragon_configuration.config.ui.theme.primaryShades]);
        dragon_configuration.primary_example = eval(`dragon_configuration.primary_example.color${CONFIG.ui.shadows[dragon_configuration.config.ui.theme.primaryShades].split(",")[6]}`);
    });

    dragon_configuration.$scope.$watch('dragon_configuration.config.ui.theme.secundary', function (value) {
        dragon_configuration.secundary_example = CONTROL.shadesMonochrome(value, CONFIG.ui.shadows[dragon_configuration.config.ui.theme.secundaryShades]);
        dragon_configuration.secundary_example = eval(`dragon_configuration.secundary_example.color${CONFIG.ui.shadows[dragon_configuration.config.ui.theme.secundaryShades].split(",")[5]}`);
    });

    dragon_configuration.$scope.$watch('dragon_configuration.config.ui.theme.extra', function (value) {
        dragon_configuration.extra_example = CONTROL.shadesMonochrome(value, CONFIG.ui.shadows[dragon_configuration.config.ui.theme.extraShades]);
        dragon_configuration.extra_example = eval(`dragon_configuration.extra_example.color${CONFIG.ui.shadows[dragon_configuration.config.ui.theme.extraShades].split(",")[6]}`);
    });

    dragon_configuration.$scope.$watch('dragon_configuration.config.ui.theme.primaryShades', function (value) {
        dragon_configuration.primary_example = CONTROL.shadesMonochrome(dragon_configuration.config.ui.theme.primary, CONFIG.ui.shadows[dragon_configuration.config.ui.theme.primaryShades]);
        dragon_configuration.primary_example = eval(`dragon_configuration.primary_example.color${CONFIG.ui.shadows[dragon_configuration.config.ui.theme.primaryShades].split(",")[6]}`);
    });

    dragon_configuration.$scope.$watch('dragon_configuration.config.ui.theme.secundaryShades', function (value) {
        dragon_configuration.secundary_example = CONTROL.shadesMonochrome(dragon_configuration.config.ui.theme.secundary, CONFIG.ui.shadows[dragon_configuration.config.ui.theme.secundaryShades]);
        dragon_configuration.secundary_example = eval(`dragon_configuration.secundary_example.color${CONFIG.ui.shadows[dragon_configuration.config.ui.theme.secundaryShades].split(",")[5]}`);
    });

    dragon_configuration.$scope.$watch('dragon_configuration.config.ui.theme.extraShades', function (value) {
        dragon_configuration.extra_example = CONTROL.shadesMonochrome(dragon_configuration.config.ui.theme.extra, CONFIG.ui.shadows[dragon_configuration.config.ui.theme.extraShades]);
        dragon_configuration.extra_example = eval(`dragon_configuration.extra_example.color${CONFIG.ui.shadows[dragon_configuration.config.ui.theme.extraShades].split(",")[6]}`);
    });


    dragon_configuration.saveConfiguration = function () {
        if (user.super)
            VALIDATION.save(dragon_configuration, function () {
                SWEETALERT.confirm({
                    message:
                        MESSAGE.i('alerts.saveConfigSuper'),
                    confirm: function () {
                        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                        DRAGONAPI.ajax.post('dragon/api/saveConfigSuper', {json: JSON.stringify(dragon_configuration.config)}, function () {
                            SWEETALERT.loading({message: MESSAGE.ic('mono.restarting')});
                            setTimeout(() => {
                                location.reload();
                            }, 5000);
                        });
                    }
                });
            });
        else
            VALIDATION.save(dragon_configuration, function () {
                SWEETALERT.confirm({
                    message:
                        MESSAGE.i('alerts.saveConfig'),
                    confirm: function () {
                        SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                        DRAGONAPI.ajax.post('dragon/api/saveConfigSuper', {json: JSON.stringify(dragon_configuration.config)}, function () {
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