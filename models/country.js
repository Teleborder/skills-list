var countries = require('world-countries');

function Country(name, code) {
  this.name = name;
  this.code = code;
}

Country.prototype.toJSON = function () {
  return {
    name: this.name,
    code: this.code
  };
};

Country.ALL = countries.map(function (countryOptions) {
  return new Country(countryOptions.name.common, countryOptions.cca2);
});

Country.find = function (name) {
  country = this.ALL.find(function (country) {
    return country.name.toLowerCase() === name.toLowerCase();
  });

  if(!country) {
    throw new Error("No Country named `" + name + "`.");
  }

  return country;
};

module.exports = Country;
