const assetValue = require('../asset-value');
const React = require('react');
let nextYear = new Date().getFullYear() + 1;
const numberOfYears = 10;
const maxProjectionYear=nextYear + numberOfYears;

function cellsForAsset (asset) {
    let cells = [];
    for(let year = nextYear; year <= maxProjectionYear; year++) {
        cells.push(<td key={year}>{assetValue.getAssetValue(asset, year)}</td>);
    }
    return cells;
}

function cellsForTotal (asset, type) {
    let cells = [];
    for(let year = nextYear; year <= maxProjectionYear; year++) {
        cells.push(<td key={year}>{assetValue.getTotal(asset, year, type)}</td>);
    }
    return cells;
}

let ProjectionRow = React.createClass({
    render (){
        let cells = this.props.getCellData();
        return <tr key={this.props.key} className={this.props.className}>
            <td>{this.props.name}</td>
            {cells}
        </tr>;
    }
});

module.exports = React.createClass({
    render: function () {
        let years = [<th key={0}></th>];
        let assets = [];
        for(let year = nextYear; year <= maxProjectionYear; year++) {
            years.push(<th key={year}>{year}</th>);
        }

        const assetsByType = this.props.assets.reduce((groups, asset) => {
            if (!groups[asset.type]) {
                groups[asset.type] = [<tr className="pad-top no-stripe"><td colSpan={numberOfYears + 2}><h4>{asset.type}</h4></td></tr>];
            }
            groups[asset.type].push(<ProjectionRow key={asset.id} getCellData={cellsForAsset.bind(null, asset)} name={asset.name}/>);
            return groups;
        }, {});
        let rows = [];
        for (let type in assetsByType) {
            let assetsForType = assetsByType[type];
            let subtotal = <ProjectionRow key={"subtotal-" + type} className="warning"
                name={'Subtotal'}
                getCellData={cellsForTotal.bind(null, this.props.assets, type)} />
            assetsForType.push(subtotal);
            rows = rows.concat(assetsForType);
        }

        return <div>
            <h2>Projections</h2>
            <table className="table table-striped">
                <thead>
                    <tr>{years}</tr>
                </thead>
                <tbody>
                    {rows}
                    <ProjectionRow key={"total"} className="warning pad-top"
                        name={'Total'}
                        getCellData={cellsForTotal.bind(null, this.props.assets)} />
                </tbody>
            </table>
        </div>;
    }
});

