//@author jakubvacek
'use strict'
var App = angular.module('App', ['ui.router', 'ngAnimate']);
;
App.config(function ($stateProvider) {
    //Activity
    $stateProvider.state('activities', {
        url: '/activities',
        template: '<activities loged-user="$resolve.logedUser"activities="$resolve.activities" selected-user="$resolve.selectedUser"></activities>',
        component: 'activities',
        //sending user in paramaetrs
        params: {
            selectedUser: null,
            logedUser: null
        },
        //using user from parameters to get list of acitivity
        resolve: {
            activities: function ($activityService, $stateParams) {
                return $activityService.getActivitiesOfUser($stateParams.selectedUser)
            },
            selectedUser: function ($stateParams) {
                return $stateParams.selectedUser;
            },
            logedUser: function ($stateParams) {
                return $stateParams.logedUser;
            }
        },
        controllerAs: '$resolve'
    }).state('activityDetail', {
        parent: 'activities',
        url: '/activityDetail',
        templateUrl: 'Template/Activity/activityDetail.html'
    });



    //Project shows project of user in params    
    $stateProvider.state('projects', {
        url: '/projects',
        template: '<projects projects="$resolve.projects" selected-user="$resolve.selectedUser" loged-user="$resolve.logedUser"></projects>',
        component: 'projects',
        params: {
            selectedUser: null,
            logedUser: null
        },
        resolve: {
            projects: function ($projectService, $stateParams) {
                return $projectService.getProjectsOfUser($stateParams.selectedUser)
            },
            selectedUser: function ($stateParams) {
                return $stateParams.selectedUser;
            }, logedUser: function ($stateParams) {
                return $stateParams.logedUser;
            }
        },
    }).state('createProject', {
        parent: 'projects',
        url: '/createProject',
        templateUrl: 'Template/Project/createProject.html'
    }).state('projectDetail', {
        parent: 'projects',
        url: '/projectDetail',
        templateUrl: 'Template/Project/projectDetail.html'
    });
    
    //Users, showing users of loged user
    $stateProvider.state('users', {
        url: '/users',
        template: '<users users="$resolve.users" loged-user="$resolve.logedUser"></users>',
        component: 'users',
        params: {
            logedUser: null
        },
        resolve: {
            users: function ($userService) {
                return $userService.getUsers();
            },
            logedUser: function ($stateParams) {
                return $stateParams.logedUser;
            }
        },
        controllerAs: '$resolve'
    }).state('createUser', {
        parent: 'users',
        url: '/createUser',
        templateUrl: 'Template/User/createUser.html'
    }).state('userDetail', {
        parent: 'users',
        url: '/userDetail',
        templateUrl: 'Template/User/userDetail.html'
    });
    //Login   
    $stateProvider.state('login', {
        url: '/login',
        template: '<login></login>',
        component: 'login',
    })
    //Home 
    $stateProvider.state('home', {
        url: '/home',
        template: '<home user="$resolve.user"></home>',
        component: 'home',
        params: {
            user: null
        },
        resolve: {
            user: function ($stateParams) {
                return $stateParams.user;
            }
        },
        controllerAs: '$resolve'
    })
    
    
    $stateProvider.state('todos', {
        url: '/todos',
        template: '<todos todos="$resolve.todos" active-list="$resolve.activeList" selected-user="$resolve.selectedUser" loged-user="$resolve.logedUser"></todos>',
        component: 'todos',
        params: {
            activeListId: null,
            selectedUser: null,
            logedUser: null
        },
        resolve: {
            todos: function ($todoService, $stateParams) {
                return $todoService.getTodosByProject($stateParams.activeListId)
            },
            activeList: function ($projectService, $stateParams) {
                return $projectService.getProjectById($stateParams.activeListId)
            },
            selectedUser: function ($stateParams) {
                return $stateParams.selectedUser;
            },
            logedUser: function ($stateParams) {
                return $stateParams.logedUser;
            }
        },
        controllerAs: '$resolve'
    }).state('createTodo', {
        parent: 'todos',
        url: '/createTodo',
        templateUrl: 'Template/Todo/createTodo.html'
                //Passing todo thru $ctrl
    }).state('updateTodo', {
        parent: 'todos',
        url: '/updateTodo',
        templateUrl: 'Template/Todo/updateTodo.html',
    }).state('trackTodo', {
        parent: 'todos',
        url: '/trackingTodo',
        templateUrl: 'Template/Todo/trackTodo.html',
    }).state('todoDetail', {
        parent: 'todos',
        url: '/todoDetail',
        templateUrl: 'Template/Todo/todoDetail.html'
    });
});
App.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        $state.go('login');
        //for checking current state in header
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }])


