var SkillsList = require ('../models/skills-list');

exports.index = function (req, res) {
  SkillsList.master(function (err, list) {
    if(err) {
      return res.status(500).json({
        error: err.message || "Unknown Error"
      });
    }

    res.json(list);
  });
};
