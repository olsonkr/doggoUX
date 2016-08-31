angular.module('orderCloud')
    .config(RegisterConfig)
    .factory('RegisterService', RegisterService)
    .controller('RegisterCtrl', RegisterController)
;



function RegisterConfig($stateProvider) {
    $stateProvider
        .state('register', {
            url: '/register',
            templateUrl: 'register/templates/register.tpl.html',
            controller: 'RegisterCtrl',
            controllerAs: 'register'
        })
}

function RegisterService(LoginService) {
    var service = {
        Register: _register
    };

    function _register(user) {
        return LoginService.FireBaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
    }

    return service;
}

function RegisterController() {
    var vm = this;
}