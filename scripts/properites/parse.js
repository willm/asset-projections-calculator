module.exports = function parseProperty(e) {
    return {
        id: Number($('#property-id').val()),
        name: $('#property-name').val(),
        value: $('#property-value').val(),
        increase: $('#property-projected-increase').val()
    };
};
