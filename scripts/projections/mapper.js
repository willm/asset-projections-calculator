const numberOfYears = 10;
const nextYear = new Date().getFullYear() + 1;
const maxProjectionYear = nextYear + numberOfYears;
const assetValue = require('../../scripts/asset-value');

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
            groups[asset.type.name] = { type: asset.type, assets: [] };
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
    function byLiquidity(a, b) {
        if (a.type.liquidity > b.type.liquidity) {
            return -1;
        }
        if (a.type.liquidity < b.type.liquidity) {
            return 1;
        }
        return 0;
    }

    return {
        years: years,
        projections: projections,
        totals: getTotals(assets)
    };
}

module.exports = mapProjections;
