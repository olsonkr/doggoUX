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
            controllerAs: 'projects'
        })
    ;
}

function ProjectsController() {
    var vm = this;
}