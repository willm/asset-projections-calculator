module.exports = function parseProperty(e) {
    return {
        name: $('#property-name').val(),
        value: $('#property-value').val(),
        increase: $('#property-projected-increase').val()
    };
};