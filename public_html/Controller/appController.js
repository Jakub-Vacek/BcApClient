//@author jakubvacek
'use strict'
App.controller('appController', function ($state, $scope, $rootScope, $activityService, $http, $window) {
var self = this;
    //Try to login with username and password, sets up logedUser and currentUser variables, sets up show variables (role USER can't see users table)
    this.login = function () {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $window.btoa("Admin" + ':' + "a");
        //$http.defaults.headers.common['Authorization'] = 'Basic ' + $window.btoa(self.nameLogin + ':' + self.passLogin);
        $http.get('http://localhost:8080/login')
                .then(function (response) {
                    //seting scope and storage
                    $rootScope.logedUser = response.data;
                    //seting views
                    $state.go('home',{user:response.data});
                    //creating activity
                    $activityService.createActivity(null, response.data.id,response.data.id, null, "Login");
                }, function (response) {
                    console.error("error in login, status: " + response.status);
                    if (response.status === 401) {
                        alert("Wrong username or password");
                    } else {
                        alert("Something went wrong - try again");
                    }
                });
        self.nameLogin = "";
        self.passLogin = "";
    };
    //Clears sessionStorage and sets show variables to default
    $scope.logout = function (user) {
        $state.go('login');
        $rootScope.logedUser = null;
        //log
        $activityService.createActivity(null, user.id,user.id, null, "Logout");
    }
});


