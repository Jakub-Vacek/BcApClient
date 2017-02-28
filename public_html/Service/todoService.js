//@author jakubvacek
'use strict';
App.service('$todoService', ['$http', function ($http) {
        return {
            getTodosByProject: function (id) {
                return $http.get('http://localhost:8080/todosOfProject', {params: {id: id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            alert(response.status)
                        });
            },
            createTodo: function (id, data) {
                return $http.put('http://localhost:8080/todo', data, {params: {id: id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            alert(response.status)
                        })
            },
            updateTodo: function (id, data) {
                return $http.post('http://localhost:8080/todo', data, {params: {id: id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            alert(response.status)
                        })
            },
            getTodoDetail: function (id) {
                return $http.get('http://localhost:8080/todoDetail', {params: {"id": id}})
                        .then(function (response) {
                            return response.data;
                        }, function (response) {
                            alert(response.status)
                        })
            },
            deleteTodoById: function (todoId, projectId) {
                return $http.delete('http://localhost:8080/todo', {params: {todoId: todoId, listId: projectId}})
                        .then(function (response) {
                        }, function (response) {
                            alert(response.status)
                        });
            }

        }
    }]);


