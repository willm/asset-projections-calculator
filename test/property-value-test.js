'use strict';
var assert = require('assert');
var getPropertyValue = require('../scripts/get-property-value');

describe('property value', () => {
    it('should increase by 1% in 1 year', () => {
        var property = {
            value: 100,
            increase: 1
        };
        var value = getPropertyValue(property, 1);
        assert.equal(value, 101);
    });

    it('should increase by 2% in 2 years', () => {
        var property = {
            value: 100,
            increase: 1
        };
        var value = getPropertyValue(property, 2);
        assert.equal(value, 102.01);
    });
});
