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
                <div className="header">
                    <h1 className="header-title">My Private Portfolio Projections</h1>
                    <img
                        src="http://www.finance-eco-money.org/images/logo/Logo2_XXS.png"
                        className="header-logo"
                        alt="logo" />
                </div>
                <Projections assets={this.state.assets}/>
                <Assets  assets={this.state.assets}/>
            </div>
        }
    });

