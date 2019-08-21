SOCKETS = {
    channels: {},
    actions: {
        refreshtable: "refreshtable",
        deleterecord: "deleterecord",
        editrecord: "editrecord",
    },
    connect: function () {
        var session = new SESSION();
        SOCKET = io(new HTTP().io([]), {query: session.current()});
    },
    run: function () {
        for (var channel in SOCKETS.channels) {
            eval(`
             SOCKET.on('${channel}', function(data${channel}){
                if(typeof SOCKETS.channels.${channel}==='function'){
                    SOCKETS.channels.${channel}(data${channel});
                }
             });
             
             SOCKETS.${channel} = function(data${channel}){
                SOCKET.emit('${channel}', data${channel});
             };
              
            `);
        }

        for (var channel of CONFIG.socketsList) {
            if (channel !== 'connection') {
                eval(`
              SOCKETS.${channel} = function(data${channel}){
                SOCKET.emit('${channel}', data${channel});
              };
            `);
            }
        }
    }
};
