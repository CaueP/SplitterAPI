# Splitter API

This repo is a part of a Graduation Project of my graduation in Analysis and Systems Development at FATEC Ipiranga. 

This project consists of a REST API that provides services for my [Splitter App for Android](https://github.com/CaueP/SplitterApp), which is an application for checking in on bar and restaurants, making order of products, splitting the bill between people sitting on a same table, and paying the bill using credit cards. The API is responsible for providing all theses services and an interface with a MySQL database.

## Requirements to run locally
- Install [NodeJS](https://nodejs.org/)
- MySQL Database and set database credentials on [vcap-local.json](vcap-local.json) config file
- Install dependencies: `npm install`
- Start application: `npm start`

## Automated testing tools

### Prereqs: 
For integration and unit testing: `npm install mocha -g`
For mutant testing: `npm install grunt -g`
For Code coverage: `npm install nyc -g`

### Commands
- Run tests: `mocha`
- Run mutant testing: `grunt stryker`
- Run code coverage: `nyc mocha`

## Other commands
- Update API Doc: `npm run apidoc`. (API documentation will be available on the route /apidoc)
