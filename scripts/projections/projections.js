var getPropertyValue = require('../get-property-value');
var React = require('react');

module.exports = React.createClass({
    render: function () {
        return <div>
            <h2>Projections</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>2015</th>
                        <th>2016</th>
                        <th>2017</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.properties.map(function (property) {
                        return <tr key={property.id}>
                            <td>{property.name}</td>
                            <td>{getPropertyValue(property, 1)}</td>
                            <td>{getPropertyValue(property, 2)}</td>
                            <td>{getPropertyValue(property, 3)}</td>
                        </tr>;
                    })}
                </tbody>
            </table>
        </div>;
    }
});
