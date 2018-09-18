'use strict';

var gulp = require('gulp-runtime').create();
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass        = require('gulp-sass');
const templateSet = require('swagger-template-es6-server');
const codegen = require('gulp-swagger-codegen');

gulp.task('startNodemon',  function(done) {
  const STARTUP_TIMEOUT = 5000;
  const server = nodemon({
    script: 'app.js',
    stdout: false // without this line the stdout event won't fire
  });
  let starting = false;

  const onReady = () => {
    starting = false;
    done();
  };

  server.on('start', () => {
    starting = true;
    setTimeout(onReady, STARTUP_TIMEOUT);
  });

  server.on('stdout', (stdout) => {
    process.stdout.write(stdout); // pass the stdout through
    if (starting) {
      onReady();
    }
  });
});

gulp.task('sass',  function() {
    gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('generate-code', () =>
  gulp.src(['./node_modules/gulp-swagger-codegen/examples/waffle-maker/service-contract.yaml'])
    .pipe(codegen(templateSet({
      implementationPath: '../implementation',
    })))
    .pipe(gulp.dest('./examples')));

gulp.task('browser-sync', function(done) {
	browserSync.init({
	// proxy: "http://localhost:5000",
    //     files: ["app/*.*"],
	open: false,
	host: process.env.HOSTNAME,
    notify: false,
    localOnly: true,
	server: "./app",
        port: 8080,
	},done);
    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.series('startNodemon','browser-sync', 'generate-code','sass') );



