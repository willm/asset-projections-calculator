var Projections = require('./projections/projections');
var Properties = require('./properites/properties');
var createRepo = require('./model-repository');
var repo = createRepo(localStorage);
var React = require('react');

module.exports = React.createClass({
        getInitialState () {
            return repo.get();
        },
        componentDidMount () {
            $(window).on('properties-changed', () => {
                this.setState(this.getInitialState());
            });
        },
        render () {
            return <div id="main-container">
                <Projections properties={this.state.properties}/>
                <Properties properties={this.state.properties}/>
            </div>
        }
    });

