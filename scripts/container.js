var Projections = require('./projections/projections');
var Properties = require('./properites/properties');
var createRepo = require('./model');
var repo = createRepo();

module.exports = React.createClass({
        getInitialState: function () {
            return repo.get();
        },
        onPropertyAdded: function () {
            this.setState(repo.get());
        },
        render: function () {
            return <div id="main-container">
                <Projections properties={this.state.properties}/>
                <Properties onPropertyAdded={this.onPropertyAdded} properties={this.state.properties}/>
            </div>
        }
    });

