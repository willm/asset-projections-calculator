var getPropertyValue = require('../get-property-value');
var React = require('react');

module.exports = React.createClass({
    render: function () {
        let years = [<th></th>];
        let assets = [];
        let totals = [];
        for(let i = 1; i <= 10; i++) {
            years.push(<th>{2015 + i}</th>);
            totals.push(<td>{getTotal(this.props.properties, i)}</td>);
        }
        this.props.properties.map(function (property) {
            return <ProjectionRow property={property} />;
        });
        return <div>
            <h2>Projections</h2>
            <table className="table table-striped">
                <thead>
                    <tr>{years}</tr>
                </thead>
                <tbody>
                    {this.props.properties.map(function (property) {
                        return <ProjectionRow property={property} />;
                    })}
                    <tr className="warning">
                        <td>Total</td>
                        {totals}
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
        let cells = [];
        for(let i = 1; i <= 10; i++) {
            cells.push(<td>{getPropertyValue(this.props.property, i)}</td>);
        }
        return <tr key={this.props.property.id}>
            <td>{this.props.property.name}</td>
            {cells}
        </tr>;
    }
});
