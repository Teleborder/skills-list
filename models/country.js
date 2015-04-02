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

Country.find = function (code) {
  country = this.ALL.find(function (country) {
    return country.code.toLowerCase() === code.toLowerCase();
  });

  if(!country) {
    throw new Error("No Country with code `" + code + "`.");
  }

  return country;
};

module.exports = Country;
