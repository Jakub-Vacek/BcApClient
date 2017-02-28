//@author jakubvacek
'use strict';
App.service('$activityService', ['$http', function ($http) {
        return {
            createActivity: function (projectId, logedUserId, selectedUserId, todoId, description, duration) {
                var data = {"createdOn": null, "description": description, "id": null, "duration": duration};
                var params = {projectId: projectId, logedUserId: logedUserId, selectedUserId: selectedUserId, todoId: todoId};
                $http.put('http://localhost:8080/activity', data, {params: params})
                        .then(function (response) {
                        }, function (response) {
                            alert(response.status)
                        });
            },
            getActivitiesOfUser: function (user) {
                return $http.get('http://localhost:8080/activity', {params: {"id": user.id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            alert(response.status)
                        });
            },
            getActivityDetail: function (id) {
                return $http.get('http://localhost:8080/activityDetail', {params: {"id": id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            alert(response.status)
                        });
            }
        };
    }]);


