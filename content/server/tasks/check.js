var path = require('path');

module.exports = function(grunt) {
  var content = grunt.option('content');

  grunt.registerTask('check', 'Copy content to build directory.', function() {
    if (!content || content.length === 0) {
      grunt.fail.fatal('Specify the content file using the --content=path/to/file argument.');
    }

    if (!grunt.file.exists(content)) {
      grunt.fail.fatal('Content [' + content + '] does not exist.');
    }

    grunt.option('content-dir', path.dirname(grunt.option('content')));
  });
};
