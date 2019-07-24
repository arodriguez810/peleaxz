app.controller("dragon_information", function ($scope, $http, $compile) {
    dragon_information = this;
    dragon_information.headertitle = "";
    dragon_information.messageAbout = eval(`CONFIG.version.about.${MESSAGE.current().code}`);
    MENUMODAL = false;
    RUNCONTROLLER("dragon_information", dragon_information, $scope, $http, $compile);
    RUN_B("dragon_information", dragon_information, $scope, $http, $compile);
    dragon_information.base = CONFIG.storageEntities;
    dragon_information.app = CONFIG.appEntities;
    dragon_information.getCount = async function (entity) {
        var animation = new ANIMATION();
        animation.loading(`#${entity}count`, "", ``, '30');
        var data = await BASEAPI.listp(entity, {});
        $(`#${entity}countvalue`).html(LAN.money(data.totalCount).format(false).split(".")[0]);
        animation.stoploading(`#${entity}count`);
    };
    dragon_information.clean = async function (entity) {
        SWEETALERT.confirm({
            message: MESSAGE.i('alerts.AYSDelete'),
            confirm: async function () {
                SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
                var result = await BASEAPI.truncatep(entity);
                if (result)
                    dragon_information.getCount(entity);
                SWEETALERT.stop();
            }
        });

    }
});