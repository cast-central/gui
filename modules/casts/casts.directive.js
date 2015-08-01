'use-strict';

(function(){
    angular
        .module('cast-central-web.casts')
        .directive('casts', renderCasts);

    function renderCasts(){
        // Definition of directive
        var directiveDefinitionObject = {
            restrict: 'E',
            templateUrl: 'components/common/casts.html'
        };

        return directiveDefinitionObject;
    }
})();
