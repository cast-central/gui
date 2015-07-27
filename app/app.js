'use-strict';

(function(){
    angular
        .module('cast-central-web', [
            'ngRoute'
        ])
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

    function config($routeProvider, $locationProvider, $httpProvider, $compileProvider){
        $locationProvider.html5Mode(false);

        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });

        $httpProvider.interceptors.push('authInterceptor');
    }

    angular
        .module('cast-central-web')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

    function authInterceptor($rootScope, $q, LocalStorage, $location){
        return({
            // intercept every request
            request: function(config) {
                config.headers = config.headers || {};
                return config;
            },

            // Catch 404 errors
            responseError: function(response){
                if (response.status === 404){
                    $location.path('/');
                    return $q.reject(response);
                }else{
                    return $q.reject(response);
                }
            }
        });
    }

    angular
        .module('cast-central-web')
        .run(run);

    run.$inject = ['$rootScope', '$location'];

    function run($rootScope, $location){
        // put here everything that you need to run on page load
    }
})();
