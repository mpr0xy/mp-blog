module.exports = function(grunt) {

grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
});


grunt.registerTask('default', 'some test', function(){
  var pkg = grunt.file.readJSON('package.json')
  grunt.log.write(pkg).ok();
  console.log(pkg);
}); 

}