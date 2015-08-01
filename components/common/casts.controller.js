'use-strict';

(function(){
    angular
        .module('cast-central-web')
        .controller('CastController', CastsController);

    CastsController.$inject = ['CastFactory', '$log', '$interval'];

    function CastsController(CastFactory, $log, $interval){
        var self = this;

        /*$interval(function(){
            CastFactory.list("", {}, function(data, error){
                $log.debug(data);
            });
        }, 10000);*/
    }
})();
