var SkillsList = require ('../models/skills-list');

exports.index = function (req, res) {
  getMasterList(req, res, function (list) {
    res.json(list);
  });
};

exports.list = function (req, res) {
  getMasterList(req, res, function (list) {
    res.json(list.list());
  });
};

function getMasterList(req, res, callback) {
  SkillsList.master(function (err, list) {
    if(err) {
      return res.status(500).json({
        error: err.message || "Unknown Error"
      });
    }
    callback(list);
  });  
}
