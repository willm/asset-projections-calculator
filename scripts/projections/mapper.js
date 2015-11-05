const numberOfYears = 10;
const nextYear = new Date().getFullYear() + 1;
const maxProjectionYear = nextYear + numberOfYears;
const assetValue = require('../../scripts/asset-value');
const forIn = require('lodash.forin');

function getTotals (assets, type) {
    let totals = [];
    for(let year = nextYear; year <= maxProjectionYear; year++) {
        totals.push(assetValue.getTotal(assets, year, type));
    }
    return totals;
}
function getAssetValues (asset) {
    let values = [];
    for(let year = nextYear; year <= maxProjectionYear; year++) {
        values.push(assetValue.getAssetValue(asset, year));
    }
    return values;
}
function mapProjections (assets) {
    let years = [];
    for(let year = nextYear; year <= maxProjectionYear; year++) {
        years.push(year);
    }
    const assetsByType = assets.reduce((groups, asset) => {
        if (!groups[asset.type.name]) {
            groups[asset.type.name] = { type: asset.type.name, assets: [] };
        }
        asset.values = getAssetValues(asset);
        groups[asset.type.name].assets.push(asset);
        return groups;
    }, {});

    let projections = [];
    forIn(assetsByType, (value, key) => {
        value.subtotals = getTotals(value.assets, value.type);
        projections.push(value);
    });
    /*
    let projections = [];
    for (let assetType in assetsByType) {
        let assetsForType = assetsByType[assetType];
        assetType.subtotals = getTotals(assetsForType.assets, assetType.name);
        projections.push(assetType);
    }
    */
    return {
        years: years,
        projections: projections,
        totals: getTotals(assets)
    };
}

module.exports = mapProjections;
