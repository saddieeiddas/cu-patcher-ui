patcherApp.factory('Patcher', [function() {
    var service = {};

    service.hasAPI = function() {
        return typeof patcherAPI !== 'undefined';
    };

    service.getUserEmail = function() {
        return patcherAPI.userEmail;
    };

    service.hasUserEmail = function() {
        var userEmail = service.getUserEmail();
        return userEmail && userEmail.length > 0;
    };

    service.getLoginToken = function() {
        return patcherAPI.loginToken;
    };

    service.hasLoginToken = function() {
        var loginToken = service.getLoginToken();
        return loginToken && loginToken.length > 0;
    };

    service.getScreenName = function() {
        return patcherAPI.screenName;
    };

    service.hasScreenName = function() {
        var screenName = service.getScreenName();
        return screenName && screenName.length > 0;
    };

    function getChannelValue(channel) {
        // force sort order to Hatchery, Wyrmling, Other Channels, and Editor last
        if (channel.channelID === 4)  return 0; // Hatchery
        if (channel.channelID === 10) return 1; // Wyrmling
        if (channel.channelID === 5)  return 3; // Editor
        return 2;
    }

    service.getAllChannels = function() {
        if (patcherAPI.channelData) {
            return Array.prototype.slice.call(patcherAPI.channelData).sort(function(a, b) {
              return getChannelValue(a) - getChannelValue(b);
            });
        }
        return [];
    };

    service.getPatcherState = function() {
        return patcherAPI.patcherState;
    };

    service.isPatcherReconnecting = function() {
        return patcherAPI.patcherState == 10;
    };

    service.getDownloadSecondsRemaining = function() {
        return patcherAPI.downloadRemaining / patcherAPI.downloadRate;
    };

    service.getDownloadRemaining = function() {
        return patcherAPI.downloadRemaining;
    };

    service.getDownloadEstimate = function() {
        return patcherAPI.downloadEstimate;
    };

    service.getDownloadRate = function() {
        return patcherAPI.downloadRate;
    };

    service.getDownloadProgressRatio = function() {
        var estimate = service.getDownloadEstimate();
        return estimate != 0 ? (estimate - service.getDownloadRemaining()) / estimate : 1;
    };

    service.getDownloadProgressPercent = function() {
        return Math.round(service.getDownloadProgressRatio() * 100);
    };

    service.getTotalFiles = function() {
        return patcherAPI.numberOfFiles;
    };

    service.getCompletedFiles = function() {
        return patcherAPI.completedFiles;
    };

    service.login = function(user) {
        patcherAPI.ValidateClient(user.email, user.password, user.rememberMe === true);
    };

    service.logout = function() {
        patcherAPI.InvalidateClient();
    };

    service.installChannel = function(channel) {
        patcherAPI.UpdateClient(parseInt(channel.channelID));
    };

    service.launchChannel = function(channel, params) {
        patcherAPI.LaunchChannel(parseInt(channel.channelID), params);
    };

    service.uninstallChannel = function(channel) {
        patcherAPI.UninstallChannel(parseInt(channel.channelID));
    };

    var hasReadFAQ = false;

    service.hasReadFAQ = function() {
        return hasReadFAQ || patcherAPI.hasReadFAQ;
    };

    service.markFAQAsRead = function() {
        hasReadFAQ = true;

        patcherAPI.MarkFAQAsRead();
    };

    return service;
}]);
