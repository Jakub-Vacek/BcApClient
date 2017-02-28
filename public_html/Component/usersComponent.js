//@author jakubvacek
'use strict'
angular.module('App').component('users', {
    bindings: {users: '=', logedUser: '='},
    templateUrl: 'Template/User/userTable.html',
    controller: function ($state, $userService, $activityService) {
        var self = this;
        this.getUserDetail = function (id) {
            $userService.getUserDetail(id).then(function (response) {
                self.user = response;
                $("html, body").animate({scrollTop: 0}, "slow");
            });
        }
        //Creates new user, clears the create user form 
        this.createUser = function () {
            var data = {"id": null, "username": self.nameCreateUser, "passwordHash": self.passCreateUser, "role": $('#selectCreateUser :selected').val(), "description": self.descriptionCreateUser, "createdOn": null};
            $userService.createUser(data).then(function (response) {
                $state.go('users', {}, {reload: true});
            });
            $activityService.createActivity(null, self.logedUser.id, self.logedUser.id, null, "Creating user " + self.nameCreateUser, null);
            self.nameCreateUser = "";
            self.passCreateUser = "";
            self.descriptionCreateUser = "";
        };

        //deletes user, hides todo and list table, clear activeList and currentUser
        this.deleteUser = function (user) {
            //deleting on client
            for (var i = 0; i < self.users.length; i++)
            {
                if (self.users[i].id === user.id)
                {
                    self.users.splice(i, 1);
                }
            }
            $userService.deleteUser(user.id).then(function (response) {
            });
            $activityService.createActivity(null, self.logedUser.id, self.logedUser.id, null, "Deleting user " + user.username, null);

        };
    },
})

