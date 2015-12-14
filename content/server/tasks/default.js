module.exports = function(grunt) {
  grunt.registerTask("build", ["check", "copy:revealjs", "copy:content", "copy:assets"]);

  // Makefile tasks in grunt
  grunt.registerTask("goget",                   ["config:dev", "exec:goget"]);
  grunt.registerTask("unit",                    ["config:dev", "exec:forceclean", "exec:unit"]);
  grunt.registerTask("cover",                   ["config:dev", "exec:forceclean", "exec:cover"]);
  grunt.registerTask("forceclean",              ["config:dev", "exec:forceclean"]);
  grunt.registerTask("yamlrunner",              ["config:dev", "exec:forceclean", "exec:yamlrunner"]);
  grunt.registerTask("generatecontent",         ["config:dev", "yamlrunner", "exec:generatecontent"]);
  grunt.registerTask("movietest",               ["config:dev", "exec:movietest"]);
  grunt.registerTask("buildpushassets",         ["config:dev", "yamlrunner", "exec:buildpushassets"]);
  grunt.registerTask("buildassets",             ["config:dev", "yamlrunner", "exec:buildassets"]);
  grunt.registerTask("buildpushassetsdelta",    ["config:dev", "yamlrunner", "exec:buildpushassetsdelta"]);
  grunt.registerTask("pushassetsdelta",         ["config:dev", "yamlrunner", "exec:pushassetsdelta"]);
  grunt.registerTask("pushassets",              ["config:dev", "yamlrunner", "exec:pushassets"]);
  grunt.registerTask("validasset",              ["config:dev", "exec:validasset"]);

  // Default task
  grunt.registerTask("default", ["build"]);

  // Theme task
  grunt.registerTask("themes", ["build", "sass"]);

  // Package presentation to archive
  grunt.registerTask("package", ["default", "zip"]);

  // Serve presentation locally
  grunt.registerTask("serve", ["build", "connect", "watch"]);
  grunt.registerTask("serve_all_decks",[]);
  grunt.registerTask("web_decks", []);
  grunt.registerTask("offline_bundle_decks", []);

  // Run tests
  grunt.registerTask("test", ["build", "jshint", "qunit"]);
};
