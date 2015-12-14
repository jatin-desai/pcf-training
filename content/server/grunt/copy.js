module.exports = function (grunt, options) {
  return {
    revealjs: {
      cwd: 'revealjs',
      src: '**/*',
      dest: "<%= grunt.option('buildpath') %>",
      expand: true
    },
    content: {
      cwd: '.',
      src: "<%= grunt.option('content') %>",
      dest: 'build',
      expand: true,
      flatten: true,
      rename: function(dest, src) {
        return dest + '/' + 'content.md';
      }
    },
    assets: {
      cwd: '.',
      src: "<%= grunt.option('content-dir') + '/assets/**/*' %>",
      dest: 'build/assets/',
      expand: true,
      flatten: true
    },
    markdownassets: {
      cwd: '.',
      src: "<%= grunt.option('md_asset_src') %>",//'courses/**/assets/*',
      dest: "<%= grunt.option('buildpath') %>/assets",
      expand: true,
      flatten: true,
      rename: function(dest, src) {
        return dest + '/' + src;
      }
    },
    markdown: {
      cwd: '.',
      src: "<%= grunt.option('md_src') %>",//'courses/**/*.md',
      dest: "<%= grunt.option('buildpath') %>",
      expand: true,
      flatten: true,
      rename: function(dest, src) {
        return dest + '/' + src;
      }
    },
    templates: {
      cwd: '.',
      src: "templates/*.tmpl",
      dest: "<%= grunt.option('buildpath') %>",
      expand: true,
      flatten: true,
      rename: function(dest, src) {
        var path = require("path");
        var filename = path.basename(src, ".tmpl");
        return dest + "/" + filename + ".html";
      },
      options: {

        processContent: function (content, srcpath) {
          var fs = require('fs');
          var files = fs.readdirSync(grunt.option('buildpath'));
          markdownFiles = files.filter(function(file) { return file.substr(-3) === '.md'; });
          var obj = {markdownFiles: markdownFiles};
          return grunt.template.process(content, {data: obj});
        }
      }
    },
    html: {
      cwd: '.',
      src: 'templates/*.html',
      dest: "<%= grunt.option('buildpath') %>",
      expand: true,
      flatten: true,
      rename: function(dest, src) {
        return dest + '/' + src;
      }
    }
  };
};
