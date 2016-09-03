angular.module('doggoUX')
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

    vm.loginWithGoogle = function() {
        vm.showEmailForm = false;
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        googleProvider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(googleProvider)
            .then(function(result) {
                if (result.user.email.indexOf('@four51.com') > -1) {
                    $state.go('home');
                } else {
                    AuthService.FireBaseAuthObject.$deleteUser()
                        .then(function() {
                            toastr.error('Google account must be a valid Four51 account', 'Error');
                        });
                }
            })
            .catch(function(ex) {
                toastr.error(ex.message, 'Error');
            });
    };

    /*vm.loginWithGitHub = function() {
        vm.showEmailForm = false;
        var gitHubProvider = new firebase.auth.GithubAuthProvider();
        gitHubProvider.addScope('user:email');
        firebase.auth().signInWithPopup(gitHubProvider)
            .then(function(result) {
                if (result.user && result.user.providerData[0].email.indexOf('@four51.com') > -1) {
                    $state.go('home');
                }
                else {
                    AuthService.FireBaseAuthObject.$deleteUser()
                        .then(function() {
                            toastr.error('Google Account must be a valid Four51 account', 'Error');
                        });
                }
            })
            .catch(function(ex) {
                toastr.error(ex.message, 'Error');
            });
    };*/

    vm.showEmailForm = false;
    vm.loginWithEmail = function() {
        vm.showEmailForm = !vm.showEmailForm;
    };

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