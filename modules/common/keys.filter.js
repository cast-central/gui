// NUMKEYS
// -------

// Exposes the window.Object.keys function.

(function(){
	'use-strict';

	angular.module('cast-central-web.common')
		.filter('keys', keys);

	keys.$inject = [];

	function keys(){
		return(function(object){
			if(!angular.isObject(object)){
				throw Error("Usage of non-object with numkeys filter!");
			}else{
				return(Object.keys(object));
			}
		});
	}
})();
