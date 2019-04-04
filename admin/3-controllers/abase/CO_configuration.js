app.controller("configuration", function ($scope, $http, $compile) {
    configuration = this;
    configuration.config = {};
    DSON.merge(configuration.config, CONFIG, true);
    configuration.configurationClose = function () {
        MODAL.close(configuration);
    };
    configuration.saveConfiguration = function () {
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
    };
    RUNCONTROLLER("configuration", configuration, $scope, $http, $compile);
    RUN_B("configuration", configuration, $scope, $http, $compile);
});