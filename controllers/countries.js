var Country = require ('../models/country');

exports.index = function (req, res) {
  res.json(Country.ALL);
};

exports.show = function (req, res) {
  try {
    var country = Country.find(req.params.code);
    var list = SkillsList.forCountry(country);
    var json = country.toJSON();
    json.skillsList = list.toJSON();
    res.json(json);
  } catch(e) {
    res.status(500).json({
      error: e.message
    });
  }
};
