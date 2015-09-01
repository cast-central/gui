// COMMON CONTROLLER
// -----------------

// Contains common / Global 
// variables that are dynamically 
// udpated.

(function(){
	'use-strict';

	angular
		.module('cast-central-web.common')
		.controller('CommonController', CommonController);

	CommonController.$inject = ['$scope', 'CommonFactory'];

	function CommonController($scope, CommonFactory){
		$scope.timestamp = CommonFactory.timestamp;
		$scope.connected = CommonFactory.connected;
	}
})();
