var controllers = require('./controllers');

function routes(app) {
  app.get('/countries', controllers.countries.index);
  app.get('/countries/:code', controllers.countries.show);
  app.get('/skills', controllers.skills.index);
}

module.exports = routes;
