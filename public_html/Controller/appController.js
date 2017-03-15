//@author jakubvacek
'use strict'
App.controller('appController', function ($notifyService, $state, $scope, $rootScope, $activityService, $http, $window) {
    var self = this;
    var uiKit = $rootScope.$uiKit;
    //Try to login with username and password, sets up logedUser and currentUser variables, sets up show variables (role USER can't see users table)
    this.login = function () {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $window.btoa(self.nameLogin + ':' + self.passLogin);
        $http.get('http://localhost:8080/login')
                .then(function (response) {
                    //seting scope and storage
                    $rootScope.logedUser = response.data;
                    //seting views
                    $state.go('home', {user: response.data});
                    //creating activity
                    $activityService.createActivity(null, response.data.id, response.data.id, null, "Login");
                    $notifyService.notify('User ' + response.data.username + ' loged in', "success");
                }, function (response) {
                    $notifyService.notify('Wrong username or password', "danger");
                });
        self.nameLogin = "";
        self.passLogin = "";
    };
    //Ssets show variables to default
    $scope.logout = function (user) {
        $notifyService.notify('User ' + $rootScope.logedUser.username + ' loged out', "success");
        $state.go('login');
        $rootScope.logedUser = null;
        //log
        $activityService.createActivity(null, user.id, user.id, null, "Logout");
    }
});


