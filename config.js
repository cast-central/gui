'use-strict';

(function(){
  angular
  	.module('cast-central-web')
    .constant('CONSTANTS', {
    	'DEV': true,
    	'API_URL': 'http://localhost:8000/v1',
    	'POLLING_INTERVAL': 10 // Seconds
    });
})();
