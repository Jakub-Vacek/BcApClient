//@author jakubvacek
angular.module('App').component('todos', {
    bindings: {todos: '=', activeList: '=', selectedUser: '=', logedUser: '='},
    templateUrl: 'Template/Todo/todoTable.html',
    controller: function ($interval, $state, $timeService, $todoService, $activityService, $projectService) {
        var self = this;
        this.timer;
        this.tracking = false;
        this.time = new Date(Date.MinValue);
        this.trackedTodo;
        this.switchTodo = false;
        this.currentTime = "0:00:00"

        this.getTodoDetail = function (id) {
            $todoService.getTodoDetail(id).then(function (response) {
                self.todo = response;
                $("html, body").animate({scrollTop: 0}, "slow");
            });
        }

//         this.$onInit = function () {
//        };

        //switch todo resolved state
        this.switchResolvedState = function () {
            self.switchTodo ^= true;
        };

        this.updateActiveList = function () {
            $projectService.getProjectById(self.activeList.id).then(function (response) {
                self.activeList = response;
            });
        }

        //Creates new todo, checks if active lost exists, creates new todo, relods todos of list, clears the form
        this.createTodo = function () {
            var status = 0;
            if (self.switchTodo) {
                status = 100;
            }
            var date = $timeService.setDateTime(new Date(0), ($('#timePickerCreateTodo').val())).toISOString()
            var data = {"createdOn": null, "resolveUntil": new Date($('#datePickerCreateTodo').val()).toISOString(), "id": null, "description": self.descriptionCreateTodo, "resolved": self.switchTodo, "status": status, "timeToFinish": date};
            $todoService.createTodo(self.activeList.id, data).then(function (response) {
                $state.go('todos', {activeListid: self.activeList.id}, {reload: true}); //reload data
                self.switchTodo = false;
                $activityService.createActivity(self.activeList.id, self.logedUser.id, self.selectedUser.id, null, "Creating Todo", null);
            });
            this.descriptionCreateTodo = "";
            $('#datePickerCreateTodo').val("");
            $('#timePickerCreateTodo').val("");
        };

        //delete todo by its id, reload todos of current list
        this.deleteTodoById = function (id) {
            //deleting on client
            for (var i = 0; i < self.todos.length; i++)
            {
                if (self.todos[i].id === id)
                {
                    self.todos.splice(i, 1);
                }
            }
            $todoService.deleteTodoById(id, self.activeList.id).then(function (response) {
                self.updateActiveList();
                $activityService.createActivity(self.activeList.id, self.logedUser.id, self.selectedUser.id, null, "Deleting Todo with id: " + id, null);
            });
        }

        //Updates todo, reload todos, clears update form
        this.updateTodo = function (todo, changingState) {
            var data = {}
            if (changingState) {//Closes/Reopens todo
                todo.resolved ^= true
                if (todo.resolved) {
                    todo.status = 100
                } else {
                    todo.status = 0
                }
                data = {"createdOn": todo.created, "resolveUntil": todo.resolveUntil, "id": todo.id, "description": todo.description, "resolved": todo.resolved, "status": todo.status, "timeToFinish": todo.timeToFinish, "spentTime": todo.spentTime};
                $todoService.updateTodo(self.activeList.id, data).then(function (response) {
                    self.updateActiveList();
                    $state.go('todos');
                });
            }
            else { //Updates todo
                if (this.switchTodo) {
                    todo.status = 100;
                } else
                {
                    todo.status = 0;
                }
                var date = $timeService.setDateTime(new Date(0), ($('#timePickerUpdateTodo').val())).toISOString()
                data = {"createdOn": todo.createdOn, "resolveUntil": new Date($('#datePickerUpdateTodo').val()).toISOString(), "id": todo.id, "description": self.descriptionUpdateTodo, "resolved": self.switchTodo, "status": todo.status, "timeToFinish": date, "spentTime": todo.spentTime};
                $todoService.updateTodo(self.activeList.id, data).then(function (response) {
                    $state.go('todos', {}, {reload: true}); //reload data
                });
            }
            //Creating activity
            $activityService.createActivity(self.activeList.id, self.logedUser.id, self.selectedUser.id, todo.id, "Updating Todo", null);
            //Clering form
            self.descriptionUpdateTodo = "";
            $('#datePickerUpdateTodo').val("");
            $('#timePickerUpdateTodo').val("");
            self.switchTodo = false;
        }


        //Tracking
        this.stopTracking = function () {
            if (angular.isDefined(self.timer)) {
                $interval.cancel(self.timer);
            }
            self.tracking = false;
            var trackedTodo = $timeService.stopTracking(self.trackedTodo, self.time);
            $todoService.updateTodo(self.activeList.id, trackedTodo).then(function (response) {
                self.updateActiveList();
                $activityService.createActivity(self.activeList.id, self.logedUser.id, self.selectedUser.id, trackedTodo.id, "Stop tracking todo");
            });
            $state.go('todos');
        };


        this.setUpTracking = function (todo) {
            self.trackedTodo = todo;
            self.time = new Date();
            self.time.setHours(0);
            self.time.setMinutes(0);
            self.time.setSeconds(0);
            self.tracking = true;
            $activityService.createActivity(self.activeList.id, self.logedUser.id, self.selectedUser.id, todo.id, "Strated tracking todo");
            self.timer = $interval(function () {
                self.time.setSeconds(self.time.getSeconds() + 1);
                self.currentTime = self.time.toLocaleTimeString();
            }, 1000);
        };
        
        //Stoping timer on destroy
        this.$onDestroy = function () {
            if (self.tracking) {
            if (angular.isDefined(self.timer)) {
                $interval.cancel(self.timer);
            }
            self.tracking = false;
            var trackedTodo = $timeService.stopTracking(self.trackedTodo, self.time);
            $todoService.updateTodo(self.activeList.id, trackedTodo).then(function (response) {
                self.updateActiveList();
                $activityService.createActivity(self.activeList.id, self.logedUser.id, self.selectedUser.id, trackedTodo.id, "Stop tracking todo");
            });
            }
        };
    }
})