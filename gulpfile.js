'use strict';

var gulp = require('gulp-runtime').create();
var execSync = require('child_process').execSync;
var nodemon = require('gulp-nodemon');

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

gulp.task('vue',  function(done) {
    if(process.env.DEV_MODE){
        gulp.src("./node_modules/vue/dist/vue.js")
            .pipe(gulp.dest("app/dist"));
    }
    else{
        gulp.src("./node_modules/vue/dist/vue.min.js")
            .pipe(gulp.dest("app/dist"));
    }
    done();
});

gulp.task('sass',  function(done) {
    var sass = require('gulp-sass');
    gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"));
    done();
});

gulp.task('generate-code', function(done) {
    execSync("./node_modules/.bin/og -o api/gen -t ./templates petstore.yaml express", {stdio:[0,1,2]});
    done();
});

gulp.task('minify', function(done) {
    var minify = require('gulp-minify');
    gulp.src(['app/*.js', 'app/*.mjs'])
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest("app/dist"));
    done();
});

gulp.task('default', gulp.series('startNodemon') );

gulp.task('postinstall', gulp.series('generate-code','minify','sass','vue') );

gulp.task('dev', gulp.series('generate-code','sass','startNodemon') );
