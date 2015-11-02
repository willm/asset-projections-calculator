const React = require('react');
const save = require('./save');
const DateTime = require('react-bootstrap-datetimepicker');
const types = require('./types');
const AssetForm = React.createClass({

    onSubmit(e) {
        e.preventDefault();
        save(e);
        $('#add-asset').trigger('assets-changed');
    },

    asset(attribute) {
        if(this.props.asset && this.props.asset[attribute]){
            return this.props.asset[attribute];
        }
        return null;
    },

    render() {
        var typeOptions = Object.keys(types).map((t) => {
            return <option key={t}>{types[t]}</option>;
        });
        return <form action="#" id="add-asset" onSubmit={this.onSubmit}>
            <input className="form-control hide" type="text"
                name="asset-id" id="asset-id"
                value={this.asset('id')}
            />
            <div className="form-group">
                <select className="form-control"
                    name="asset-type"
                    id="asset-type">
                    {typeOptions}
                </select>
            </div>
            <div className="form-group">
                <DateTime inputProps={{id: "asset-purchase-date", name:"asset-purchase-date"}}/>
            </div>
            <div className="form-group">
                <label className="sr-only" htmlFor="asset-name">Asset Name</label>
                <input className="form-control" type="text"
                    name="asset-name" id="asset-name"
                    placeholder="Asset Name"
                    defaultValue={this.asset('name')}
                />
            </div>
            <div className="form-group">
                    <label className="sr-only" htmlFor="asset-value">Value</label>
                    <input className="form-control" type="number"
                        name="asset-value" id="asset-value"
                        placeholder="Value"
                        defaultValue={this.asset('value')}
                    />
            </div>
            <div className="form-group">
                <div className="input-group">
                        <label className="sr-only" htmlFor="asset-projected-increase">Yearly increase (%)</label>
                        <input className="form-control" type="number"
                            name="asset-projected-increase"
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