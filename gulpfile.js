'use strict';

var gulp = require('gulp-runtime').create();
var rename = require('gulp-rename');


gulp.task('css', function () {
  var postcss = require('gulp-postcss');
  var tailwindcss = require('tailwindcss');

  return gulp.src('styles.css')
    // ...
    .pipe(postcss([
      // ...
      tailwindcss('./tailwind.js'),
      require('autoprefixer'),
      // ...
    ]))
    // ...
    .pipe(gulp.dest('./app/css/'));
});

gulp.task('browsersync', function() {
    var browserSync = require('browser-sync');
	browserSync.init(null, {
		proxy: "http://localhost:8081",
        files: ["app/**/*.*"],
        browser: "google chrome",
        port: 8080,
        online: true,
        open: false,
        ui: false,
        socket: {
            domain: ':443'
        }
    });
});

gulp.task('startNodemon',  function(done) {
  var nodemon = require('gulp-nodemon');
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
            .pipe(rename('vue.js'))
            .pipe(gulp.dest("app/dist"));
    }
    gulp.src("./node_modules/vue-multipane/dist/vue-multipane.esm.js")
        .pipe(gulp.dest("app/dist"));
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

gulp.task('default', gulp.series('startNodemon','browsersync') );

gulp.task('build', gulp.series('css','vue','minify') );

gulp.task('dev', gulp.series('css','vue','startNodemon', 'browsersync') );
