var http = require('http');
var file = require('fs');
var util = require('util');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(util.format('%s.html',req.url));
    file.readFile(util.format('%s.html',req.url), function(err, data) {
        res.write(data);
        res.end();
    });
}).listen(8090);