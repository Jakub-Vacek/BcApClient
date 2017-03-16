//@author jakubvacek
'use strict';
App.service('$projectService', ['$http', '$notifyService', function ($http, $notifyService) {
        return{
            getProjectsOfUser: function (user) {
                return $http.get('http://localhost:8080/projectsOfUser', {params: {"id": user.id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get projects of ' + user.username, "danger");
                        });
            },
            deleteProject: function (project) {
                return $http.delete('http://localhost:8080/project', {params: {"id": project.id}})
                        .then(function (response) {
                        }, function (response) {
                            $notifyService.notify('Unable to delete project', "danger");
                        });
            },
            createProject: function (user, data) {
                return $http.post('http://localhost:8080/project', data, {params: {id: user.id}})
                        .then(function (response) {
                        }, function (response) {
                            $notifyService.notify('Unable to create project', "danger");
                        });
            },
            getProjectDetail: function (id) {
                return $http.get('http://localhost:8080/projectDetail', {params: {"id": id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get project detail', "danger");
                        })
            },
            getProjectById: function (id) {
                return $http.get('http://localhost:8080/project', {params: {"id": id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get project', "danger");
                        })
            }
        }
    }]);


