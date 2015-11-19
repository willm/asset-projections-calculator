const createRepo = require('../model-repository');
const repo = createRepo(localStorage);
const React = require('react');
const Modal = require('react-bootstrap/lib/Modal');
const Button = require('react-bootstrap/lib/Button');
const AssetForm = require('./asset-form');
const types = require('./types');
const formatAmount = require('../format-amount');

module.exports = React.createClass({
    componentDidMount () {
        $(window).on('assets-changed', () => {
            this.setState(this.getInitialState());
        });
    },
    getInitialState() {
        return {showModal: false, selectedAsset: {}};
    },
    removeAsset (e) {
        var id = e.target.attributes['data-id'].value;
        repo.deleteAsset(id);
        $(window).trigger('assets-changed');
    },
    close() {
        this.setState(this.getInitialState());
    },

    open(e) {
        let id;
        if(e.target.attributes['data-id']) {
            id = e.target.attributes['data-id'].value;
        }
        let asset = this.props.assets.filter((x) => x.id == id)[0];
        this.setState({ showModal: true, selectedAsset: asset});
    },
    render() {
        return <div className="narrow-table">
            <h2>List Of Assets</h2>
            <button className="btn btn-default"
                type="button"
                onClick={this.open}>
                <span onClick={this.open} className="glyphicon glyphicon-plus"
                    aria-hidden="true">Add
                </span>
            </button>
            <table className="table table-condensed">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Valuation Date</th>
                        <th>Projected Increase</th>
                        <th className="right value-col">Value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {this.props.assets.map(function (asset) {
                    return <tr key={asset.id}>
                        <td>{asset.name}</td>
                        <td>{asset.type.name}</td>
                        <td>{asset.purchaseDate}</td>
                        <td>{asset.increase} %</td>
                        <td className="right value-col" >{formatAmount(asset.value)}</td>
                        <td className="right">
                            <button className="btn btn-default"
                                type="button"
                                data-id={asset.id}
                                onClick={this.open}>
                                <span className="glyphicon glyphicon-pencil"
                                    aria-hidden="true"
                                    data-id={asset.id}>
                                </span>
                            </button>
                            <button className="btn btn-default"
                                type="button"
                                data-id={asset.id}
                                onClick={this.removeAsset}>
                                <span className="glyphicon glyphicon-minus"
                                    aria-hidden="true"
                                    data-id={asset.id}>
                                </span>
                            </button>
                        </td>
                    </tr>;
                }, this)}
                </tbody>
            </table>
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Asset</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AssetForm asset={this.state.selectedAsset} />
                </Modal.Body>
            </Modal>
        </div>;
    }
});
