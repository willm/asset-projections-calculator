'use strict';
const React = require('react');
const mapper = require('./mapper');
const totalClassName = 'warning';

function getRowForAsset (asset) {
    return <tr key={asset.id}>
        <td>{asset.name}</td>
        {
            asset.values.map((v, i) => {
                return <td className="right" key={asset.name + '-' + i}>{v}</td>;
            })
        }
    </tr>;
}

function getTypeHeaderRow (typeGroup, colSpan) {
    const type = typeGroup.type.name;
    const percentSpread = typeGroup.percentSpread;
    return <tr key={type} className="pad-top no-stripe">
        <td colSpan={colSpan}>
            <h4>{type} ({percentSpread} %)</h4>
        </td>
    </tr>;
}

function getTypeSubtotalRow (typeGroup) {
    return <tr
        key={`subtotal-${typeGroup.type.name}`}
        className={totalClassName}>
            <td>{'Subtotal'}</td>
        {typeGroup.subtotals.map((t, i) => {
            return <td className="right" key={`subtotal-${typeGroup.type.name}-${i}` }>
                {t}
            </td>;
        })}
    </tr>;
}

module.exports = React.createClass({
    render: function () {
        const model = mapper(this.props.assets);
        const numberOfYears = model.years.length;
        let years = [<th key={0}></th>];
        years = years.concat(model.years.map((y) => {
            return <th key={y}>{y}</th>;
        }));

        let projectionRows = model.projections.reduce((types, typeGroup) => {
            let headerRow = getTypeHeaderRow(typeGroup,
                numberOfYears + 2);
            let assetRows = typeGroup.assets.map(getRowForAsset);
            let subtotalRow = getTypeSubtotalRow(typeGroup);
            types = types.concat(headerRow, assetRows, subtotalRow);
            return types;
        }, []);

        let totalCells = [];
        totalCells.push(<td key={'total-title'}>Total</td>);
        totalCells = totalCells.concat(model.totals.map((t, i) => {
            return <td className="right" key={`total-${i}`}>{t}</td>;
        }));
        const totalRow = <tr key={'total'} className={totalClassName}>
            {totalCells}
        </tr>;

        return <div>
            <h2>Projections</h2>
            <table className="table table-striped">
                <thead>
                    <tr>{years}</tr>
                </thead>
                <tbody>
                    {projectionRows}
                    <tr className="pad-top no-stripe">
                        <td colSpan={numberOfYears + 2}><h4>Total</h4></td>
                    </tr>
                    {totalRow}
                </tbody>
            </table>
        </div>;
    }
});
