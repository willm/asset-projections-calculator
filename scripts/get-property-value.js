'use strict';

function getPropertyValue (property, numberOfYears) {
    var value = Number(property.value);
    var increase = Number(property.increase);
    var totalValue = value;
    for(var i = 0; i < numberOfYears; i++) {
        totalValue += (totalValue * (increase / 100));
    }
    return totalValue;
}
module.exports = getPropertyValue;
