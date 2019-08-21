SOCKETS.channels.user_connect = async function (data) {
    if (typeof DRAGON !== "undefined") {
        DRAGON.ONLINE = data;
        for (var i in DRAGON.ONLINE) {
            DRAGON.ONLINE[i] = await new SESSION().prepare(DRAGON.ONLINE[i]);
        }
        if (DRAGON.refreshAngular)
            DRAGON.refreshAngular();
    }
};