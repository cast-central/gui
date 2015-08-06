(function() {
    'use strict';

    angular
        .module('cast-central-web.casts')
        .directive('cast', RenderCast);

    function RenderCast() {

        // Definition of directive
        var directiveDefinitionObject = {
            restrict: 'E',
            templateUrl: 'cast.html'
        };

        return(directiveDefinitionObject);
    }
})();
