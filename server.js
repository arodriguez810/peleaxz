var HTTP = require('http');
var FILE = require('fs');
var util = require('util');
const URL = require('url');

HTTP.createServer(function (REQUEST, RESPONSE) {
    RESPONSE.writeHead(200, {'Content-Type': 'text/html'});
    var page = decodeURI(REQUEST.url);
    if (page.indexOf(">") !== -1) {
        var urlparts = page.split('>');
        var folder = urlparts[0];
        var pagepart = urlparts[1];
        page = util.format('./pages/%s/%s.html', folder, pagepart);
    }else{
        page = util.format('./pages%s/index.html',page);
    }
    FILE.readFile(page, function(err, data) {
        RESPONSE.write(data);
        RESPONSE.end();
    });
}).listen(8090);