const createRepo = require('../model-repository');
const repo = createRepo(localStorage);
const React = require('react');
const Modal = require('react-bootstrap/lib/Modal');
const Button = require('react-bootstrap/lib/Button');
const PropertyForm = require('./property-form');

module.exports = React.createClass({
    componentDidMount () {
        $(window).on('properties-changed', () => {
            this.setState(this.getInitialState());
        });
    },
    getInitialState() {
        return {showModal: false, selectedProperty: {}};
    },
    removeProperty (e) {
        var id = e.target.attributes['data-id'].value;
        repo.deleteProperty(id);
        this.props.onPropertiesChanged();
    },
    close() {
        this.setState(this.getInitialState());
    },

    open(e) {
        let id;
        if(e.target.attributes['data-id']) {
            id = e.target.attributes['data-id'].value;
        }
        var property = this.props.properties.filter((x) => x.id == id)[0];
        this.setState({ showModal: true, selectedProperty: property});
    },
    render() {
        return <div className="narrow-table">
            <h2>Properties</h2>
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
                                data-id={property.id}
                                onClick={this.open}>
                                <span className="glyphicon glyphicon-pencil"
                                    aria-hidden="true"
                                    data-id={property.id}>
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
            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Property</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PropertyForm property={this.state.selectedProperty}
                    onPropertiesChanged={this.props.onPropertiesChanged}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>;
    }
});
