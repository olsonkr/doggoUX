angular.module('orderCloud')
    .directive('oouxLogo', oouxLogo)
;

function oouxLogo() {
    return {
        templateUrl: 'common/ooux-logo/templates/oouxLogo.tpl.html',
        replace:true,
        link: function(scope, element, attrs) {
            scope.OOUXLogo = {
                'maxHeight':attrs.height,
                'width': attrs.width
            };
        }
    };
}