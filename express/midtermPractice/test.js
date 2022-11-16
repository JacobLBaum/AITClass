const express = require('express');
const app = express();

// TODO: define queryCleaner here:
function queryCleaner(cb) {
    function newFunc(req, res, next) {
        let query = req.query
        let cleanQuery = {}
        for (let prop in query) {
            if (cb(query[prop])) {
                cleanQuery[prop] = query[prop]
            }
        }
        req.cleanQuery = cleanQuery
        next()
    }

    return newFunc
}

// note that the filter function used returns true if the value
// given does not contain a less than or greater than sign
app.use(queryCleaner(v => !v.includes('<') || !v.includes('>')));

app.get('/', (req, res) => {
  console.log('req.query is', req.query);
  console.log('req.cleanQuery is', req.cleanQuery);
  res.send('View the server console for logs');
});
app.listen(3000);



function serveStatic(basePath) {
    function middleware(req, res, next) {
        let pathToFile = path.join(basePath, req.path);
        pathToFile = pathToFile.replaceAll('\\', '/');
        fs.readFile(pathToFile, (err, data) => {
            if (err) {
                next(req, res);}
            else {
                res.statusCode = 200;
                res.set('Content-Type', getMIMEType(req.path));
                res.send(data);
            }
        });
    }
    return middleware;
}