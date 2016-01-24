module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      files: [
        '.eslintrc',
        'spec/.eslintrc',
        'gruntfile.js',
        'lib/**/*.js',
        'spec/**/*.js'
      ],
      tasks: [
        'clear', 'eslint',
        'clear', 'test'
      ]
    },

    eslint: {
      target: [
        'Gruntfile.js',
        'lib/*.js',
        'spec/*.js'
      ]
    },

    jasmine_nodejs: {
      options: {
        specNameSuffix: "spec.js",
        helperNameSuffix: "helper.js",
        useHelpers: true,
        stopOnFailure: true,
        reporters: {
          console: {
            colors: true,
            cleanStack: 1,
            verbosity: 4,
            listStyle: "indent",
            activity: false
          }
        }
      },
      your_target: {
        specs: [
          "spec/**/*.js"
        ],
        helpers: [
          "spec/helpers/**"
        ]
      }
    }
  });

  grunt.registerTask('test', ['jasmine_nodejs']);
  grunt.registerTask('default', ['watch']);

};
