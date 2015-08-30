'use-strict';

(function(){
    angular
        .module('cast-central-web.common')
        .directive('mainFooter', render);

    function render(){
        // Definition of directive
        var directiveDefinitionObject = {
            restrict: 'E',
            templateUrl: 'main-footer.html'
        };

        return directiveDefinitionObject;
    }
})();
