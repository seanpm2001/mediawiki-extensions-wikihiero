/* eslint-env node */
module.exports = function ( grunt ) {
	var conf = grunt.file.readJSON( 'extension.json' );

	grunt.loadNpmTasks( 'grunt-banana-checker' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-eslint' );
	grunt.loadNpmTasks( 'grunt-jsonlint' );
	grunt.loadNpmTasks( 'grunt-stylelint' );

	grunt.initConfig( {
		eslint: {
			options: {
				cache: true
			},
			all: [
				'*.js',
				'modules/*.js',
				'modules/ve-wikihiero/**/*.js'
			]
		},
		stylelint: {
			all: 'modules/**/*.css'
		},
		watch: {
			files: [
				'.eslintrc.json',
				'.stylelintrc.json',
				'<%= eslint.all %>',
				'<%= stylelint.all %>'
			],
			tasks: 'lint'
		},
		banana: conf.MessagesDirs,
		jsonlint: {
			all: [
				'**/*.json',
				'!node_modules/**',
				'!vendor/**'
			]
		}
	} );

	grunt.registerTask( 'lint', [ 'eslint', 'stylelint', 'jsonlint', 'banana' ] );
	grunt.registerTask( 'test', 'lint' );
	grunt.registerTask( 'default', 'test' );
};
