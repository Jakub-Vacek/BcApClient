//@author jakubvacek
'use strict'
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


