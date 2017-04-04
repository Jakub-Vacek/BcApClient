//@author jakubvacek
'use strict';
App.service('$projectService', ['$http', '$notifyService', function ($http, $notifyService) {
        return{
            getProjectsOfUser: function (user) {
                return $http.get('http://localhost:8080/projects', {params: {userId: user.id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get projects of ' + user.username, "danger");
                        });
            },
            deleteProject: function (project) {
                return $http.delete('http://localhost:8080/projects', {params: {projectId: project.id}})
                        .then(function (response) {
                            $notifyService.notify('Project deleted', "success");
                        }, function (response) {
                            $notifyService.notify('Unable to delete project', "danger");
                        });
            },
            createProject: function (user, data) {
                return $http.post('http://localhost:8080/projects', data, {params: {userId: user.id}})
                        .then(function (response) {
                            $notifyService.notify('Project created', "success");
                        }, function (response) {
                            $notifyService.notify('Unable to create project', "danger");
                        });
            },
            getProject: function (id, fetchDetailInfo) {
                return $http.get('http://localhost:8080/projects', {params: {projectId: id, "fetchDetailInfo": fetchDetailInfo}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get project detail', "danger");
                        })
            }
        }
    }]);


