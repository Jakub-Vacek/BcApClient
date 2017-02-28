//@author jakubvacek
'use strict';
App.service('$timeService', [function () {
        return {
            setDateTime: function (date, time) {
                date.setHours(time.substring(0, time.indexOf(":")));
                date.setMinutes(time.substring(time.indexOf(":") + 1, time.length));
                date.setSeconds("00");
                return date;
            },
            stopTracking: function (trackedTodo, time) {
                //Date to finish todo
                var toDate = new Date(trackedTodo.timeToFinish);
                var to = (toDate.getHours() * 60) + toDate.getMinutes();
                //Time already spent working on todo (from server)
                var spentTime = new Date(trackedTodo.spentTime);
                spentTime.setHours(0);
                var spent = (spentTime.getHours() * 60) + spentTime.getMinutes();
                //Time spent working on todo
                var trackedTime = new Date(trackedTodo.spentTime);
                trackedTime.setHours(time.getHours());
                trackedTime.setMinutes(time.getMinutes());
                var tracked = (time.getHours() * 60) + time.getMinutes();
                //Spent + tracked percentage
                var stat = (1 / (to / (tracked + spent))) * 100;
                //Resolving todo
                if (stat >= 100) {
                    trackedTodo.status = 100;
                    trackedTodo.resolved = true;
                }
                else {
                    trackedTodo.status = Math.round(stat);
                }
                spentTime.setHours(spentTime.getHours() + time.getHours());
                spentTime.setMinutes(spentTime.getMinutes() + time.getMinutes());
                trackedTodo.spentTime = spentTime.toISOString();
                return trackedTodo;
            }
        };
    }]);


