patcherApp.factory('Servers', ['$http', '$q', function($http, $q) {
    var service = {};

    service.get = function() {
        var deferred = $q.defer();

        $http.get(patcherApp.WEB_API_HOST + '/api/servers').success(function(servers) {
            if (servers && servers.length) {
                deferred.resolve(servers);
            } else {
                deferred.reject();
            }
        }).error(deferred.reject);

        return deferred.promise;
    };

    return service;
}]);
