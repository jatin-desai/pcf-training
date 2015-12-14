module.exports = function (grunt, options) {
  return {
    options: {
      curly: false,
      eqeqeq: true,
      immed: true,
      latedef: true,
      newcap: true,
      noarg: true,
      sub: true,
      undef: true,
      eqnull: true,
      browser: true,
      expr: true,
      globals: {
        head: false,
        module: false,
        console: false,
        unescape: false,
        define: false,
        exports: false
      }
    },
    files: ['Gruntfile.js', 'build/Gruntfile.js', 'build/js/reveal.js']
  };
};
