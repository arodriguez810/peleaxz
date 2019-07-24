exports.init = function (params, data, socket) {
    console.log('server 2');
    console.log(data);
    params.sio.emit("client2", data);
};