app.controller("notifications", function ($scope, $http, $compile) {
    notifications = this;
    RUNCONTROLLER("notifications", notifications, $scope, $http, $compile);
    notifications.stop = function () {
        if (!DSON.oseaX(notifications.notificationID))
            SERVICE.base_onesignal.cancel({id: notifications.notificationID}, function (result) {
                result.data.response.data = DSON.EO(result.data.response.data);
                console.log(result);
                if (result.data.response.data.errors === undefined) {
                    SWEETALERT.show({message: MESSAGE.ic('mono.notificationstoped')});
                } else {
                    SWEETALERT.show({type: 'error', message: JSON.stringify(result.data.response.data.errors)});
                }

            });
    };
    notifications.send = function () {
        SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        var notificationObj = {
            contents: {en: notifications.content}
        };
        if (notifications.advance) {
            if (!DSON.oseaX(notifications.sendAfter))
                notificationObj.send_after = notifications.sendAfter_DragonClean + " " + CONFIG.onesignal.app.gmt;
            if (!DSON.oseaX(notifications.headings))
                notificationObj.headings = {en: notifications.headings};
            if (!DSON.oseaX(notifications.url))
                notificationObj.url = notifications.url;
        }
        if (!notifications.showSegments) {
            notificationObj.included_segments = notifications.segments;
            SERVICE.base_onesignal.send(notificationObj, function (result) {
                if (result.data.response.data.errors === undefined) {
                    notifications.notificationID = result.data.response.data.id;
                    notifications.pages.form.save(undefined, undefined, false);
                }
                else {

                    SWEETALERT.show({type: 'error', message: JSON.stringify(result.data.response.data.errors)});
                }
            });
        } else {
            notificationObj.users = notifications.users;
            SERVICE.base_onesignal.send(notificationObj, function (result) {
                if (result.data.response.data.errors === undefined) {
                    notifications.notificationID = result.data.response.data.id;
                    notifications.pages.form.save(undefined, undefined, false);
                }
                else {
                    SWEETALERT.show({type: 'error', message: JSON.stringify(result.data.response.data.errors)});
                }
            });
        }
    };
    notifications.formulary = function (data, mode, defaultData) {
        if (notifications !== undefined) {
            RUN_B("notifications", notifications, $scope, $http, $compile);
            notifications.form.readonly = {notificationID: notifications.notificationID};

            notifications.createForm(data, mode, defaultData);
            notifications.$scope.$watch('notifications.subject', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(notifications, "subject", rules);
            });
            notifications.$scope.$watch('notifications.content', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(notifications, "content", rules);
            });
        }
    };
});