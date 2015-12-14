/* global module:false */
module.exports = function(grunt) {
  var path = require('path'); 
  var md_src = process.env.MARKDOWN_SOURCE || "../presentations/**/*.md";
  var md_asset_src = process.env.MARKDOWN_ASSET_SOURCE || "../presentations/**/assets/*";
  grunt.option("md_src", md_src);
  grunt.option("md_asset_src", md_asset_src);
  grunt.option("buildpath", "build");
  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt, {
    pkg: grunt.file.readJSON('revealjs/package.json'),
    meta: {
      banner: '/*!\n' +
        ' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
        ' * http://lab.hakim.se/reveal-js\n' +
        ' * MIT licensed\n' +
        ' *\n' +
        ' * Copyright (C) 2014 Hakim El Hattab, http://hakim.se\n' +
        ' */'
    }
  });

  // Load Tasks
  grunt.loadTasks('tasks');
};
