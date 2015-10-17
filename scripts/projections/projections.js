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
                        return <ProjectionRow property={property} />;
                    })}
                    <tr className="warning">
                        <td>Total</td>
                        <td>{getTotal(this.props.properties, 1)}</td>
                        <td>{getTotal(this.props.properties, 2)}</td>
                        <td>{getTotal(this.props.properties, 3)}</td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
});

function getTotal(properties, year) {
    return properties.reduce((total, property) => {
        return total + getPropertyValue(property, year);
    }, 0);
}

let ProjectionRow = React.createClass({
    render (){
        return <tr key={this.props.property.id}>
            <td>{this.props.property.name}</td>
            <td>{getPropertyValue(this.props.property, 1)}</td>
            <td>{getPropertyValue(this.props.property, 2)}</td>
            <td>{getPropertyValue(this.props.property, 3)}</td>
        </tr>;
    }
});
