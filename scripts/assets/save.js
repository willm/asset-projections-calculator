var createRepo = require('../model-repository');
var repo = createRepo(window.localStorage);
var parse = require('./parse');

module.exports = function save(assetForm){
    var asset = parse(assetForm);
    repo.addAsset(asset);
};
