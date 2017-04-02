//@author jakubvacek
'use strict'
App.config(function ($stateProvider) {
    //Activity state
    $stateProvider.state('activities', {
        url: '/activities',
        template: '<activities loged-user="$resolve.logedUser"activities="$resolve.activities" selected-user="$resolve.selectedUser"></activities>',
        component: 'activities',
        //sending loged and selected user in paramaetrs
        params: {
            selectedUser: null,
            logedUser: null
        },
        //using user from parameters to get list of acitivity
        resolve: {
            activities: function ($activityService, $stateParams) {
                return $activityService.getActivitiesOfUser($stateParams.selectedUser)
            },
            selectedUser: function ($stateParams) {
                return $stateParams.selectedUser;
            },
            logedUser: function ($stateParams) {
                return $stateParams.logedUser;
            }
        },
        controllerAs: '$resolve'
    }).state('activityDetail', {
        parent: 'activities',
        url: '/activityDetail',
        templateUrl: 'Template/Activity/activityDetail.html'
    });
});


angular.module('App').component('activities', {
    bindings: {activities: '=', selectedUser: '=', logedUser: '='},
    templateUrl: 'Template/Activity/activityTable.html',
    controller: function ($activityService) {
        var self = this;
        this.getActivityDetail = function (id) {
            $activityService.getActivityDetail(id).then(function (response) {
                self.activity = response;
                $("html, body").animate({scrollTop: 0}, "slow");
            });
        }
    }
})


