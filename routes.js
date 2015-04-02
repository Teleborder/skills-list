var controllers = require('./controllers');

function routes(app) {
  app.get('/countries', controllers.index);
  app.get('/countries/:code', controllers.show);
}

module.exports = routes;
