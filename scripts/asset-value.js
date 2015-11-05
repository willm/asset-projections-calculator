'use strict';
const types = require('./assets/types');

function getAssetValue (asset, year) {
    var numberOfYears = year - new Date(asset.purchaseDate).getFullYear();
    var value = Number(asset.value);
    var increase = Number(asset.increase);
    var totalValue = value;
    for(var i = 0; i < numberOfYears; i++) {
        totalValue += (totalValue * (increase / 100));
    }
    return Math.round(totalValue);
}

function getTotal(assets, year, type) {
    if (type && typeof type.name === 'string') {
        assets = assets.filter((a) => {
            return a.type.name === type.name;
        });
    }
    return assets.reduce((total, asset) => {
        return total + getAssetValue(asset, year);
    }, 0);
}

module.exports = {
    getAssetValue: getAssetValue,
    getTotal: getTotal
};
