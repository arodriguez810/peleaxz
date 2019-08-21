SOCKETS.channels.logoff = async function (data) {
    if (typeof DRAGON !== "undefined") {
        var User = await new SESSION().prepare(data);
        BROWSER.NOTIFICATION.wasoffline(User);
    }
};

SOCKETS.channels.login = async function (data) {
    if (typeof DRAGON !== "undefined") {
        var User = await new SESSION().prepare(data);
        BROWSER.NOTIFICATION.wasonline(User);
    }
};