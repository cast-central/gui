'use-strict';

(function(){
    angular
        .module('cast-central-web')
        .directive('casts', renderCasts);

    function renderCasts(){
        // Definition of directive
        var directiveDefinitionObject = {
            restrict: 'E',
            templateUrl: 'components/directives/casts.html'
        };

        return directiveDefinitionObject;
    }
})();
