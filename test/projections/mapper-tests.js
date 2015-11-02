'use strict';
const assert = require('assert');
const map = require('../../scripts/projections/mapper');

describe('Projection mapper', () => {
    let assets, mapped;

    beforeEach(() => {
        const assets = [{
            id: 1,
            name: 'My house',
            value: 100000,
            increase: 1,
            purchaseDate: new Date('01-01-2015'),
            type: {
                name: 'Property',
                liquidity: 1
            }
        }];

        mapped = map(assets);
    });

    it('adds 10 years of projections', () => {
        const years = [2016, 2017, 2018,
            2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

        assert.deepEqual(mapped.years, years);
    });
    it('calculates subtotals for all types of assets', () => {
        const subtotals = [101000, 102010, 103030, 104060, 105101,
          106152, 107214, 108286, 109369, 110462, 111567];

        let properties = mapped.projections.filter(
            (x) => {return x.type === 'Property';})[0];
        assert.deepEqual(properties.subtotals, subtotals);
    });
});
