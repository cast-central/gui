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
                templateUrl: 'howto.html'
            })
            .when('/casts/:castsType', {
                templateUrl: 'casts.html',
                controller: 'CastsController',
                controllerAs: 'casts'
            })
            .otherwise({
                redirectTo: '/howto'
            });
    }
})();
