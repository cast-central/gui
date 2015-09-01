// CASTS CONTROLLER
// ----------------

// Controls and monitors all the casting 
// devices.  Helps be the 'middle man' 
// between the discoverer and the directives.
// Has the ability to send signals to each 
// individual casting device.

(function(){
	'use-strict';

	angular
		.module('cast-central-web.casts')
		.controller('CastsController', CastsController);

	CastsController.$inject = ['$scope', '$log', 'DiscoveryFactory'];

	function CastsController($scope, $log, DiscoveryFactory){
		$scope.casts = DiscoveryFactory.cache;
	}
})();
