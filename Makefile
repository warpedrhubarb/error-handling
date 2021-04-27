console:
	@node-console

install:
	npm install

test:
	npm test -s

publish:
	npm publish --dry-run

lint:
	npx eslint .
