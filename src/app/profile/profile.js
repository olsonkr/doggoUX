angular.module('doggoUX')
    .config(ProfileConfig)
    .factory('ProfileService', ProfileService)
    .controller('ProfileCtrl', ProfileController)
;

function ProfileConfig($stateProvider) {
    $stateProvider
        .state('profile', {
            parent: 'base',
            url: '/profile',
            templateUrl: 'profile/templates/profile.tpl.html',
            controller: 'ProfileCtrl',
            controllerAs: 'profile',
            resolve: {
                Profile: function($firebaseObject, FireBaseDataService, CurrentUser) {
                    return $firebaseObject(FireBaseDataService.Users.child(CurrentUser.uid))
                }
            }
        })
    ;
}

function ProfileService() {
    var service = {
        Save: _save
    };

    function _save(profile, profileCopy, currentUser) {
        profile.Email = currentUser.email;
        profile.Name = profileCopy ? profileCopy.Name : profile.Name;
        profile.$save(profile);
    }

    return service;
}

function ProfileController(ProfileService, Profile, CurrentUser) {
    var vm = this;
    vm.profile = Profile;
    vm.profilePicColors = [
        '#c1ebf8', //blue,
        '#c1f8ce', //green
        '#f8cec1', //orange
        '#f8c1d0', //red
        '#f8c1eb' //purple
    ];

    vm.editingName = false;
    vm.editName = function() {
        vm.profileCopy = angular.copy(Profile);
        vm.editingName = true;
    };

    vm.selectProfilePic = function(pic) {
        vm.profile.ProfilePic = pic;
        vm.save();
    };

    vm.selectProfilePicColor = function(color) {
        vm.profile.ProfilePicColor = color;
        vm.save();
    };

    vm.save = function() {
        ProfileService.Save(vm.profile, vm.profileCopy, CurrentUser);
        vm.editingName = false;
    };
}