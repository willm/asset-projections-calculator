var Projections = require('./projections');
var Assets = require('./assets');
var createRepo = require('./model-repository');
var repo = createRepo(localStorage);
var React = require('react');

module.exports = React.createClass({
        getInitialState () {
            return repo.get();
        },
        componentDidMount () {
            window.addEventListener('assets-changed', () => {
                this.setState(this.getInitialState());
            });
        },
        render () {
            return <div id="main-container">
                <h1>My Private Portfolio Projections</h1>
                <Projections assets={this.state.assets}/>
                <Assets  assets={this.state.assets}/>
            </div>
        }
    });

