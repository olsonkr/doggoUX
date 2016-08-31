angular.module('orderCloud')
    .config(LoginConfig)
    .factory('LoginService', LoginService)
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

function LoginService($firebaseAuth) {
    var firebaseAuthObject = $firebaseAuth();
    var service = {
        FireBaseAuthObject: firebaseAuthObject,
        Login: _login,
        Logout: _logout,
        IsAuthenticated: _isAuthenticated
    };

    function _register() {
        return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
    }

    function _login() {
        return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
    }

    function _logout() {
        firebaseAuthObject.$signOut();
    }

    function _isAuthenticated() {
        return firebaseAuthObject.$getAuth();
    }

    return service;
}

function LoginController() {
    var vm = this;
}