(function(){
    'use-strict';

    angular
        .module('cast-central-web', [
            'ngRoute',
            'cast-central-web.common',
            'cast-central-web.casts'
        ])
        .config(config)
        .constant('CONSTANTS', {
            'DEV': true,
            'API_URL': 'http://localhost:8000/v1',
            'POLLING_INTERVAL': 20 // Seconds
        });

    config.$inject = ['$locationProvider', '$routeProvider'];

    function config($locationProvider, $routeProvider, CastsController){
        $locationProvider.html5Mode(false);

        $routeProvider
            .when('/casts', {
                templateUrl: 'casts.html',
                controller: 'CastsController',
                controllerAs: 'castsCtrl'
            })
            .otherwise({
                redirectTo: '/casts'
            });
    }
})();
