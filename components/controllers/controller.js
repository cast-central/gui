/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 */
'use-strict';

(function(){
    angular
        .module('cast-central-web')
        .controller('MainController', MainController);

    MainController.$inject = ['CastService', '$log', '$interval'];

    function MainController(CastService, $log, $interval){
        var self = this;

        $interval(function(){
            CastService.list("", {}, function(data, error){
                $log.debug(data);
            });
        }, 10000);

        /**
         * Load some data
         * @return {Object} Returned object
         */
        // QueryService.query('GET', 'posts', {}, {})
        //   .then(function(ovocie) {
        //     self.ovocie = ovocie.data;
        //   });
    }
})();
