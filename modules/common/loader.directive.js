(function() {
    'use strict';

    angular
        .module('cast-central-web.common')
        .directive('loader', RenderLoader);

    function RenderLoader() {

        // Definition of directive
        var directiveDefinitionObject = {
            restrict: 'E',
            templateUrl: 'loader.html',
            compile: function(tElem, attrs){
                return function(scope, elem, attrs){
                    scope.text = attrs.text;
                }
            }
        };

        return(directiveDefinitionObject);
    }
})();
