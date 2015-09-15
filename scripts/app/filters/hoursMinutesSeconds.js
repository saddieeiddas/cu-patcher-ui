patcherApp.filter('hoursMinutesSeconds', [function() {
    return function(text) {
        var seconds = parseInt(text, 10);
        var hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
        var minutes = Math.floor(seconds / 60);
        seconds -= minutes * 60;
        var result = '';
        if (hours > 0) {
            result += hours;
            if (hours == 1) result += ' hour';
            else result += ' hours';
        }
        if (minutes > 0) {
            if (hours > 0 && seconds > 0) {
                result += ', ';
            } else if (hours > 0) {
                result += ' and ';
            }
            result += minutes;
            if (minutes == 1) result += ' minute';
            else result += ' minutes';
        }
        if (seconds > 0) {
            if (hours > 0 && minutes > 0) {
                result += ', and ';
            } else if (hours > 0 || minutes > 0) {
                result += ' and ';
            }
            result += seconds;
            if (seconds == 1) result += ' second';
            else result += ' seconds';
        }
        return result;
    }
}]);
