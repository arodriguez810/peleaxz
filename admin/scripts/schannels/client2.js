SOCKETS.channels.client2 = function (data) {
    $(".modal-body").append("<p style='color: red'>" + data.nombre + "</p><br>");
    $(".modal-body").append("<p style='color: blue'>" + data.chat + "</p><br>");
};
