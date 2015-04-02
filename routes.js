var controllers = require('./controllers');

function routes(app) {
  app.get('/countries', controllers.countries.index);
  app.get('/countries/:code', controllers.countries.show);
  app.get('/countries/:code/list', controllers.countries.showList);
  app.get('/countries/:code/inverse', controllers.countries.showInverse);
  app.get('/skills', controllers.skills.index);
  app.get('/skills/list', controllers.skills.list);
}

module.exports = routes;
