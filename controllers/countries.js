var Country = require ('../models/country');

exports.index = function (req, res) {
  res.json(Country.ALL);
};
