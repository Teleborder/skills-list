var Country = require ('../models/country');
var SkillsList = require('../models/skills-list');
var async = require('async');

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

exports.showInverse = function (req, res) {
  async.parallel({
    master: SkillsList.master.bind(SkillsList),
    country: function (callback) {
      try {
        var country = Country.find(req.params.code);
        SkillsList.forCountry(country, callback);
      } catch(e) {
        callback(e);
      }
    }
  }, function (err, results) {
    if(err) {
      return res.status(500).json({
        error: err.message
      });
    }

    var countrySkillCodes = results.country.list().map(function (skill) {
      return skill.code;
    });
    var inverseList = results.master.list().filter(function (skill) {
      return !~countrySkillCodes.indexOf(skill.code);
    });

    res.json(inverseList);
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
