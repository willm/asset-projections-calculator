.PHONY: build
build:
	rm -rf build
	mkdir -p build/css/vender
	mkdir -p build/js/vendor
	ln -s $$(readlink -f node_modules/bootstrap/dist/css/bootstrap.min.css) build/css/vendor
	ln -s $$(readlink -f node_modules/react/dist/react.min.js) build/js/vendor/react.min.js
	ln -s $$(readlink -f node_modules/jquery/dist/jquery.min.js) build/js/vendor/jquery.min.js
	ln -s $$(readlink -f index.html) build/index.html
	browserify ./scripts/script.jsx -t babelify --outfile build/js/bundle.js

deploy:
	npm install
	npm test
	make build
	./deploy.sh
