//@author jakubvacek
'use strict';
App.service('$todoService', ['$http', '$notifyService', function ($http, $notifyService) {
        return {
            getTodosByProject: function (id) {
                return $http.get('http://localhost:8080/todosOfProject', {params: {id: id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get todos', "danger");
                        });
            },
            createTodo: function (id, data) {
                return $http.post('http://localhost:8080/todo', data, {params: {id: id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to create todo', "danger");
                        })
            },
            updateTodo: function (id, data) {
                return $http.put('http://localhost:8080/todo', data, {params: {id: id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to update todo', "danger");
                        })
            },
            getTodoDetail: function (id) {
                return $http.get('http://localhost:8080/todoDetail', {params: {"id": id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            $notifyService.notify('Unable to get todo detail', "danger");
                        })
            },
            deleteTodoById: function (todoId, projectId) {
                return $http.delete('http://localhost:8080/todo', {params: {todoId: todoId, listId: projectId}})
                        .then(function (response) {
                        }, function (response) {
                            $notifyService.notify('Unable to delete todo', "danger");
                        });
            }

        }
    }]);


