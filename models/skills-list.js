function SkillsList() {

}

SkillsList.ALL = {};

SkillsList.master = function (callback) {

};

SkillsList.forCountry = function (country, callback) {

};

SkillsList.url = function (code) {
  var baseUrl = "http://travel.state.gov/content/visas/english/study-exchange/exchange/exchange-visitor-skills-list";
  if(code) {
    return baseUrl + "/visa-exchange-skills.cid." + code + ".html";
  }
  // no code means the master list
  return baseUrl + "/exchange-skills-list-2009.html";
};

module.exports = SkillsList;
