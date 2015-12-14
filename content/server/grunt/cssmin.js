module.exports = function (grunt, options) {
  return {
    compress: {
      files: {
        'build/css/reveal.min.css': ['build/css/reveal.css']
      }
    }
  };
};
