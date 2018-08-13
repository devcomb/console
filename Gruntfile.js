'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // nodeunit: {
    //   files: ['test/**/*_test.js'],
    // },
    // jshint: {
    //   options: {
    //     jshintrc: '.jshintrc'
    //   },
    //   gruntfile: {
    //     src: 'Gruntfile.js'
    //   },
    //   lib: {
    //     src: ['lib/**/*.js']
    //   },
    //   test: {
    //     src: ['test/**/*.js']
    //   },
    // },
    watch: {
      files: 'app/scss/**/*.scss',
      tasks: ['sass']
      // gruntfile: {
      //   files: '<%= jshint.gruntfile.src %>',
      //   tasks: ['jshint:gruntfile']
      // },
      // lib: {
      //   files: '<%= jshint.lib.src %>',
      //   tasks: ['jshint:lib', 'nodeunit']
      // },
      // test: {
      //   files: '<%= jshint.test.src %>',
      //   tasks: ['jshint:test', 'nodeunit']
      // },
    },
    sass: {
      dist: {
        src: 'scss/main.scss',
        dest: 'css/main.css'
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'app/css/*.css',
            'app/*.html'
          ]
        },
        //Other options https://browsersync.io/docs/options
        options: {
          watchTask: true,
          server: './app',
          open: false,
          port: 8080,
          ui: false,
          cors: '*'
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  //grunt.loadNpmTasks('node-sass');
  // grunt.loadNpmTasks('grunt-contrib-nodeunit');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-node-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task.
  grunt.registerTask('default', ['sass', 'browserSync', 'watch']);
  //grunt.registerTask('default', ['jshint', 'nodeunit']);

};
