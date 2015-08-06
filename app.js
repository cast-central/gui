(function(){
    'use-strict';

    angular
        .module('cast-central-web', [
            'ngRoute',
            'cast-central-web.casts'
        ])
        .config(config);

    config.$inject = ['$locationProvider', '$routeProvider'];

    function config($locationProvider, $routeProvider){
        $locationProvider.html5Mode(false);

        $routeProvider
            .when('/casts', {
                templateUrl: 'casts.html',
                controller: 'CastsController',
                controllerAs: 'casts'
            })
            .otherwise({
                redirectTo: '/casts'
            });
    }
})();
