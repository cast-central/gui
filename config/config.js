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

					// Modules/Common
					'modules/common/module.js',
					'modules/common/main.header.directive.js',
					'modules/common/main.footer.directive.js',
					'modules/common/loader.directive.js',
					'modules/common/keys.filter.js',

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
				paths: [
		           'resources/sass/breakpoints',
		           'resources/sass/modules',
		           'resources/sass/partials'
				],
				target: 'style.compiled.css'
			},
			css: {
				paths: [
					target+'style.compiled.css'
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
			}
		} // Dependencies
	});
};
