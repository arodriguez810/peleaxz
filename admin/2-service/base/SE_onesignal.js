var params = {};
exports.run = function (_params) {
    params = _params;
};
exports.api = {
    gets: {},
    posts: {
        send: async function (request) {
            if (params.CONFIG.features.onesignal !== true)
                return {error: false, message: "OneSignal is disabled"};
            if (request.contents === undefined)
                return {error: "contents is required!"};

            var obj = {contents: request.contents};

            for (var i in request)
                if (i !== "contents")
                    obj[i] = request[i];

            var Client = new params.OneSignal.Client(params.CONFIG.onesignal);
            var notification = new params.OneSignal.Notification(obj);
            return await Client.sendNotification(notification).then(function (response) {
                return {error: false, response: response};
            }).catch(function (err) {
                return {error: err};
            });
        },
        cancel: async function (request) {
            if (params.CONFIG.features.onesignal !== true)
                return {error: false, message: "OneSignal is disabled"};
            var Client = new params.OneSignal.Client(params.CONFIG.onesignal);
            return await Client.cancelNotification(request.id).then(function (response) {
                return {error: false, response: response};
            }).catch(function (err) {
                return {error: err};
            });
        },
        view: async function (request) {
            if (params.CONFIG.features.onesignal !== true)
                return {error: false, message: "OneSignal is disabled"};
            var Client = new params.OneSignal.Client(params.CONFIG.onesignal);
            return await Client.viewNotification(request.id).then(function (response) {
                return {error: false, response: response};
            }).catch(function (err) {
                return {error: err};
            });
        },
        views: async function (request) {
            if (params.CONFIG.features.onesignal !== true)
                return {error: false, message: "OneSignal is disabled"};
            var query = [];
            for (var i in request) {
                query.push(`${i}=${request[i]}`);
            }

            var Client = new params.OneSignal.Client(params.CONFIG.onesignal);
            return await Client.viewNotifications(query.join('&')).then(function (response) {
                return {error: false, response: response};
            }).catch(function (err) {
                return {error: err};
            });
        },
        devices: async function (request) {
            if (params.CONFIG.features.onesignal !== true)
                return {error: false, message: "OneSignal is disabled"};
            var query = [];
            for (var i in request) {
                query.push(`${i}=${request[i]}`);
            }

            var Client = new params.OneSignal.Client(params.CONFIG.onesignal);
            return await Client.viewDevices(query.join('&')).then(function (response) {
                return {error: false, response: response};
            }).catch(function (err) {
                return {error: err};
            });
        },
        device: async function (request) {
            if (params.CONFIG.features.onesignal !== true)
                return {error: false, message: "OneSignal is disabled"};
            var Client = new params.OneSignal.Client(params.CONFIG.onesignal);
            return await Client.viewDevice(request.id).then(function (response) {
                return {error: false, response: response};
            }).catch(function (err) {
                return {error: err};
            });
        },
        apps: async function (request) {
            if (params.CONFIG.features.onesignal !== true)
                return {error: false, message: "OneSignal is disabled"};
            var apps = [];
            var Client = new params.OneSignal.Client(params.CONFIG.onesignal);
            await Client.viewApps(data).then(function (response) {
                apps.push(response.data[0].name);
            });
            return {error: false, apps: apps};
        },
        app: async function (request) {
            if (params.CONFIG.features.onesignal !== true)
                return {error: false, message: "OneSignal is disabled"};
            var Client = new params.OneSignal.Client(params.CONFIG.onesignal);
            return await Client.viewApp(request.id).then(function (response) {
                return {error: false, apps: response.data};
            });
        },
        users: async function (request) {
            return await params.storage.getItem('onesignalUsers') || [];
        },

    },
    puts: {},
    deletes: {},
    options: {}
};