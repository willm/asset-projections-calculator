'use strict';
var assert = require('assert');
var getAssetValue = require('../scripts/get-asset-value');

describe('asset value', () => {
    it('should increase by 1% in 1 year', () => {
        var asset = {
            value: 100,
            increase: 1
        };
        var value = getAssetValue(asset, 1);
        assert.equal(value, 101);
    });

    it('should increase by 2% in 2 years', () => {
        var asset = {
            value: 100,
            increase: 1
        };
        var value = getAssetValue(asset, 2);
        assert.equal(value, 102);
    });
});
