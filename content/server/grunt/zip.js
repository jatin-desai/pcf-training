module.exports = function (grunt, options) {
  return {
    'reveal-js-presentation.zip': [
      'build/index.html',
      'build/css/**',
      'build/js/**',
      'build/lib/**',
      'build/images/**',
      'build/plugin/**'
    ]
  }; 
};
