angular.module('orderCloud')
    .config(RegisterConfig)
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

function RegisterController($state, toastr, AuthService) {
    var vm = this;
    vm.credentials = {
        Email: null,
        Password: null,
        ConfirmPassword: null
    };

    vm.showIcons = true;

    vm.registerWithGoogle = function() {
        vm.showIcons = false;
        vm.emailForm = false;
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        googleProvider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(googleProvider)
            .then(function(result) {
                if (result.user.email.indexOf('@four51.com') > -1) {
                    $state.go('home');
                } else {
                    AuthService.FireBaseAuthObject.$deleteUser()
                        .then(function() {
                            toastr.error('Google Account must be a valid Four51 account', 'Error');
                        });
                }
            })
            .catch(function(ex) {
                toastr.error(ex.message, 'Error');
            });
    };

    vm.showEmailForm = false;
    vm.registerWithEmail = function() {
        vm.showIcons = false;
        vm.showEmailForm = true;
    };

    vm.cancel = function() {
        vm.showIcons = true;
        vm.showEmailForm = false;
    };

    vm.submit = function() {
        if (vm.credentials.Email.indexOf('@four51.com') == -1) {
            vm.credentials = {
                Email: null,
                Password: null,
                ConfirmPassword: null
            };
            toastr.error('Email must be a valid Four51 email address', 'Error')
        } else {
            AuthService.Register(vm.credentials)
                .then(function() {
                    AuthService.Login(vm.credentials)
                        .then(function() {
                            $state.go('home');
                        });
                })
                .catch(function(ex) {
                    vm.credentials = {
                        Email: null,
                        Password: null,
                        ConfirmPassword: null
                    };
                    toastr.error(ex.message, 'Error');
                });
        }
    };
}