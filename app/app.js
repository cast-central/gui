'use-strict';

(function(){
    angular
        .module('cast-central-web', [
            'ngRoute'
        ])
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider){
        $locationProvider.html5Mode(false);

        $routeProvider
            .when('/howto', {
                templateUrl: 'components/howto/index.html'
            })
            .when('/casts/:castsType', {
                templateUrl: 'components/common/casts.html',
                controller: 'CastsController',
                controllerAs: 'casts'
            })
            .otherwise({
                redirectTo: '/howto'
            });
    }
})();
