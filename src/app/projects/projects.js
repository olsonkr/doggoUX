angular.module('doggoUX')
    .config(ProjectsConfig)
    .controller('ProjectsCtrl', ProjectsController)
;

function ProjectsConfig($stateProvider) {
    $stateProvider
        .state('projects', {
            parent: 'base',
            url: '/projects',
            templateUrl: 'projects/templates/projects.tpl.html',
            controller: 'ProjectsCtrl',
            controllerAs: 'projects',
            resolve: {
                Projects: function($firebaseArray, FireBaseDataService) {
                    return $firebaseArray(FireBaseDataService.Projects)
                }
            }
        })
    ;
}

function ProjectsController(Projects) {
    var vm = this;
    vm.projects = Projects;

    vm.tab = 'all';
    vm.selectTab = function(tab) {
        vm.tab = tab;
    };
}