angular.module('doggoUX')
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
                            $state.go('projects');
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