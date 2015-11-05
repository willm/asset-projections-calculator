'use strict';
const assetValue = require('../asset-value');
const React = require('react');
let nextYear = new Date().getFullYear() + 1;
const numberOfYears = 10;
const maxProjectionYear=nextYear + numberOfYears;
const mapper = require('./mapper');

module.exports = React.createClass({
    render: function () {
        const model = mapper(this.props.assets);
        let years = [<th key={0}></th>];
        years = years.concat(model.years.map((y) => {
            return <th key={y}>{y}</th>;
        }));

        let x = model.projections.reduce((types, typeGroup) => {
            types.push(<tr key={typeGroup.type} className="pad-top no-stripe">
                <td colSpan={model.years.length + 2}>
                    <h4>{typeGroup.type}</h4>
                </td>
            </tr>);
            var ts = typeGroup.assets.map((a) => {
                return <tr key={a.id}>
                    <td>{a.name}</td>
                    {a.values.map((v) => {return <td key={a.name + '-' + v}>{v}</td>;})}
                </tr>;
            });
            types = types.concat(ts);
            types.push(<tr key={`subtotal-${typeGroup.type}`} className={'warning'}>
                <td>{'Subtotal'}</td>
                {typeGroup.subtotals.map((t, i) => {return <td key={`subtotal-${typeGroup.type}-${i}` }>{t}</td>;})}
            </tr>);
            return types;
        }, []);

        const totals = model.totals.map((t, i) => {
            return <td key={`total-${i}`}>{t}</td>;
        });
        totals.unshift(<td key={'total-title'}>Total</td>);
        const totalRow = <tr key={'total'} className={'warning'}>
            {totals}
        </tr>;

        return <div>
            <h2>Projections</h2>
            <table className="table table-striped">
                <thead>
                    <tr>{years}</tr>
                </thead>
                <tbody>
                    {x}
                    <tr className="pad-top no-stripe">
                        <td colSpan={numberOfYears + 2}><h4>Total</h4></td>
                    </tr>
                    {totalRow}
                </tbody>
            </table>
        </div>;
    }
});
