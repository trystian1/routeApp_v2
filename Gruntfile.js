module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		   uglify: {
		    my_target: {
		      files: {
		        'js/build/output.min.js': 'js/app/*.js'
		      }
		    }
		  },



 		   sass: {                              
   			 dist: {                            
    		  options: {                       
        		style: 'compressed'
      		},
     		 files: {                         
         		'css/build/main.css': 'css/scss/main.scss'     
        
     			 }
   			 	}
  			}


	

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['uglify', 'sass']);

};