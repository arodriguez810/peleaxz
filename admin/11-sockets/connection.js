exports.init = function (params) {
    params.sio.on('connection', function (socket) {
        for (var channel of params.socketsList) {
            if (channel !== 'connection') {
                eval(`
                socket.on(channel, function (data) {
                    params.sockets.${channel}.init(params,data,socket);
                });
                `);
            }
        }
    });

    params.sio.on('disconnect', function (socket) {

    });
};
