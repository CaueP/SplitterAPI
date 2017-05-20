# Splitter API
Author: Cauê Garcia Polimanti

This API is the backend of my [Splitter App for Android](https://github.com/CaueP/SplitterApp). This is a part of a Graduation Project of my graduation in Analysis and Systems Development at FATEC Ipiranga.

## Requirements to run locally:
- Install [NodeJS](https://nodejs.org/)
- MySQL Database and set database credentials on [vcap-local.json](vcap-local.json) config file
- Install dependencies: `npm install`
- Start application: `npm start`

## Tests

### Prereqs: 
For integration and unit testing: `npm install mocha -g`
For mutant testing: `npm install grunt -g`
For Code coverage: `npm install nyc -g`

### Commands:
- Run tests: `mocha`
- Run mutant testing: `grunt stryker`
- Run code coverage: `nyc mocha`

## Other commands:
- Update API Doc: `npm run apidoc`. (API documentation will be available on the route /apidoc)