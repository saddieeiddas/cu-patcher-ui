patcherApp.factory('Banners', ['$http', '$q', function($http, $q) {
    var service = {};

    service.get = function() {
        var deferred = $q.defer();

        $http.get(patcherApp.WEB_API_HOST + '/api/banners').success(function(banners) {
            if (banners && banners.length) {
                deferred.resolve(banners.map(function(banner) {
                  return banner.content;
                }));
            } else {
                deferred.reject();
            }
        }).error(deferred.reject);

        return deferred.promise;
    };

    return service;
}]);
