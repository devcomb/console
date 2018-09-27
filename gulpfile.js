'use strict';

var gulp = require('gulp-runtime').create();
var execSync = require('child_process').execSync;
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

gulp.task('startNodemon',  function(done) {
  const STARTUP_TIMEOUT = 5000;
  const server = nodemon({
    script: 'app.js',
    stderr: false,
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

  server.on('stderr', (err) => {
    process.stderr.write(err); // pass the stdout through
    if (starting) {
      process.exit(1);
    }
  });

});

gulp.task('sass',  function(done) {
    console.log("sass");
    gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"));
    done();
});

gulp.task('generate-code', function(done) {
    execSync("./node_modules/.bin/og -o api/gen -t ./templates petstore.yaml express", {stdio:[0,1,2]});
    done();
});

gulp.task('default', gulp.series('startNodemon') );

gulp.task('postinstall', gulp.series('generate-code','sass') );

gulp.task('dev', gulp.series('generate-code','sass','startNodemon') );
