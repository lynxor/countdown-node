
var ledColors = {
    lit: "rgba(82, 139, 183, 1.0)",
    unlit: "rgba(0, 0, 0, 0.0)",
    outline: "rgba(0, 0, 0, 0.0)"
};

var emptyHtml = "<h1>Nothing to see here...</h1>";

var model = function (countdownHolder, server) {
    return {
        
        countdowns: [],
        
        find: function (countdownInfo) {
            if (this.countdowns.length === 0) {
                return undefined;
            }
            
            var sortFunc = function (x) { return x.eventDate; };
            var i = _(this.countdowns).sortedIndex(countdownInfo, sortFunc);
            
            return i < this.countdowns.length ? i : undefined;
        },
        
        putCountdowns: function (countdowns) {
            if (countdowns.length === 0) {
                $(countdownHolder).html(emptyHtml);
                return;
            }
            $(countdownHolder).html(""); // clear
            var that = this;
            _(countdowns).each(function (countdown) {
                that._putCountdown(countdown);
            });
        },
        
        // adds a countdown, and refreshes the view
        putCountdown: function (c) {
            var o = this._putCountdown(c);
            return o;
        },
        
        //ads a countdown, does not refresh the view
        _putCountdown: function (c) {
            var where = this.find(c);
            var outside;
            if (where === undefined) {
                outside = $('<li class="countdown"></li>').appendTo(countdownHolder);
                this.countdowns.push(c);
            } else {
                outside = $('<li class="countdown"></li>').insertBefore($(countdownHolder).find("#" + this.countdowns[where].url).parent());
                this.countdowns.splice(where, 0, c);
            }

            //outside = $("<div></div>").appendTo(outside);
            $(outside).append("<span class=\"countdown-name\"><a href=\"/" + c.url + "\">" + c.name + "</a></span>");
            //$(outside).append("<span class=\"countdown\" id=\"" + c.url + "\"></span>");
            var cd = $("<span class=\"countdown\" id=\"" + c.url + "\"></span>").appendTo($(outside));
            $(outside).append('<span class="ui-li-count countdown-tags">' + c.tags + '</span>');
            
            countdown(cd, c.eventDate, 24, 32, ledColors);
            
            return $(outside);

        },
        
        pending: 0,
        
        clear: function () {
            this.countdowns = [];
            countdownHolder.html(emptyHtml);
        }

    };

};

 
//exports.model = model;
