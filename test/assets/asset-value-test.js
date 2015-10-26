'use strict';
var assert = require('assert');
var assetValue = require('../../scripts/asset-value');
var getAssetValue = assetValue.getAssetValue;
var types = require('../../scripts/assets/types');

describe('asset value', () => {
    describe('get asset value', () => {
        it('should increase by 1% in 1 year', () => {
            var year = new Date().getFullYear();
            var asset = {
                value: 100,
                increase: 1,
                purchaseDate: '10/25/15 8:57 AM'
            };
            var value = getAssetValue(asset, 2016);
            assert.equal(value, 101);
        });

        it('should increase by 2% in 2 years', () => {
            var asset = {
                value: 100,
                increase: 1,
                purchaseDate: '10/25/15 8:57 AM'
            };
            var value = getAssetValue(asset, 2017);
            assert.equal(value, 102);
        });
    });
    describe('get total', () => {
        it('should total the value of all assets', () => {
            var assets = [{
                value: 100,
                increase: 1,
                purchaseDate: '10/25/15 8:57 AM'
            },
            {
                value: 100,
                increase: 1,
                purchaseDate: '10/25/15 8:57 AM'
            }];

            let total = assetValue.getTotal(assets, 2016);

            assert.equal(total, 202);
        });
        it('should total the value of assets of a given type', () => {
            var assets = [{
                value: 100,
                increase: 1,
                purchaseDate: '10/25/15 8:57 AM',
                type: types.CASH
            },
            {
                value: 100,
                increase: 1,
                purchaseDate: '10/25/15 8:57 AM',
                type: types.CASH
            },
            {
                value: 100,
                increase: 1,
                purchaseDate: '10/25/15 8:57 AM',
                type: types.ASSET
            }];

            let total = assetValue.getTotal(assets, 2016, types.CASH);

            assert.equal(total, 202);
        });
    });
});
