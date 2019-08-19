ONLINE = [];
User = function (Data, remove) {
    if (!remove) {
        if (ONLINE.filter(d => {
            return d.id == Data.id
        }).length < 1) {
            ONLINE.push(Data);
            ONLINE = ONLINE.filter(d => {
                return d || false
            });
        }
    } else {
        ONLINE = ONLINE.filter(d => {
            return d.id != Data.id;
        });
        ONLINE = ONLINE.filter(d => {
            return d || false
        });
    }
};
exports.init = function (params) {
    params.sio.on('connection', function (socket) {
        var Data = socket.handshake.query;
        User(Data);
        console.log(ONLINE.map(d => {
            return d.id;
        }));
        for (var channel of params.socketsList) {
            if (channel !== 'connection') {
                eval(`
                socket.on(channel, function (data) {
                    params.sockets.${channel}.init(params,data,socket);
                });
                `);
            }
        }
        params.sio.emit("user_connect", ONLINE);
        socket.on('disconnect', function (socketDisconnect) {
            var Data = socket.handshake.query;
            User(Data, true);
            params.sio.emit("user_connect", ONLINE);
        });
    });
};
