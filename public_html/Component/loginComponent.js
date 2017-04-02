//@author jakubvacek
'use strict'
App.config(function ($stateProvider) {
    //Login state
    $stateProvider.state('login', {
        url: '/login',
        template: '<login></login>',
        component: 'login',
    })
});
angular.module('App').component('login', {
    templateUrl: 'Template/login.html',
    controller: 'appController'
})


