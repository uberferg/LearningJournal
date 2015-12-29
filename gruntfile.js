module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'graphics_site',
                    src: ['components/sass/*.scss'],
                    dest: './graphics_site/css',
                    ext: '.css',
                    flatten: true
                }]
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Default tasks
    grunt.registerTask('default', ['sass']);

};
