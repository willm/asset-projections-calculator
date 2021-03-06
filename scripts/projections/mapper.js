const numberOfYears = 10;
const nextYear = new Date().getFullYear() + 1;
const maxProjectionYear = nextYear + numberOfYears;
const assetValue = require('../../scripts/asset-value');
const formatAmount = require('../format-amount');

function getTotals (assets, type) {
    let totals = [];
    for(let year = nextYear; year <= maxProjectionYear; year++) {
        totals.push(formatAmount(assetValue.getTotal(assets, year, type)));
    }
    return totals;
}

function getAssetValues (asset) {
    let values = [];
    for(let year = nextYear; year <= maxProjectionYear; year++) {
        values.push(formatAmount(assetValue.getAssetValue(asset, year)));
    }
    return values;
}

function byLiquidity(a, b) {
    if (a.type.liquidity > b.type.liquidity) {
        return -1;
    }
    if (a.type.liquidity < b.type.liquidity) {
        return 1;
    }
    return 0;
}

function mapProjections (assets) {
    let years = [];
    for(let year = nextYear; year <= maxProjectionYear; year++) {
        years.push(year);
    }
    const typePercentSpread = assetValue.getPercentSpread(assets);
    const assetsByType = assets.reduce((groups, asset) => {
        if (!groups[asset.type.name]) {
            groups[asset.type.name] = {
                type: asset.type,
                assets: [],
                percentSpread: typePercentSpread[asset.type.name]
            };
        }
        asset.values = getAssetValues(asset);
        groups[asset.type.name].assets.push(asset);
        return groups;
    }, {});

    let projections = [];
    for (let key in assetsByType) {
        let value = assetsByType[key];
        value.subtotals = getTotals(value.assets, value.type);
        projections.push(value);
    }
    projections.sort(byLiquidity);

    return {
        years: years,
        projections: projections,
        totals: getTotals(assets)
    };
}

module.exports = mapProjections;
