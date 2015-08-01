'use-strict';

(function(){
    angular
        .module('cast-central-web.casts')
        .controller('CastsController', CastsController);

    CastsController.$inject = ['CastsFactory', '$log', '$interval'];

    function CastsController(CastsFactory, $log, $interval){
        var self = this;

        /*$interval(function(){
            CastFactory.list("", {}, function(data, error){
                $log.debug(data);
            });
        }, 10000);*/
    }
})();
