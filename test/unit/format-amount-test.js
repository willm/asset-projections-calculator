import assert from 'assert';
import formatAmount from '../../scripts/format-amount.js';

describe('format number', () => {
    [
        {input: 100, output: '100'},
        {input: 1000, output: '1,000'},
        {input: 10000, output: '10,000'},
        {input: 987632, output: '987,632'},
    ].forEach((testCase) => {
        it(`formats ${testCase.input} as ${testCase.output}`,
           () => {
                assert.equal(testCase.output, formatAmount(testCase.input));
        });
    });
});
