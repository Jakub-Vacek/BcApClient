//@author jakubvacek
'use strict';
App.service('$projectService', ['$http', function ($http) {
        return{
            getProjectsOfUser: function (user) {
                return $http.get('http://localhost:8080/projectsOfUser', {params: {"id": user.id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            alert(response.status)
                        });
            },
            deleteProject: function (project) {
                return $http.delete('http://localhost:8080/project', {params: {"id": project.id}})
                        .then(function (response) {
                        }, function (response) {
                            alert(response.status)
                        });
            },
            createProject: function (user, data) {
                return $http.put('http://localhost:8080/project', data, {params: {id: user.id}})
                        .then(function (response) {
                        }, function (response) {
                            alert(response.status)
                        });
            },
            getProjectDetail: function (id) {
                return $http.get('http://localhost:8080/projectDetail', {params: {"id": id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            alert(response.status)
                        })
            },
            getProjectById: function (id) {
                return $http.get('http://localhost:8080/project', {params: {"id": id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            alert(response.status)
                        })
            }
        }
    }]);


