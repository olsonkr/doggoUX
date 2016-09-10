angular.module('doggoUX')
    .config(ProjectsConfig)
    .controller('ProjectsCtrl', ProjectsController)
    .controller('ProjectsCreateModalCtrl', ProjectsCreateModalController)
    .controller('ProjectsDetailCtrl', ProjectsDetailController)
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
                },
                Users: function($firebaseObject, FireBaseDataService) {
                    return $firebaseObject(FireBaseDataService.Users);
                }
            }
        })
        .state('projects.detail', {
            url: '/detail/:id',
            templateUrl: 'projects/templates/projects.detail.tpl.html',
            controller: 'ProjectsDetailCtrl',
            controllerAs: 'projectsDetail',
            resolve: {
                Project: function($q, $stateParams, Projects) {
                    var deferred = $q.defer();

                    Projects.$loaded().then(function(Projects) {
                        deferred.resolve(Projects.$getRecord($stateParams.id));
                    });

                    return deferred.promise;
                }
            }
        })
    ;
}

function ProjectsController($state, $uibModal, Projects, Users, CurrentUser) {
    var vm = this;
    vm.projects = Projects;
    vm.users = Users;
    vm.currentUser = CurrentUser;

    vm.tab = 'all';
    vm.selectTab = function(tab) {
        vm.tab = tab;
    };

    vm.createNew = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'projects/templates/projects.create.modal.tpl.html',
            controller: 'ProjectsCreateModalCtrl',
            controllerAs: 'projectsCreateModal',
            resolve: {
                Projects: function() {
                    return vm.projects;
                },
                CurrentUser: function() {
                    return CurrentUser;
                }
            }
        });

        modalInstance.result.then(function(id) {
            $state.go('projects.detail', {id: id});
        });
    };
}

function ProjectsCreateModalController($uibModalInstance, Projects, CurrentUser) {
    var vm = this;
    vm.project = {
        Name: null,
        Private: false,
        CreatedBy: CurrentUser.uid,
        DateCreated: new Date().toJSON(),
        DateLastUpdated: new Date().toJSON()
    };

    vm.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    vm.create = function() {
        Projects.$add(vm.project)
            .then(function(ref) {
                $uibModalInstance.close(ref.key);
            });
    };
}

function ProjectsDetailController(Project, Projects) {
    var vm = this;
    vm.project = Project;
    vm.projects = Projects;

    vm.save = function() {
        Projects.$save(vm.project)
            .then(function() {
                $state.go('projects');
            });
    };
}