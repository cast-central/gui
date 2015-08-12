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
		$scope.casts = DiscoveryFactory.cache;
	}
})();
