module.exports = function(grunt) {
    
    // Load the stryker task
    grunt.loadNpmTasks('grunt-stryker');

    grunt.initConfig({
        // ...
        stryker: {
            options: {
                configFile: 'stryker.conf.js' 
            },
            mutationTest: { /* Can be empty */ }
        }
        // ..
    });
};