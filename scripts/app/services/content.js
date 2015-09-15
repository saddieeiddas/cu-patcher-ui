patcherApp.factory('Content', ['$http', '$q', function($http, $q) {
    var service = {};

    service.getBanners = function() {
        var deferred = $q.defer();

        $http.get(patcherApp.WEB_API_HOST + '/api/banners').success(function(banners) {
            if (banners && banners.length) {
                banners.sort(function(a, b) {
                    return new Date(b.modified) - new Date(a.modified);
                });

                deferred.resolve(banners.map(function(banner) {
                    return banner.content;
                }));
            } else {
                deferred.reject();
            }
        }).error(deferred.reject);

        return deferred.promise;
    };

    service.getNextTest = function() {
        var deferred = $q.defer();

        $http.get(patcherApp.WEB_API_HOST + '/api/scheduledevents').success(function(events) {
            if (events && events.length) {
                events.sort(function(a, b) {
                    return new Date(a.startDate) - new Date(b.startDate);
                });

                deferred.resolve(events[0]);
            } else {
                deferred.resolve();
            }
        }).error(deferred.reject);

        return deferred.promise;
    };

    return service;
}]);
