var Projections = require('./projections/projections');
var Properties = require('./properites/properties');
var createRepo = require('./model');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var repo = createRepo(localStorage);

function x () {
    console.log('closing');
}
var EditPropery = React.createClass({
    getInitialState() {
        return { showModal: true };
    },

    close() {
        console.log('CLOSING');
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    render() {
        return <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Body 12345
                    </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={x}>Close</Button>
                            <Button onClick={this.close} bsStyle="primary">Save changes</Button>
                        </Modal.Footer>
                </Modal.Dialog>;
    }

});

module.exports = React.createClass({
        getInitialState: function () {
            return repo.get();
        },
        onPropertiesChanged: function () {
            this.setState(repo.get());
        },
        render: function () {
            return <div id="main-container">
                <Projections properties={this.state.properties}/>
                <Properties onPropertiesChanged={this.onPropertiesChanged} properties={this.state.properties}/>
                <EditPropery />
            </div>
        }
    });

