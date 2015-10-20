const getAssetValue = require('../get-asset-value');
const React = require('react');
const numberOfYears=10;

module.exports = React.createClass({
    render: function () {
        let years = [<th key={0}></th>];
        let assets = [];
        let totals = [];
        for(let i = 1; i <= numberOfYears; i++) {
            years.push(<th key={i}>{2015 + i}</th>);
            totals.push(<td key={i}>{getTotal(this.props.assets, i)}</td>);
        }
        this.props.assets.map(function (asset) {
            return <ProjectionRow asset={asset} />;
        });
        return <div>
            <h2>Projections</h2>
            <table className="table table-striped">
                <thead>
                    <tr>{years}</tr>
                </thead>
                <tbody>
                    {this.props.assets.map(function (asset) {
                        return <ProjectionRow key={asset.id} asset={asset} />;
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

function getTotal(assets, year) {
    return assets.reduce((total, asset) => {
        return total + getAssetValue(asset, year);
    }, 0);
}

let ProjectionRow = React.createClass({
    render (){
        let cells = [];
        for(let i = 1; i <= numberOfYears; i++) {
            cells.push(<td key={i}>{getAssetValue(this.props.asset, i)}</td>);
        }
        return <tr key={this.props.asset.id}>
            <td>{this.props.asset.name}</td>
            {cells}
        </tr>;
    }
});
