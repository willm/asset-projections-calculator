const types = require('./types');

module.exports = function parseAsset(e) {
    var type = Object.keys(types).filter((x) => {
            return types[x].name === $('#asset-type').val();
        })[0];

    return {
        id: Number($('#asset-id').val()),
        name: $('#asset-name').val(),
        value: $('#asset-value').val(),
        increase: $('#asset-projected-increase').val(),
        purchaseDate: $('#asset-purchase-date').val(),
        type: types[type]
    };
};
