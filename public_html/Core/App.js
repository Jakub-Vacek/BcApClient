//@author jakubvacek
'use strict'
var App = angular.module('App', ['ui.router', 'ngAnimate']);
App.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        $state.go('login');
        //for checking current state in header
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }])


