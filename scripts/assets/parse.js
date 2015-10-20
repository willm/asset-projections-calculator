module.exports = function parseAsset(e) {
    return {
        id: Number($('#asset-id').val()),
        name: $('#asset-name').val(),
        value: $('#asset-value').val(),
        increase: $('#asset-projected-increase').val()
    };
};
