'use strict';
const assert = require('assert');
const map = require('../../../scripts/projections/mapper');
const types = require('../../../scripts/assets/types');

describe('Projection mapper', () => {
    let assets, mapped;

    beforeEach(() => {
        let asset = (type) => {
            return {
                id: 1,
                name: 'assetName',
                value: 100000,
                increase: 1,
                purchaseDate: new Date('01-01-2015'),
                type: type
            };
        };

        const assets = [asset(types.PROPERTY), asset(types.CASH)];

        mapped = map(assets);
    });

    it('adds 10 years of projections', () => {
        const years = [2016, 2017, 2018,
            2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

        assert.deepEqual(mapped.years, years);
    });

    it('calculates subtotals for all types of assets', () => {
        const subtotals = ['101,000', '102,010', '103,030', '104,060', '105,101',
          '106,152', '107,214', '108,286', '109,369', '110,462', '111,567'];

        let properties = mapped.projections.filter(
            (x) => {return x.type.name === 'Property';})[0];
        assert.deepEqual(properties.subtotals, subtotals);
    });

    it('calculates the projections for each asset', () => {
        const values = ['101,000', '102,010', '103,030', '104,060', '105,101',
          '106,152', '107,214', '108,286', '109,369', '110,462', '111,567'];
        const properties = mapped.projections.filter(
            (x) => {return x.type.name === 'Property';})[0];
        const property = properties.assets[0];

        assert.deepEqual(property.values, values);
    });

    it('calculates the totals', () => {
        const totals = [ '202,000', '204,020', '206,060', '208,120', '210,202',
          '212,304', '214,428', '216,572', '218,738', '220,924', '223,134' ];

        assert.deepEqual(mapped.totals, totals);
    });

    it('sorts projections by liquidity', () => {
        assert.equal(mapped.projections[0].type.name, 'Cash');
        assert.equal(mapped.projections[1].type.name, 'Property');
    });

    it('calculates the percentage of the total portfolio for each type', () =>{
        assert.equal(mapped.projections[0].percentSpread, 50);
        assert.equal(mapped.projections[1].percentSpread, 50);
    });
});
