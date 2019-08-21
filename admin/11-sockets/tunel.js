exports.init = function (params, data, socket) {
    params.sio.emit(data.channel, data.data);
};