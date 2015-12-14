module.exports = function (grunt, options) {
  return {
    options: {
      livereload: true
    },
    main: {
      files: ['Gruntfile.js', 'revealjs/Gruntfile.js', 'revealjs/js/reveal.js', 'revealjs/css/reveal.css', 'revealjs/css/print/pdf.css', 'revealjs/css/theme/pivotal.css'],
      tasks: 'default'
    },
    theme: {
      files: ['revealjs/css/theme/source/*.scss', 'revealjs/css/theme/template/*.scss'],
      tasks: 'themes'
    },
    html: {
      files: ['revealjs/index.html'],
      tasks: 'default'
    },
    content: {
      files: ['courses/**/*'],
      tasks: 'default'
    },
    content2: {
      files: ['courses_hidden/**/*'],
      tasks: 'default'
    },
  };
};
