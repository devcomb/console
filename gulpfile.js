'use strict';

var gulp = require('gulp-runtime').create();
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass        = require('gulp-sass');


gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['sass'], function() {
	browserSync.init(null, {
	//proxy: "http://localhost:5000",
        //files: ["app/*.*"],
	open: false,
	//host: process.env.HOSTNAME,
	server: "./app",
        port: 8080,
	});
    	gulp.watch("app/scss/*.scss", ['sass']);
    	gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});
