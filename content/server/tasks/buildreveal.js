module.exports = function(grunt) {

  grunt.registerTask("buildreveal", "build all decks in reveal.js", function() {
    grunt.option("buildpath", "public");
    grunt.task.run(["copy:revealjs", "copy:markdownassets", "copy:markdown", "copy:templates", "copy:html"]);   
  });
};
