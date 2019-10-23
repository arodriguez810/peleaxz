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


SOCKETS.channels.notification = async function (data) {
    if (typeof DRAGON !== "undefined") {
        var image = await FILE.serverp(`dragon_configuration/logo`, "assets/images/placeholder.jpg", "no");
        BROWSER.NOTIFICATION.base({
            title: data.title,
            icon: image[0].url || FILE.defaultImage(),
            body: data.message
        });
    }
};

SOCKETS.channels.dashboard = async function (data) {
    console.log('refresh dashboard');
    if (typeof charts !== "undefined") {
        charts.loaddata();
    }
};