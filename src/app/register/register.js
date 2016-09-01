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
                    toastr(ex.message, 'Error');
                });
        }
    };
}