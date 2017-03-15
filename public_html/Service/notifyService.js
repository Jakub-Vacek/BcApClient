//@author jakubvacek
'use strict';
App.service('$notifyService', [function () {
        return {
            notify: function (message, status) {
                UIkit.notify({
                    message: message,
                    status: status,
                    timeout: 1500,
                    pos: 'top-center'
                });
            }
        };
    }]);


