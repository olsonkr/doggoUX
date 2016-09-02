angular.module('doggoUX')
	.config(LocalForage)
;

function LocalForage($localForageProvider) {
	$localForageProvider.config({
		version: 1.0,
		name: 'OrderCloud',
		storeName: 'four51',
		description: 'Four51 OrderCloud Local Storage'
	});
}