'use-strict';

(function(){
    angular
        .module('cast-central-web')
        .directive('mainHeader', renderMainNav);

    function renderMainNav(){
        // Definition of directive
        var directiveDefinitionObject = {
            restrict: 'E',
            templateUrl: 'components/directives/main-header.html'
        };

        return directiveDefinitionObject;
    }
})();
