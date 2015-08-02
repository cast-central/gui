'use-strict';

(function(){
    angular
        .module('cast-central-web.common')
        .directive('mainHeader', renderMainNav);

    function renderMainNav(){
        // Definition of directive
        var directiveDefinitionObject = {
            restrict: 'E',
            templateUrl: 'main-header.html'
        };

        return directiveDefinitionObject;
    }
})();
