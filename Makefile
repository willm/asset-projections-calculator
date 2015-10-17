.PHONY: build
build:
	rm -rf build
	mkdir build
	ln -fs $$(readlink -f css) build/css
	mkdir -p build/css/vendor/bootstrap/dist
	cp node_modules/bootstrap/dist/css/bootstrap.min.css css/vendor/bootstrap/dist/bootstrap.min.css
	cp -r node_modules/bootstrap/fonts/ css/vendor/bootstrap/fonts
	mkdir -p build/js/vendor
	ln -fs $$(readlink -f node_modules/react/dist/react.min.js) build/js/vendor/react.min.js
	ln -fs $$(readlink -f node_modules/jquery/dist/jquery.min.js) build/js/vendor/jquery.min.js
	ln -fs $$(readlink -f node_modules/bootstrap/dist/js/bootstrap.min.js) build/js/vendor/bootstrap.min.js
	ln -fs $$(readlink -f index.html) build/index.html
	make build-js

build-js:
	node_modules/.bin/browserify ./scripts/script.jsx -t babelify --outfile build/js/bundle.js

deploy:
	npm install
	npm test
	make build
	rm -rf /tmp/AssetProjections
	cd /tmp; git clone git@github.com:willm/AssetProjections.git; rm -rf AssetProjections/*
	cp -Lr build/* /tmp/AssetProjections/
	cd /tmp/AssetProjections; git add -A; \
		git commit -m "$$(date)"; git push origin master;

start:
	cd build; python -m SimpleHTTPServer
