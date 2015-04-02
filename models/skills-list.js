var jsdom = require('jsdom');

function SkillsList(country) {
  this.code = this.country.code || "master";
  this.groups = [];
}

SkillsList.prototype.toJSON = function () {
  return {
    source: this.url(),
    groups: this.groups
  };
};

SkillsList.prototype.initialize = function (callback) {
  var self = this;
  this.retrieve(function (err, groups) {
    if(err) {
      return callback(err);
    }
    self.groups = groups;
    callback(null, self);
  });
};

SkillsList.prototoype.url = function () {
  var baseUrl = "http://travel.state.gov/content/visas/english/study-exchange/exchange/exchange-visitor-skills-list";
  if(this.code === "master") {
    return baseUrl + "/exchange-skills-list-2009.html";
  }
  return baseUrl + "/visa-exchange-skills.cid." + this.code + ".html";
};

SkillsList.prototype.retrieve = function (callback) {
  jsdom.env(
    this.url(),
    ["http://code.jquery.com/jquery.js"],
    function (errors, window) {
      if(errors) {
        return callback(errors[0]);
      }
      var groups = [];
      window.$("dt .open_close_hook span").each(function () {
        var text = window.$(this).text().trim();
        if(!text) {
          return;
        }
        var texts = text.split(") ");
        var group = {
          name: texts[1],
          code: texts[0],
          subgroups: []
        };
        groups.push(group);
        var subgroupsNode = window.$(this).closest("dt").next("dd");
        subgroupsNode.find("p").each(function () {
          var text = window.$(this).text();
          var texts = text.match(/(\d\d?\.\d\d\d?)\s(.*)$/);
          if(texts) {
            var subgroup = {
              name: texts[2],
              code: texts[1]
            };
            group.subgroups.push(subgroup);
          }
        });
      });
      callback(null, groups);
      window.close();
    }
  );
};

SkillsList.ALL = {};

SkillsList.master = function (callback) {
  if(this.ALL.master) {
    callback(null, this.ALL.master);
  }
  var list = this.ALL.master = new SkillsList();
  list.initialize(callback);
};

SkillsList.forCountry = function (country, callback) {
  if(this.ALL[country.code]) {
    callback(null, this.ALL[country.code]);
  }
  var list = this.ALL[country.code] = new SkillsList(country);
  list.initialize(callback);
};

module.exports = SkillsList;
