BROWSER = {
    NOTIFICATION: {
        base: function (data) {
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification");
            } else if (Notification.permission === "granted") {
                BROWSER.NOTIFICATION.create(data);
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                    if (permission === "granted") {
                        BROWSER.NOTIFICATION.create(data);
                    }
                });
            }
        },
        create: function (data) {
            data = data || {};
            var options = {
                body: data.body || "Body Empty",
                icon: data.icon || "files/dragon_configuration/logo/logo.png",
                badge: data.icon || "files/dragon_configuration/logo/logo.png",
                vibrate: data.vibrate || [200, 100, 200, 100, 200, 100, 400],
                sound: data.sound || null,
                actions: data.actions || [],
                tag: data.tag || "",
                requireInteraction: data.requireInteraction || false,
                renotify: data.renotify || false,
                silent: data.silent || false,
                click: data.click || function () {
                },
                close: data.close || function () {
                },
                error: data.error || function () {
                },
                show: data.show || function () {
                }
            };
            var notification = new Notification(data.title || "No Title", options);
            if (data.seconds)
                setTimeout(notification.close.bind(notification), data.seconds * 1000);
        },
        user: function (user, title, message) {
            var currentUser = new SESSION().current();
            if (currentUser)
                if (user.getID() != currentUser.getID()) {
                    if (user.name) {
                        BROWSER.NOTIFICATION.base({
                            title: title,
                            icon: user.image || FILE.defaultImage(),
                            body: message
                        });
                    }
                }
        },
        wasonline: function (user) {
            var currentUser = new SESSION().current();
            if (currentUser)
                if (!user.connected && user.getID() != currentUser.getID()) {
                    if (user.name) {
                        BROWSER.NOTIFICATION.user(user, " ", user.fullName() + " " + MESSAGE.ic("alerts.userwasonline"));
                    }
                }
        },
        wasoffline: function (user) {
            var currentUser = new SESSION().current();
            if (currentUser)
                if (user.getID() != currentUser.getID()) {
                    if (user.name) {
                        BROWSER.NOTIFICATION.user(user, " ", user.fullName() + " " + MESSAGE.ic("alerts.userwasoffline"));
                    }
                }
        }
    }
};

