.PHONY: build
build:
	rm -rf build
	mkdir -p build/css/vendor
	mkdir -p build/js/vendor
	ln -s $$(readlink -f node_modules/bootstrap/dist/css/bootstrap.min.css) build/css/vendor/bootstrap.min.css
	ln -s $$(readlink -f node_modules/react/dist/react.min.js) build/js/vendor/react.min.js
	ln -s $$(readlink -f node_modules/jquery/dist/jquery.min.js) build/js/vendor/jquery.min.js
	ln -s $$(readlink -f index.html) build/index.html
	make build-js

build-js:
	browserify ./scripts/script.jsx -t babelify --outfile build/js/bundle.js

deploy:
	npm install
	npm test
	make build
	rm -rf /tmp/AssetProjections
	cd /tmp; git clone git@github.com:willm/AssetProjections.git
	cp -Lr build /tmp/AssetProjections/
	cd /tmp/AssetProjections; git add -A; \
		git commit -m "$$(date)"; git push origin master
