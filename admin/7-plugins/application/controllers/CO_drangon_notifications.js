app.controller("dragon_notifications", function ($scope, $http, $compile) {
    dragon_notifications = this;
    RUNCONTROLLER("dragon_notifications", dragon_notifications, $scope, $http, $compile);
    dragon_notifications.stop = function () {
        if (!DSON.oseaX(dragon_notifications.notificationID))
            SERVICE.base_onesignal.cancel({id: dragon_notifications.notificationID}, function (result) {
                result.data.response.data = DSON.EO(result.data.response.data);
                if (result.data.response.data.errors === undefined) {
                    SWEETALERT.show({message: MESSAGE.ic('mono.dragon_notificationstoped')});
                } else {
                    SWEETALERT.show({type: 'error', message: JSON.stringify(result.data.response.data.errors)});
                }

            });
    };
    dragon_notifications.send = function () {
        SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        var notificationObj = {
            contents: {en: dragon_notifications.content}
        };
        if (dragon_notifications.advance) {
            if (!DSON.oseaX(dragon_notifications.sendAfter))
                notificationObj.send_after = dragon_notifications.sendAfter_DragonClean + " " + CONFIG.onesignal.app.gmt;
            if (!DSON.oseaX(dragon_notifications.headings))
                notificationObj.headings = {en: dragon_notifications.headings};
            if (!DSON.oseaX(dragon_notifications.url))
                notificationObj.url = dragon_notifications.url;
        }
        if (!dragon_notifications.showSegments) {
            notificationObj.included_segments = dragon_notifications.segments;
            SERVICE.base_onesignal.send(notificationObj, function (result) {
                if (result.data.response.data.errors === undefined) {
                    dragon_notifications.notificationID = result.data.response.data.id;
                    SWEETALERT.stop();
                } else {

                    SWEETALERT.show({type: 'error', message: JSON.stringify(result.data.response.data.errors)});
                }
            });
        } else {
            notificationObj.users = dragon_notifications.users;
            SERVICE.base_onesignal.send(notificationObj, function (result) {
                if (result.data.response.data.errors === undefined) {
                    dragon_notifications.notificationID = result.data.response.data.id;
                    SWEETALERT.stop();
                } else {
                    SWEETALERT.show({type: 'error', message: JSON.stringify(result.data.response.data.errors)});
                }
            });
        }
    };
    dragon_notifications.formulary = function (data, mode, defaultData) {
        if (dragon_notifications !== undefined) {
            RUN_B("dragon_notifications", dragon_notifications, $scope, $http, $compile);
            dragon_notifications.form.readonly = {notificationID: dragon_notifications.notificationID};

            dragon_notifications.createForm(data, mode, defaultData);
            dragon_notifications.$scope.$watch('dragon_notifications.subject', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_notifications, "subject", rules);
            });
            dragon_notifications.$scope.$watch('dragon_notifications.content', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(dragon_notifications, "content", rules);
            });
        }
    };
});