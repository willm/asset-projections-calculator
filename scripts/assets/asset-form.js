const save = require('./save');
const types = require('./types');
const React = require('react');
const get = require('lodash.get');
const AssetForm = React.createClass({

    onSubmit(e) {
        e.preventDefault();
        save(this.refs);
        const assetChanged = new Event('assets-changed');
        window.dispatchEvent(assetChanged);
    },

    asset(attribute) {
        return get(this.props.asset, attribute);
    },

    render() {
        var typeOptions = Object.keys(types).map((t, i) => {
            const typeName = types[t].name;
            return <option key={typeName} value={typeName} >{typeName}</option>;
        });
        return <form ref="assetForm" action="#" id="add-asset" onSubmit={this.onSubmit}>
            <input className="form-control hide" type="text"
                name="asset-id" id="asset-id" ref="assetId" readOnly
                value={this.asset('id')}
            />
            <div className="form-group">
                <label htmlFor="asset-type">Type</label>
                <select className="form-control"
                    name="asset-type"
                    id="asset-type"
                    defaultValue={this.asset('type.name')}
                    ref="assetType">
                    {typeOptions}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="asset-purchase-date">Purchase year</label>
                <input className="form-control"
                    type="number" required min="1000" placeholder="Purchase Year"
                    id="asset-purchase-date" name="asset-purchase-date" ref="purchaseDate"
                    defaultValue={this.asset('purchaseDate') || new Date().getFullYear()}
                />
            </div>
            <div className="form-group">
                <label className="sr-only" htmlFor="asset-name">Asset Name</label>
                <input className="form-control" type="text"
                    name="asset-name" id="asset-name"
                    placeholder="Asset Name"
                    ref="assetName"
                    defaultValue={this.asset('name')}
                />
            </div>
            <div className="form-group">
                    <label className="sr-only" htmlFor="asset-value">Value</label>
                    <input className="form-control" type="number"
                        name="asset-value" id="asset-value"
                        placeholder="Value"
                        ref="assetValue"
                        defaultValue={this.asset('value')}
                    />
            </div>
            <div className="form-group">
                <div className="input-group">
                        <label className="sr-only" htmlFor="asset-projected-increase">Yearly increase (%)</label>
                        <input className="form-control" type="number"
                            name="asset-projected-increase"
                            ref="assetProjectedIncrease"
                            id="asset-projected-increase"
                            placeholder="Projected Increase"
                            defaultValue={this.asset('increase')}
                        />
                        <div className="input-group-addon">%</div>
                </div>
            </div>
            <button className="btn btn-default" type="submit">
                <span className="glyphicon glyphicon-plus" aria-hidden="true">Save</span>
            </button>
        </form>;
    }
});
module.exports = AssetForm;
