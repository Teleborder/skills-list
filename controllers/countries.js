var Country = require ('../models/country');
var SkillsList = require('../models/skills-list');

exports.index = function (req, res) {
  res.json(Country.ALL);
};

exports.show = function (req, res) {
  getCountry(req, res, function (country, list) {
    var json = country.toJSON();
    json.skillsList = list.toJSON();
    res.json(json);
  });
};

exports.showList = function (req, res) {
  getCountry(req, res, function (country, list) {
    res.json(list.list());
  });
};

function getCountry(req, res, callback) {
  try {
    var country = Country.find(req.params.code);
    SkillsList.forCountry(country, function (err, list) {
      if(err) {
        return res.status(500).json({
          error: err.message
        });
      }
      callback(country, list);
    });
  } catch(e) {
    res.status(500).json({
      error: e.message
    });
  }
}
