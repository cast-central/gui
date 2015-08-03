'use-strict';

(function(){
    angular
        .module('cast-central-web.casts')
        .controller('CastsController', CastsController);

    CastsController.$inject = ['CastsFactory', '$log', '$interval', '$routeParams'];

    function CastsController(CastsFactory, $log, $interval, $routeParams){
        var self = this;

        // Get cast parameters
        self.type = $routeParams.type || 'chromecast';

        /*$interval(function(){
            CastFactory.list("", {}, function(data, error){
                $log.debug(data);
            });
        }, 10000);*/
    }
})();
