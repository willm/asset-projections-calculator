const types = require('./types');

module.exports = function parseAsset(assetForm) {
    var type = Object.keys(types).filter((x) => {
            return types[x].name === assetForm.assetType.value;
        })[0];

    return {
        id: Number(assetForm.assetId.value),
        name: assetForm.assetName.value,
        value: assetForm.assetValue.value,
        increase: assetForm.assetProjectedIncrease.value,
        purchaseDate: assetForm.purchaseDate.value,
        type: types[type]
    };
};
