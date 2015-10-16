const createRepo = require('../model');
const repo = createRepo(localStorage);
const React = require('react');
const Modal = require('react-bootstrap/lib/Modal');
const Button = require('react-bootstrap/lib/Button');
const PropertyForm = require('./property-form');

module.exports = React.createClass({
    getInitialState() {
        return {showModal: false};
    },
    removeProperty (e) {
        console.log(e.target.attributes);
        var id = e.target.attributes['data-id'].value;
        repo.deleteProperty(id);
        this.props.onPropertiesChanged();
    },
    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },
    render() {
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
                    return <tr key={property.id}>
                        <td>{property.name}</td>
                        <td>{property.value}</td>
                        <td>{property.increase} %</td>
                        <td>
                            <button className="btn btn-default"
                                type="button"
                                onClick={this.open}>
                                <span className="glyphicon glyphicon-pencil"
                                    aria-hidden="true">
                                </span>
                            </button>
                            <button className="btn btn-default"
                                type="button"
                                data-id={property.id}
                                onClick={this.removeProperty}>
                                <span className="glyphicon glyphicon-minus"
                                    aria-hidden="true"
                                    data-id={property.id}>
                                </span>
                            </button>
                        </td>
                    </tr>;
                }, this)}
                </tbody>
            </table>
            <PropertyForm onPropertiesChanged={this.props.onPropertiesChanged} />
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Property</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PropertyForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>;
    }
});
