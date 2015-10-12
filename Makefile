build:
	if [ ! -L static/css/vendor/bootstrap.min.css ] ; \
	then \
		ln -s $$(readlink -f node_modules/bootstrap/dist/css/bootstrap.min.css) static/css/vendor ; \
	fi;
	browserify ./scripts/script.jsx -t babelify --outfile static/js/bundle.js

deploy:
	npm install
	npm test
	make build
	./deploy.sh
