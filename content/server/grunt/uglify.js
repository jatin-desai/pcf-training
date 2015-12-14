module.exports = function (grunt, options) {
  return {
    options: {
      banner: '<%= meta.banner %>\n'
    },
    build: {
      src: 'build/js/reveal.js',
      dest: 'build/js/reveal.min.js'
    }
  };
};
