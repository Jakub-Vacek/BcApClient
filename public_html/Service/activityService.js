//@author jakubvacek
'use strict';
App.service('$activityService', ['$http', '$notifyService', function ($http,$notifyService) {
        return {
            createActivity: function (projectId, logedUserId, selectedUserId, todoId, description, duration) {
                var data = {"createdOn": null, "description": description, "id": null, "duration": duration};
                var params = {projectId: projectId, logedUserId: logedUserId, selectedUserId: selectedUserId, todoId: todoId};
                $http.post('http://localhost:8080/activities', data, {params: params})
                        .then(function () {
                        }, function () {
                            $notifyService.notify('Unable to create activity', "danger");
                        });
            },
            getActivitiesOfUser: function (user) {
                return $http.get('http://localhost:8080/activities', {params: {"userId": user.id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get activities', "danger");
                        });
            },
            getActivityDetail: function (id) {
                return $http.get('http://localhost:8080/activities', {params: {"activityId": id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get activity detail', "danger");
                        });
            }
        };
    }]);


