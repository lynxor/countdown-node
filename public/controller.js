var controller = function (model, server) {
    
    server = server === undefined ? "" : server;

    var countdownAction = function (url, data, method, success, failure) {

        $.ajax({
            url: server + url,
            //url: "http://localhost:55555/filesystem/index.html",
            data: data,
            type: method,
            dataType: "json",
            success: function (o) {
                console.log("Received response: " + JSON.stringify(o));
                model.clear();

                if (o.hasOwnProperty("error")) {
                    if (failure !== undefined) {
                        failure(o.error);
                    }
                }
                if (o.hasOwnProperty("countdowns")) {
                    model.putCountdowns(o.countdowns);
                } else {
                    model.putCountdown(o);
                }
                if (success !== undefined) {
                    success(o);
                }
            },
            error: function (e) {
                $("#info").html("An error occurred... Please try again." + JSON.stringify(e));
            }
        });
    };
    
    return {
        clear: function (e) {
            model.clear();
        },
        random: function (callback, failure) {
            countdownAction("/random", {}, "GET", callback, failure);
        },
        nextDay: function (callback, failure) {
            countdownAction("/day", {}, "GET", callback, failure);
        },
        nextWeek: function (callback, failure) {
            countdownAction("/week", {}, "GET", callback, failure);
        },
        nextMonth: function (callback, failure) {
            console.log("Month");
            countdownAction("/month", {}, "GET", callback, failure);
        },
        nextWeekend: function (callback, failure) {
            countdownAction("/weekend", {}, "GET", callback, failure);
        },
        nextYear: function (callback, failure) {
            countdownAction("/year", {}, "GET", callback, failure);
        },
        search: function(data) {
            countdownAction("/countdowns", data, "GET");
        },
        countdown: function (id, callback, failure) {
            countdownAction("?" + id, {}, "GET", callback, failure);
        },
        countdownAction: countdownAction

    };
};

if (typeof(exports) !== "undefined") {
    exports.controller = controller;
}


