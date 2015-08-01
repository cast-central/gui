'use-strict';

(function(){
    angular
        .module('cast-central-web', [
            'ngRoute',
            'cast-central-web.common',
            'cast-central-web.casts'
        ])
        .config(config);

    config.$inject = ['$locationProvider', '$routeProvider'];

    function config($locationProvider, $routeProvider){
        $locationProvider.html5Mode(false);

        $routeProvider
            .when('/howto', {
                templateUrl: 'modules/howto/index.html'
            })
            .when('/casts/:castsType', {
                templateUrl: 'modules/casts/casts.html',
                controller: 'CastsController',
                controllerAs: 'casts'
            })
            .otherwise({
                redirectTo: '/howto'
            });
    }
})();
