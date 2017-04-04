//@author jakubvacek
'use strict';
App.service('$userService', ['$http', '$notifyService', function ($http, $notifyService) {
        return {
            getUsers: function () {
                return $http.get('http://localhost:8080/users')
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get users', "danger");
                        });
            },
            createUser: function (data) {
                return $http.post('http://localhost:8080/users', data)
                        .then(function (response) {
                            $notifyService.notify('User created', "success");
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to create user', "danger");
                        });
            },
            deleteUser: function (id) {
                return $http.delete('http://localhost:8080/users', {params: {userId: id}})
                        .then(function (response) {
                            $notifyService.notify('User deleted', "success");
                        }, function (response) {
                            $notifyService.notify('Unable to delete user', "danger");
                        });
            },
            getUserDetail: function (id) {
                return $http.get('http://localhost:8080/users', {params: {userId: id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get user detail', "danger");
                        })
            }
        }
    }]);


