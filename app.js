(function(){
    'use-strict';

    angular
        .module('cast-central-web', [
            'ngRoute',
            'cast-central-web.common'
        ])
        .config(config);

    config.$inject = ['$locationProvider', '$routeProvider'];

    function config($locationProvider, $routeProvider){
        $locationProvider.html5Mode(false);

        $routeProvider
            .when('/howto', {
                templateUrl: 'howto.html'
            })
            .otherwise({
                redirectTo: '/howto'
            });
    }
})();
