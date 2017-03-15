//@author jakubvacek
'use strict';
App.service('$userService', ['$http', '$notifyService', function ($http, $notifyService) {
        return {
            getUsers: function () {
                return $http.get('http://localhost:8080/user')
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get users', "danger");
                        });
            },
            createUser: function (data) {
                return $http.put('http://localhost:8080/user', data)
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to create user', "danger");
                        });
            },
            deleteUser: function (id) {
                return $http.delete('http://localhost:8080/user', {params: {"id": id}})
                        .then(function (response) {
                        }, function (response) {
                            $notifyService.notify('Unable to delete user', "danger");
                        });
            },
            getUserDetail: function (id) {
                return $http.get('http://localhost:8080/userDetail', {params: {"id": id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get user detail', "danger");
                        })
            }
        }
    }]);


