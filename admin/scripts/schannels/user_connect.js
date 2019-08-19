SOCKETS.channels.user_connect = async function (data) {
    if (typeof DRAGON !== "undefined") {
        DRAGON.ONLINE = data;
        for (var i in DRAGON.ONLINE) {
            DRAGON.ONLINE[i] = new SESSION().runFunction(DRAGON.ONLINE[i]);
            DRAGON.ONLINE[i].image = await new SESSION().getProfileImage(DRAGON.ONLINE[i].getID());
            if (DRAGON.ONLINE[i].image) {
                if (DRAGON.ONLINE[i].image.length > 0)
                    DRAGON.ONLINE[i].image = DRAGON.ONLINE[i].image[0].url;
            }
        }
        if (DRAGON.refreshAngular)
            DRAGON.refreshAngular();
    }
};