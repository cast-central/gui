// CASTS CONTROLLER
// ----------------

// 

(function(){
	'use-strict';

	angular
		.module('cast-central-web.casts')
		.controller('CastsCrontroller', CastsController);

	CastsController.$inject = ['$log', 'CastCentralServiceFactory', 'DiscoveryFactory'];

	function CastsController($log, CastCentralServiceFactory, DiscoveryFactory){
		var self = this;
		self.cache = DiscoveryFactory.cache();
	}
})();
