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

    MainController.$inject = ['LocalStorage', 'QueryService'];

    function MainController(LocalStorage, QueryService){
        var self = this;

        ////////////  function definitions

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
