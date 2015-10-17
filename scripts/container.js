var Projections = require('./projections/projections');
var Properties = require('./properites/properties');
var createRepo = require('./model-repository');
var repo = createRepo(localStorage);
var React = require('react');


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
            </div>
        }
    });

