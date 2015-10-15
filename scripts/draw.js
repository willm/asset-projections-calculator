var Container = require('./container');
var ReactDOM = require('react-dom');
var React = require('react');

module.exports = function draw () {
    ReactDOM.render(<Container />,
            document.getElementById("content"));
}
