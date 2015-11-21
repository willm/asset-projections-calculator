var createRepo = require('../model-repository');
var repo = createRepo(window.localStorage);
var parse = require('./parse');
var draw = require('../draw');

module.exports = function save(e){
    var asset = parse(e);
    repo.addAsset(asset);
};
