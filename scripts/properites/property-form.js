const React = require('react');
const save = require('./save');
const PropertyForm = React.createClass({

    onSubmit(e) {
        e.preventDefault();
        save(e);
        this.props.onPropertiesChanged();
    },

    p() {
        if(this.props.property){
            console.log(this.props.propery);
            return this.props.property.value;
        }
        return null;
    },

    render() {
        return <form className="form-inline" action="#" id="add-property" onSubmit={this.onSubmit}>
            <div className="form-group">
                <label className="sr-only" htmlFor="property-name">Property Name</label>
                <input className="form-control" type="text"
                    name="property-name" id="property-name"
                    placeholder="Property Name" 
                    defaultValue={this.p()}
                />
            </div>
            <div className="form-group">
                    <label className="sr-only" htmlFor="property-value">Value</label>
                    <input className="form-control" type="number"
                        name="property-value" id="property-value"
                        placeholder="Value"
                    />
            </div>
            <div className="form-group">
                <div className="input-group">
                        <label className="sr-only" htmlFor="property-projected-increase">Yearly increase (%)</label>
                        <input className="form-control" type="number"
                            name="property-projected-increase"
                            id="property-projected-increase"
                            placeholder="Projected Increase"
                        />
                        <div className="input-group-addon">%</div>
                </div>
            </div>
            <button className="btn btn-default" type="submit">
                <span className="glyphicon glyphicon-plus" aria-hidden="true">Add</span>
            </button>
        </form>;
    }

});
module.exports = PropertyForm;
