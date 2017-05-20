module.exports = function(config){
  config.set({
    files: [
        // Add your files here, this is just an example:
        { pattern: 'src/**/*.js', mutated: true, included: false},
        'test/**/*.js',
        { pattern: 'app.js', included: false, mutated: false }, // Extra files you need can be mentioned like this
        { pattern: 'vcap-local.json', included: false, mutated: false }
        //'!src/fileToIgnore.js' // You can exclude files if you want
    ],
    testRunner: 'mocha',
    testFramework: 'mocha',
    coverageAnalysis: 'perTest',
    reporter: ['clear-text', 'progress'],
  });
}