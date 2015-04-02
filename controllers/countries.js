var Country = require ('../models/country');
var SkillsList = require('../models/skills-list');

exports.index = function (req, res) {
  res.json(Country.ALL);
};

exports.show = function (req, res) {
  try {
    var country = Country.find(req.params.code);
    SkillsList.forCountry(country, function (err, list) {
      var json = country.toJSON();
      json.skillsList = list.toJSON();
      res.json(json);
    });
  } catch(e) {
    res.status(500).json({
      error: e.message
    });
  }
};
