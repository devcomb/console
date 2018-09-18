'use strict';

var gulp = require('gulp-runtime').create();
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass        = require('gulp-sass');
const templateSet = require('swagger-template-es6-server');
const codegen = require('gulp-swagger-codegen');

gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['generate-code','sass'], function() {
	browserSync.init(null, {
	// proxy: "http://localhost:5000",
    //     files: ["app/*.*"],
	open: false,
	host: process.env.HOSTNAME,
	server: "./app",
        port: 8080,
	});
    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('sass',  function() {
    return gulp.src("app/scss/*.scss")
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
