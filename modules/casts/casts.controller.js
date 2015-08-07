// CASTS CONTROLLER
// ----------------

// 

(function(){
	'use-strict';

	angular
		.module('cast-central-web.casts')
		.controller('CastsController', CastsController);

	CastsController.$inject = ['$scope', '$log', 'DiscoveryFactory'];

	function CastsController($scope, $log, DiscoveryFactory){
		// Set subscription to updates of the cache
		DiscoveryFactory.add_subscription('CastsController', function(cache){
			$log.debug('CastsController - cache updated with:', cache);
			$scope.casts = cache;
		});
	}
})();
