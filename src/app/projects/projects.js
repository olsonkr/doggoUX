angular.module('doggoUX')
    .config(ProjectsConfig)
    .controller('ProjectsCtrl', ProjectsController)
    .controller('ProjectCreateModalCtrl', ProjectCreateModalController)
    .controller('ProjectDetailCtrl', ProjectDetailController)
    .filter('projectfilter', projectfilter)
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
            controller: 'ProjectDetailCtrl',
            controllerAs: 'projectDetail',
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

    vm.tab = 'shared';
    vm.selectTab = function(tab) {
        vm.tab = tab;
    };

    vm.sortOption = 'DateLastModified';
    vm.sortReverse = false;

    vm.selectSortOption = function(option) {
        if (vm.sortOption == option) {
            vm.sortReverse = !vm.sortReverse;
        }
        else {
            vm.sortOption = option;
            vm.sortReverse = true;
        }
    };

    vm.createNew = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'projects/templates/projects.create.modal.tpl.html',
            controller: 'ProjectCreateModalCtrl',
            controllerAs: 'projectCreateModal',
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

function ProjectCreateModalController($uibModalInstance, Projects, CurrentUser) {
    var vm = this;
    vm.project = {
        Name: null,
        Private: false,
        CreatedBy: CurrentUser.uid,
        DateCreated: new Date().toJSON(),
        LastModifiedBy: CurrentUser.uid,
        DateLastModified: new Date().toJSON()
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

function ProjectDetailController(Project, Projects) {
    var vm = this;
    vm.project = Project;

    vm.project.AnalyzedGoal = [];
    vm.project.GoalAnalyzed = false;
    vm.analyzeGoal = function() {
        if (!vm.project.Goal) return;

        vm.project.GoalAnalyzed = false;
        vm.project.AnalyzedGoal = [];
        var words = vm.project.Goal.split(' ');
        angular.forEach(words, function(word) {
            vm.project.AnalyzedGoal.push({Word: word, Selected: false});
        });
        vm.project.GoalAnalyzed = true;
    };

    vm.editGoal = function() {
        vm.project.AnalyzedGoal = [];
        vm.project.GoalAnalyzed = false;
    };

    vm.save = function() {
        Projects.$save(vm.project)
            .then(function() {
                $state.go('projects');
            });
    };
}

function projectfilter() {
    return function(projects, tab, currentUser) {
        var result = [];

        angular.forEach(projects, function(project) {
            if (tab == 'yours' && project.CreatedBy == currentUser.Details.$id) {
                result.push(project);
            }
            else if (tab == 'shared' && !project.Private) {
                result.push(project);
            }
        });

        return result;
    }
}