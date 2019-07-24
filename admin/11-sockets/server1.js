exports.init = function (params, data, socket) {
    console.log('server 1');
    console.log(data);
    params.sio.emit("client1", data);
};