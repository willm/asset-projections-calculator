#Asset projection calculator

A web application to track and analyse your personal asset portfolio intended for the [finance-eco-money](http://finance-eco-money.lu/) website.

###Data protection

For an application such as this, it's important to point out that no personal financial data is transfered over the internet (either back to the host or to a third party). This is a client side only application which stores the data in the user's [local storage](http://www.html5rocks.com/en/features/storage). Analysing your browser's network pannel or even shutting down your internet connection (the app will work offline).

###Tech

The calculator makes use of:

 * facebook's [react.js](https://facebook.github.io/react/)
 * twitter's [bootstrap](http://getbootstrap.com/) and its react wrapper [react-bootstrap](https://react-bootstrap.github.io/)
 * [node js](https://nodejs.org) and npm (for the build process)
 * [babel js](https://babeljs.io/) (to take advantage of JSX and es6 or es 2015 features)
 * [browserify](http://browserify.org/) to enable client side modularity.

###Development Requirements

* a Linux or OSX machine, although windows support could be added fairly trivialy
* node js
* python (this is only used in development to serve a directory of static files)
* make

###Running the tests

1. `npm install` this will install all the project's dependencies.
2. `npm test` will run all the unit tests.
3. `make build` this will, symlink required libraries and css and will compile the javascript into a single bundle.
4. During development, it's a good idea to run `make build-js` (this will only recompile the javascript)
5. Open tests.html in a browser this runs integration tests. TODO: automate this (using karma?)

###Deployment

This is currently hosted on github pages, to deploy (assuming you have push access to willm.github.io) run `make deploy`
