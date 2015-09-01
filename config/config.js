// All locations are prefixed by the 
// 'prefix' path given to the 'cast-central-web' 
// executable.

// Variables that will be available in the config 
// scope:
//   target: Directory where target (built) code goes
//   dev: boolean if in development mode

module.exports = function config(target, dev){
	return({
		// Dependant Javascript, SASS, HTML, and Images 
		// will get loaded optimized (if set) and moved 
		// into the defined 'target' directory.
		dependencies: {
			// ORDER IS IMPORTANT
			javascript: {
				paths: [
					// Bower Components
					'bower_components/angular/angular.'+(dev? '': 'min.')+'js',
					'bower_components/angular-route/angular-route.'+(dev? '': 'min.')+'js',
					'bower_components/angular-bootstrap/ui-bootstrap.'+(dev? '': 'min.')+'js',
					'bower_components/async/dist/async.'+(dev? '': 'min.')+'js',

					// Modules/Common
					'modules/common/module.js',
					'modules/common/common.factory.js',
					'modules/common/main.header.directive.js',
					'modules/common/main.footer.directive.js',
					'modules/common/loader.directive.js',
					'modules/common/keys.filter.js',
					'modules/common/common.controller.js',

					// Modules/Casts
					'modules/casts/module.js',
					'modules/casts/cast.directive.js',
					'modules/casts/cast-central-service.factory.js',
					'modules/casts/discovery.factory.js',
					'modules/casts/casts.controller.js',

					// Top level
					'config/app.js'
				],
				compress: dev,
				target: 'app.min.js'
			},
			sass: {
				main: 'resources/sass/style.scss',
				paths: [  ],
				target: 'sass.compiled.css'
			},
			css: {
				paths: [
					'bower_components/bootstrap/dist/css/bootstrap.css',
					'bower_components/bootstrap/dist/css/bootstrap-theme.css',
					target+'sass.compiled.css'
				],
				compress: dev,
				target: 'style.min.css'
			},
			html: {
				paths: [
					'config/*.html',
					'modules/**/*.html'
				],
				compress: dev,
				target: ''
			},
			images: {
				paths: [
					'resources/images/*'
				],
				target: ''
			},
			others: [
				{
					paths: [
						'bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff'
					],
					target: 'fonts/'
				}
			],
		}, // Dependencies

		// References files all of which are to be merged 
		// into one file.  Generally speaking the files 
		// to be merged come from the dependencies config.
		merges: [
			/*{
				paths: [  ],
				target: ''
			}*/
		]
	});
};
