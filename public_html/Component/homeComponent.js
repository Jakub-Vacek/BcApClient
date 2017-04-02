//@author jakubvacek
'use strict'
App.config(function ($stateProvider) {
    //Home state
    $stateProvider.state('home', {
        url: '/home',
        template: '<home user="$resolve.user"></home>',
        component: 'home',
        //sending loged user in paramaetrs
        params: {
            user: null
        },
        resolve: {
            user: function ($stateParams) {
                return $stateParams.user;
            }
        },
        controllerAs: '$resolve'
    })
});

angular.module('App').component('home', {
    bindings: {user: '='},
    templateUrl: 'Template/home.html'
})


