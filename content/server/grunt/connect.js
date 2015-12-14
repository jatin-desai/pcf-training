module.exports = function (grunt, options) {
  return {
    server: {
      options: {
        port: grunt.option('port') || 8000,
        base: './build',
        livereload: true,
        open: true
      }
    }
  };
};
