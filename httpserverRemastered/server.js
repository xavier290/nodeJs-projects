/* this code does not work properly, after delivering the html page that the user is asking for
the server crashes */

const http = require('http');
const url = require('url');
const fs = require('fs');

const routes = [
  {
    path: '/',
    file: './public/index.html',
    code: 200
  },
  {
    path: '/lol',
    file: './public/index.html',
    code: 200
  }
];

function router(route, currentUrl) {
  // console.log(currentUrl)
  return route.filter((e) => e.path == currentUrl)
};

function startServer(r) {
  const port = process.env.PORT || 3000;
  const host = 'localhost';

  function onRequest(req, res) {
    // let q = url.parse(req.url, true);
    let newPath = router(r, req.url);
    console.log(newPath);
    let file = newPath[0].file;
    console.log(file)
    let code = newPath[0].code;
    
    fs.readFile(file, 'UTF-8', (err, data) => {
        if(err) {
          res.statusCode = 404;
          res.setHeader('Content-type', 'text/html');
          res.write('<h1>');
          res.write('error 404, page not found :(');
          res.write('</h1>');

          return res.end();
        }
        res.statusCode = code;
        res.setHeader('Content-Type', 'text/html');
        res.write(data);

        return res.end();
    });
  }
  http.createServer(onRequest).listen(port, host, () => console.log(`http://${host}:${port}/`))
};

startServer(routes);