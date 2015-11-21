import AssetForm from '../../scripts/assets/asset-form.js';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ShallowTestUtils from 'react-shallow-testutils';
import types from '../../scripts/assets/types.js';
import assert from 'assert';

describe('asset form', () => {
    it('pre fills the form for an existing asset', () => {
        const asset = {
            id: 1234,
            purchaseDate: 2015,
            name: 'name',
            value: 100,
            increase: 4,
            type: types.CASH
        };

        const renderer = TestUtils.createRenderer();
        const assetForm = <AssetForm asset={asset}/>;
        renderer.render(assetForm);
        const tree = renderer.getRenderOutput();
        const options = ShallowTestUtils.findAllWithType(tree, 'option');

        const selected = options.filter((o) => {
            return o.props.selected !== undefined;
        });
        assert.equal(selected[0].props.children, 'Cash');
    });
});
