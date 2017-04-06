var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest') ;

var jsFiles = ['*.js', 'src/**/*.js'];

// task to reload my application when saved
gulp.task('default', function() {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_module/**']
    })
    .on('restart', function() {
        console.log('Restarting');
    });
});

gulp.task('test', function() {

    // setting environment to test
    env({vars: {ENV: 'Test'}});

    // setting all files to be run
    gulp.src('test/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'spec'}))    // spec or nyan
});