patcherApp.factory('Game', ['$http', '$q', function($http, $q) {
    var service = {};

    service.getServers = function(serverChannelID) {
        var deferred = $q.defer();

        $.ajax({
			type: 'GET',
			url: (patcherApp.SERVER_API_HOST + '/api/servers'),
			data: { channelID: serverChannelID },
			timeout: 6000
		}).done(function(servers) {
            if (servers && servers.length) {
                deferred.resolve(servers);
            } else {
                deferred.reject();
            }
        }).error(deferred.reject);

        return deferred.promise;
    };

    service.getPlayers = function(server) {
        var deferred = $q.defer();

        if (!server || !server.host) {
            deferred.reject();
        } else {
            $http.get('http://' + server.host + ':8000/api/game/players').success(function(players) {
                if (players) {
                    deferred.resolve(players);
                } else {
                    deferred.reject();
                }
            }).error(deferred.reject);
        }

        return deferred.promise;
    };

    return service;
}]);
