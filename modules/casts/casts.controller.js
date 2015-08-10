// CASTS CONTROLLER
// ----------------

// 

(function(){
	'use-strict';

	angular
		.module('cast-central-web.casts')
		.controller('CastsController', CastsController);

	CastsController.$inject = ['$rootScope', '$scope', '$log', 'DiscoveryFactory'];

	function CastsController($rootScope, $scope, $log, DiscoveryFactory){
		// Subscribe to 'discovery' event to update casts view
		$rootScope.$on('discovery', function(event, cache){
			$log.debug('CastsController - cache updated with:', cache);
			$scope.casts = cache;
		});
	}
})();
