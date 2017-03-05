//@author jakubvacek
'use strict'
App.config(function ($stateProvider) {
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
});
angular.module('App').component('projects', {
    bindings: {projects: '=', selectedUser: '=', logedUser: '='},
    templateUrl: 'Template/Project/projectTable.html',
    controller: function ($state, $activityService, $projectService) {
        var self = this;
        this.getProjectDetail = function (id) {
            $projectService.getProjectDetail(id).then(function (response) {
                self.project = response;
                $("html, body").animate({scrollTop: 0}, "slow");
            });
        }
        //Deletes list, hides todo table, reloads lists
        this.deleteProject = function (l) {
            $projectService.deleteProject(l).then(function (response) {
                //deleting on client
                for (var i = 0; i < self.projects.length; i++)
                {
                    if (self.projects[i].id === l.id)
                    {
                        self.projects.splice(i, 1);
                    }
                }
                $activityService.createActivity(l.id, self.logedUser.id, self.selectedUser.id, null, "deleting Task", null);
            });
        };

        //Creates new list, clears the form 
        this.createProject = function () {
            var data = {"id": null, "userID": self.selectedUser.id, "name": self.nameCreateProject, "description": self.descriptionCreateProject, "createdOn": null};
            $projectService.createProject(self.selectedUser, data).then(function (response) {
                $state.go('projects', {}, {reload: true});
            });
            self.nameCreateProject = "";
            self.descriptionCreateProject = "";
            $activityService.createActivity(null, self.logedUser.id, self.selectedUser.id, null, "Creating Task", null);
        };
    }
})


