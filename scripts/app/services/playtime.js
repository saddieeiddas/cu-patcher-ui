patcherApp.factory('PlayTime', ['Patcher', function(Patcher) {
    var service = {};

    var hasSetPreferredPlayTime = true;

    var requestOnce = false;

    function updateHasSetPreferredPlayTime() {
        if (requestOnce) return;

        requestOnce = true;

        // Switched to ajax to make this work quickly.
        // if we want to use $http with Angular & Cors we need
        // to do some special shit:
        // ref: http://stackoverflow.com/questions/21455045/angularjs-http-cors-and-http-authentication

        $.post(
            'https://api.citystateentertainment.com/Account/GetPreferredPlayTime',
            { 'loginToken': Patcher.getLoginToken() },
            function(data, status) {
                if (status !== 'success') return;
                hasSetPreferredPlayTime = data.Document !== 'None';
            }
        );
    }

    service.hasSetPreferredPlayTime = function() {
        if (!requestOnce) updateHasSetPreferredPlayTime();

        return hasSetPreferredPlayTime;
    };

    service.setPreferredPlayTime = function(playTime) {
        hasSetPreferredPlayTime = true;

        $.post(
            'https://api.citystateentertainment.com/Account/SetPreferredPlayTime',
            { 'loginToken': Patcher.getLoginToken(), 'playTime': playTime },
            function(data, status) {}
        );
    };

    return service;
}]);