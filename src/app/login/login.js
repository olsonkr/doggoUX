angular.module('orderCloud')
    .config(LoginConfig)
    .factory('AuthService', AuthService)
    .controller('LoginCtrl', LoginController)
;

function LoginConfig($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login/templates/login.tpl.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
    ;
}

function AuthService($firebaseAuth) {
    var firebaseAuthObject = $firebaseAuth();
    var service = {
        FireBaseAuthObject: firebaseAuthObject,
        Login: _login,
        Logout: _logout,
        Register: _register,
        IsAuthenticated: _isAuthenticated
    };

    function _login(credentials) {
        return firebaseAuthObject.$signInWithEmailAndPassword(credentials.Email, credentials.Password);
    }

    function _logout() {
        firebaseAuthObject.$signOut();
    }

    function _register(credentials) {
        return firebaseAuthObject.$createUserWithEmailAndPassword(credentials.Email, credentials.Password);
    }

    function _isAuthenticated() {
        return firebaseAuthObject.$getAuth();
    }

    return service;
}

function LoginController($state, toastr, AuthService) {
    var vm = this;
    vm.credentials = {
        Email: null,
        Password: null
    };

    vm.submit = function() {
        AuthService.Login(vm.credentials)
            .then(function() {
                $state.go('home');
            })
            .catch(function(ex) {
                vm.credentials = {
                    Email: null,
                    Password: null
                };
                toastr.error(ex.message, 'Error');
            })
        ;
    };
}