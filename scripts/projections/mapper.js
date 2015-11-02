var projections = {
    years: [
        2000, 2001, 2002
    ],
    projections: [
        {
            type: "Property",
            subtotals: [
                300, 301, 303
            ],
            liquidity: 1
        },{
            type: "Cash",
            subtotals: [
                300, 301, 303
            ],
            liquidity: 2
        }
    ]
};

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
function map (assets) {
    let years = [];
    for(let year = nextYear; year <= maxProjectionYear; year++) {
        years.push(year);
    }
    const assetsByType = assets.reduce((groups, asset) => {
        if (!groups[asset.type.name]) {
            groups[asset.type.name] = { type: asset.type.name, assets: [] };
        }
        groups[asset.type.name].assets.push(asset);
        return groups;
    }, {});
    let projections = [];
    for (let type in assetsByType) {
        let assetsForType = assetsByType[type];
        let subtotals = getTotals(assetsForType.assets, type.name);
        projections.push({type: type, subtotals: subtotals});
    }
    return {
        years: years,
        projections: projections
    };
}

module.exports = map;
