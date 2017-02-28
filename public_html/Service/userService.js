//@author jakubvacek
'use strict';
App.service('$userService', ['$http', function ($http) {
        return {
            getUsers: function () {
                return $http.get('http://localhost:8080/user')
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            alert(response.status)
                        });
            },
            createUser: function (data) {
                return $http.put('http://localhost:8080/user', data)
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            alert(response.status)
                        });
            },
            deleteUser: function (id) {
                return $http.delete('http://localhost:8080/user', {params: {"id": id}})
                        .then(function (response) {
                        }, function (response) {
                            alert(response.status)
                        });
            },
            getUserDetail: function (id) {
                return $http.get('http://localhost:8080/userDetail', {params: {"id": id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            alert(response.status)
                        })
            }
        }
    }]);


