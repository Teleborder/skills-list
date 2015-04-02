var controllers = require('./controllers');

function routes(app) {
  app.get('/countries', controllers.index);
}

module.exports = routes;
