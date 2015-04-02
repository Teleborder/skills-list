J-1 Skills List API
===================

API
---
### `GET /countries`
Example: [skillslist.teleborder.com/countries](http://skillslist.teleborder.com/countries)
Array of all ([according to mledoze](https://github.com/mledoze/countries)) [countries](#country).

### `GET /countries/:code`
Example: [skillslist.teleborder.com/countries/BR](http://skillslist.teleborder.com/countries/BR)
Shows the [country](#country) that matches the country `code`.

### `GET /countries/:code/list`
Example: [skillslist.teleborder.com/countries/BR/list](http://skillslist.teleborder.com/countries/BR/list)
Shows the [flattened `list`](#list) portion of the [country](#country)'s [skills list](#skills-list) that matches the country `code`.

### `GET /countries/:code/inverse`
Example: [skillslist.teleborder.com/countries/BR/inverse](http://skillslist.teleborder.com/countries/BR/inverse)
Shows the [list](#list) of skills from the Master List that are not on the country's skills list.

### `GET /skills`
Example: [skillslist.teleborder.com/skills](http://skillslist.teleborder.com/skills)
The Master [List](#skills-list) of all J-1 skills, as per the [2009 State Department Master List](http://travel.state.gov/content/visas/english/study-exchange/exchange/exchange-visitor-skills-list/exchange-skills-list-2009.html).

### `GET /skills/list`
Example: [skillslist.teleborder.com/skills/list](http://skillslist.teleborder.com/skills/list)
Shows the flattened `list` portion of the Master [Skills List](#skills-list).

Objects
-------

### Country
A `country` is an object representing a country with the following properties:
- `name`: Common name for the country
- `code`: 2 digit country code used by the US State Department
- `skillsList`: The country's [skills list](#skills-list). (not available on the countries index).

### Skills List
A `skillsList` is an object representing a skills list with the following properties:
- `source`: URL source of the list.
- `groups`: Array of groups of skills.
  - `code`: Numerical-ish code of the group (e.g. "01")
  - `name`: Name of the group of skills (e.g. "Agriculture, Agriculture Operations, and Related Sciences")
  - `subgroups`: Array of subgroups for this group (if applicable)
    - `code`: Numerical-ish code of the subgroup (e.g. "1.00")
    - `name`: Name of the subgroup (e.g. "Agriculture, General")

### List
A `list` is a flattened array of skills based on a [skills list](#skills-list). It uses subgroups where possible, and groups if no subgroups exist (such as Library Science)
  - `code`: Numerical-ish code of the group or subgroup
  - `name`: Name of the group or subgroup


About
-----

This is a simple Node/Express app that exposes an API for retrieving the J-1 skills list for different countries.

More information about the J-1 Visa program can be found at the [State Department website](http://j1visa.state.gov/).
