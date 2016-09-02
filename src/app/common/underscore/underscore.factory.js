angular.module('doggoUX')
	.factory('Underscore', UnderscoreFactory)
;

function UnderscoreFactory($window) {
	return $window._;
}