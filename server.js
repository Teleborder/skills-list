require('./polyfills');

var express = require('express'),
    middleware = require('./middleware'),
    routes = require('./routes'),
    app = express();

middleware(app);
routes(app);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Skills List listening at http://%s:%s', host, port);
});

