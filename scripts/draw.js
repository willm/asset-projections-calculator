var Container = require('./container');

module.exports = function draw () {
    React.render(<Container />,
            document.getElementById("content"));
}
