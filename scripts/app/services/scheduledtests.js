patcherApp.factory('ScheduledTests', ['$http', '$q', function($http, $q) {
    var service = {};

    service.getNextInternalTest = function() {
        var deferred = $q.defer();

        $http.get(patcherApp.WEB_API_HOST + '/api/scheduledevents/1').success(function(events) {
            if (events && events.length) {
                events.sort(function(a, b) {
                    return new Date(a.startDate) > new Date(b.startDate);
                });

                deferred.resolve(events[0]);
            } else {
                deferred.reject();
            }
        }).error(deferred.reject);

        return deferred.promise;
    };

    return service;
}]);
