var createRepo = require('../model');
var repo = createRepo();
var parse = require('./parse');
var draw = require('../draw');

module.exports = function save(e){
    var property = parse(e);
    repo.addProperty(property);
};
