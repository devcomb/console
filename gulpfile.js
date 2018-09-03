'use strict';

var gulp = require('gulp-runtime').create();
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass        = require('gulp-sass');


gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
	proxy: "http://localhost:8080",
        files: ["app/*.*"],
	open: false,
        port: 8081,
	});
});

gulp.task('nodemon', ['sass'], function (cb) {
	
	var started = false;
	
	return nodemon({
		script: '--inspect=5859 app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});
