var save = require('./save');

module.exports = React.createClass({
    onSubmit: function (e) {
        e.preventDefault();
        save(e);
        this.props.onPropertyAdded();
    },
    render: function () {
        return <div className="narrow-table">
            <h2>Properties</h2>
            <table className="table table-condensed">
                <thead>
                    <tr>
                        <th>Property Name</th>
                        <th>Property Value</th>
                        <th>Projected Increase</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.properties.map(function (property) {
                    return <tr>
                        <td>{property.name}</td>
                        <td>{property.value}</td>
                        <td>{property.increase} %</td>
                    </tr>;
                })}
                </tbody>
            </table>
            <form className="form-inline" action="#" id="add-property" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label className="sr-only" htmlFor="property-name">Property Name</label>
                    <input className="form-control" type="text"
                        name="property-name" id="property-name"
                        placeholder="Property Name"
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
            </form>
        </div>;
    }
});
