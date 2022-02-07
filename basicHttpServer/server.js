const http = require('http');
const url = require('url');
const fs = require('fs');

function start(path) {
    const port = process.env.PORT || 3000;
    const localhost = 'localhost';

    function onRequest(req, res) {
        let q = url.parse(req.url, true);
        let pathvalue = path(q.pathname)
        
        fs.readFile(pathvalue.file, (err, data) => {
            res.statusCode = pathvalue.code;
            res.setHeader('Content-Type', 'text/html');
            res.write(data);

            return res.end();
        });
    };
    http.createServer(onRequest).listen(port, localhost, () => console.log(`http://${localhost}:${port}/`));
}

exports.start = start;