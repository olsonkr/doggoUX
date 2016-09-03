angular.module('doggoUX')
    .factory('FireBaseDataService', FireBaseDataService)
;

function FireBaseDataService() {
    var root = firebase.database().ref();

    var service = {
        Root: root,
        Users: root.child('Users'),
        Projects: root.child('Projects')
    };

    return service;
}