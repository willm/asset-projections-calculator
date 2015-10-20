'use strict';

function getAssetValue (asset, numberOfYears) {
    var value = Number(asset.value);
    var increase = Number(asset.increase);
    var totalValue = value;
    for(var i = 0; i < numberOfYears; i++) {
        totalValue += (totalValue * (increase / 100));
    }
    return Math.round(totalValue);
}
module.exports = getAssetValue;
