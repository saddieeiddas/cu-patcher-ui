patcherApp.controller('PatcherCtrl',
    ['$scope', '$timeout', 'Content', 'Game', 'Patcher', 'PlayTime',
    function($scope, $timeout, Content, Game, Patcher, PlayTime) {

    if (!Patcher.hasAPI()) {
        throw new Error('Patcher API is required!');
    }

    var hasUserEmail = Patcher.hasUserEmail();

    $timeout(function() {
        if (hasUserEmail) {
            $scope.$broadcast('focusPassword');
        } else {
            $scope.$broadcast('focusEmail');
        }
    });

    $scope.user = {
        email: Patcher.getUserEmail(),
        screenName: null,
        rememberMe: hasUserEmail,
        isLoggedIn: false
    };

    $scope.channel = {
        isNotInstalled: false,
        isUpdating: false,
        isInstalled: false,
        isPlaying: false
    };

    $scope.servers = [];

    $scope.banners = [];

    $scope.bannersVisible = false;

    $scope.percentRemaining = 0;

    $scope.secondsRemaining = 0;

    $scope.downloadSpeed = 0;

    $scope.selectedChannelId = -1;

    $scope.selectedServer = null;

    $scope.nextTest = null;

    $scope.lastUpdated = null;

    $scope.hasAcceptedEUALA = false;

    $scope.isEualaModalVisible = false;

    $scope.isFaqModalVisible = false;

    $scope.isPreferredPlayTimeModalVisible = false;

    var $faqModal = angular.element('#faq-modal')[0];
    
    var $loadingBarComplete = $('#loading-bar-complete');
    
    var updateChannelIntervalId;

    var previousChannelID = -1;

    var previousChannelStatus = null;

    var pastSecondsRemaining = [];

    var channelLastUpdated = {};

    var getServersStartTime = null;

    var isManualSelection = false;

    var bottom = $('#bottom');

    (function getBanners() {
        Content.getBanners().then(function(banners) {
            $timeout(function() {
                $scope.banners = banners;

                $timeout(function() {
                    $scope.bannersVisible = true;
                });
            });
        }, getBanners);
    })();

    (function getNextInternalTest() {
        Content.getNextTest().then(function(scheduledEvent) {
            $timeout(function() {
                $scope.nextTest = scheduledEvent;

                var refreshMilliseconds = -1;

                if (scheduledEvent && scheduledEvent.endDate) {
                    refreshMilliseconds = new Date(scheduledEvent.endDate) - new Date();
                }

                if (refreshMilliseconds < 0) {
                    // default next refresh to 10 minutes
                    refreshMilliseconds = 1000 * 60 * 10;
                } else {
                    // add 10 seconds to end date till next refresh
                    refreshMilliseconds += 1000 * 10;
                }

                $timeout(function() {
                    $scope.nextTest = null;

                    getNextInternalTest();
                }, refreshMilliseconds);
            });
        }, getNextInternalTest);
    })();

    $scope.isReconnectingToServer = function() {
        var isReconnecting = Patcher.isPatcherReconnecting();
        var hasBlur = bottom.hasClass('blurfilter');
        if (isReconnecting === true && hasBlur === false)
        {
            bottom.addClass('blurfilter');
        }
        else if (isReconnecting === false && hasBlur === true)
        {
            bottom.removeClass('blurfilter');
        }
        return isReconnecting;
    }

    $scope.getTimeToNextReconnect = function() {
        return Patcher.getDownloadRemaining();
    }

    function sortServers(a, b) {
        if (a.host === 'localhost') return -1;
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    }

    function getServers(channelID) {
        if (!channelID && $scope.channel && $scope.channel.channelID) {
            channelID = $scope.channel.channelID;
        }

        getServersStartTime = new Date();

        Game.getServers(channelID).then(function(servers) {
            $timeout(function() {
                var previousServers = $scope.servers;

                $scope.servers = servers.sort(sortServers);

                if (previousServers.length) {
                    $scope.servers.forEach(function(server) {
                        var previousServer = previousServers.filter(function(ps) {
                            return ps.name === server.name;
                        })[0];

                        if (previousServer) {
                            server.isOnline = previousServer.isOnline;
                            server.playerCounts = previousServer.playerCounts;
                        }
                    });
                }

                var selectedServer;

                if (isManualSelection && $scope.selectedServer) {
                    selectedServer = servers.filter(function(s) {
                        return s.name === $scope.selectedServer.name;
                    })[0];
                } else {
                    selectedServer = servers[0];
                }

                $scope.selectServer(selectedServer, isManualSelection);

                getServerPlayers();
            });
        }, getServers);
    }

    getServers();

    function getServerPlayers() {
        var getPlayersResponses = 0;
        var expectedGetPlayersResponses = $scope.servers.length;

        $scope.servers.forEach(function(server) {
            Game.getPlayers(server).then(function(players) {
                getPlayersResponses++;

                $timeout(function() {
                    server.isOnline = true;
                    server.playerCounts = players;

                    if ($scope.selectedServer && server.name == $scope.selectedServer.name) {
                        $scope.selectServer(server, isManualSelection);
                    }
                });

                if (getPlayersResponses == expectedGetPlayersResponses) {
                    $timeout(getServers, 10000 - (new Date() - getServersStartTime));
                }
            }, function() {
                getPlayersResponses++;

                $timeout(function() {
                    server.isOnline = false;
                    server.playerCounts = null;

                    if ($scope.selectedServer && server.name == $scope.selectedServer.name) {
                        $scope.selectServer(server, isManualSelection);
                    }
                });

                if (getPlayersResponses == expectedGetPlayersResponses) {
                    $timeout(getServers, 10000 - (new Date() - getServersStartTime));
                }
            });
        });
    }

    $scope.selectServer = function(server, isManual) {
        isManualSelection = isManual;

        $timeout(function() {
            $scope.selectedServer = server;
        });
    };

    $scope.login = function(user) {
        if (!user || !user.email || !user.password) return;

        Patcher.login(user);

        $scope.selectChannel(0);
    };

    $scope.logout = function() {
        Patcher.logout();

        $scope.selectChannel(-1);

        $scope.isEualaModalVisible = false;

        $scope.user = {
            email: Patcher.getUserEmail(),
            screenName: null,
            rememberMe: hasUserEmail,
            isLoggedIn: false
        };

        $scope.channels = [];
    };

    $scope.getChannelStatus = function(channel) {
        switch (channel.channelStatus) {
            case 0: return 'Install';
            case 1: return 'Validating';
            case 2:
                if (Patcher.getDownloadRemaining() > 0) return 'Downloading';
                return 'Unpacking Files';
            case 3: return 'Update Queued';
            case 4: return 'Play';
            case 5: return 'Launching';
            case 6: return 'Playing';
            case 7: return 'Uninstall Queued';
        }
    };

    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof fn === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.updateChannel = function(channel) {
        $timeout(function() {
            $scope.channel = channel;

            $scope.channel.isNotInstalled = channel.channelStatus == 0;

            $scope.channel.isUpdating = channel.channelStatus == 1 || channel.channelStatus == 2 || channel.channelStatus == 3 || channel.channelStatus == 7;

            $scope.channel.isInstalled = channel.channelStatus == 4;

            $scope.channel.isPlaying = channel.channelStatus == 5 || channel.channelStatus == 6;

            var downloadRemaining = Patcher.getDownloadRemaining();

            if (channel.channelStatus == 2 && downloadRemaining > 0) {
                var downloadProgressPercent = $scope.downloadProgressPercent = Patcher.getDownloadProgressPercent();

                var secondsRemaining = Patcher.getDownloadSecondsRemaining();

                pastSecondsRemaining.push(secondsRemaining);

                if (pastSecondsRemaining.length > 20) {
                    pastSecondsRemaining.shift();
                }

                $scope.secondsRemaining = average(pastSecondsRemaining);

                $scope.downloadRemaining = downloadRemaining;

                $scope.downloadEstimate = Patcher.getDownloadEstimate();

                $scope.downloadRate = Patcher.getDownloadRate();

                $scope.totalFiles = Patcher.getTotalFiles();

                $scope.completedFiles = Patcher.getCompletedFiles();

                $scope.lastUpdated = channelLastUpdated[channel.channelID] = new Date();

                $loadingBarComplete.stop(true, true).animate({
                    width: (798 * Patcher.getDownloadProgressRatio()) + 'px'
                }, 100);
            } else {
                $scope.downloadProgressPercent = 0;

                $scope.secondsRemaining = 0;

                $scope.downloadRemaining = 0;

                $scope.downloadEstimate = 0;

                $scope.downloadRate = 0;

                $scope.totalFiles = 0;

                $scope.completedFiles = 0;

                $loadingBarComplete.stop(true, true).css({
                    width: '0px'
                });
            }

            $scope.buttonText = $scope.getChannelStatus(channel).toUpperCase();
        });
    };

    $scope.installChannel = function(channel) {
        Patcher.installChannel(channel);
    };

    $scope.launchChannel = function(e, channel) {
    	var params = '';

        if (e.altKey) {
            params = prompt('params', '');
        }

        if (params != null) {
            Patcher.launchChannel(channel, params);
        }
    };

    $scope.uninstallChannel = function(channel) {
        var res = confirm('Do you really want to uninstall ' + channel.channelName + '?');
        if (res == true) {
            Patcher.uninstallChannel(channel);
        }
    };

    $scope.selectChannel = function(channelIndex, channelID) {
        clearInterval(updateChannelIntervalId);

        previousChannelID = -1;

        previousChannelStatus = null;

        $scope.selectedServer = null;

        $timeout(function() {
            $scope.selectedChannelIndex = channelIndex;

            $scope.lastUpdated = channelLastUpdated[channelID];
        });

        var hasChannelIndex = channelIndex >= 0;
        var hasChannelID = typeof channelID === 'number';

        if (hasChannelIndex && hasChannelID) {
            getServers(channelID);
        }

        var channelsStart = new Date().getTime();

        var channelStart = new Date().getTime();

        updateChannelIntervalId = setInterval(function() {
            var isLoggedIn = $scope.user.isLoggedIn = Patcher.hasLoginToken();

            if (!isLoggedIn) return;

            if (!$scope.user.screenName) {
                if (Patcher.hasScreenName()) {
                    $scope.user.screenName = Patcher.getScreenName();
                } else {
                    $scope.user.screenName = Patcher.getUserEmail();
                }
            }

            var channels = Patcher.getAllChannels();

            var hasChannels = channels && channels.length > 0;

            if (!hasChannels) return;

            var elapsedChannelsTime = new Date().getTime() - channelsStart;

            if ((!channels || !$scope.channels) || (elapsedChannelsTime >= 1000 && !areEqualChannels(channels, $scope.channels))) {
                $timeout(function() {
                    $scope.channels = channels;

                    if (hasChannelIndex && !hasChannelID) {
                        channelID = channels[channelIndex].channelID;
                        
                        getServers(channelID);
                    }
                });

                channelsStart = new Date().getTime();
            }

            var channel = channels[channelIndex];

            if (!channel) return;

            var elapsedChannelTime = new Date().getTime() - channelStart;

            if (elapsedChannelTime >= 1000 || 
                (channel.channelStatus == 2 ||
                channel.channelID != previousChannelID ||
                channel.channelStatus != previousChannelStatus)) {

                $scope.updateChannel(channel);

                previousChannelID = channel.channelID;

                previousChannelStatus = channel.channelStatus;

                channelStart = new Date().getTime();
            }

            if (!$scope.hasAcceptedEUALA) {
                $scope.showEUALA();
            //} else if (!Patcher.hasReadFAQ()) {
            //    $scope.showFAQ();
            } else if (!PlayTime.hasSetPreferredPlayTime()) {
                showPreferredPlayTimeModal();
            }
        }, 200);
    };

    $scope.convertBytesToString = function(byteValue) {
        if (byteValue > 1048576) {
            return (byteValue / 1048576).toFixed(2) + 'MB';
        } else if (byteValue > 1024) {
            return (byteValue / 1024).toFixed(2) + 'KB';
        }
        return byteValue + 'B';
    };

    function areEqualChannels(a, b) {
        for (var i = 0, length = a.length; i < length; i++) {
            var channelA = a[i];
            var channelB = b[i];
            if (typeof channelA !== 'object' ||
                typeof channelB !== 'object' ||
                channelA.channelID !== channelB.channelID ||
                channelA.channelName !== channelB.channelName) {
                return false;
            }
        }
        return true;
    }

    function sum(values) {
        return _.reduce(values, function(a, b) { return a + b; });
    }

    function average(values) {
        return sum(values) / values.length;
    }

    $scope.showEUALA = function() {
        $scope.isEualaModalVisible = true;
    };

    $scope.acceptEUALA = function() {
        $scope.hasAcceptedEUALA = true;

        $scope.isEualaModalVisible = false;
    };

    $scope.showFAQ = function() {
        if ($scope.isFaqModalVisible) return;

        $timeout(function () {
            $faqModal.scrollTop = 0;
        });

        $scope.isFaqModalVisible = true;
    };

    $scope.hideFAQ = function() {
        if (!$scope.isFaqModalVisible) return;

        if (!Patcher.hasReadFAQ()) {
            Patcher.markFAQAsRead();
        }

        $scope.isFaqModalVisible = false;
        showPreferredPlayTimeModal();
    };

    function showPreferredPlayTimeModal() {
        if ($scope.isPreferredPlayTimeModalVisible) return;
        $scope.isPreferredPlayTimeModalVisible = !$scope.isFaqModalVisible && !PlayTime.hasSetPreferredPlayTime();
    }

    $scope.setPreferredPlayTime = function(playTime) {
        $scope.isPreferredPlayTimeModalVisible = false;
        PlayTime.setPreferredPlayTime(playTime);
    };

    // Keep in sync with /api/servers access levels
    var AccessLevel;
    (function (AccessLevel) {
        AccessLevel[AccessLevel["Invalid"] = -1] = "Invalid";
        AccessLevel[AccessLevel["Public"] = 0] = "Public";
        AccessLevel[AccessLevel["Beta3"] = 1] = "Beta3";
        AccessLevel[AccessLevel["Beta2"] = 2] = "Beta2";
        AccessLevel[AccessLevel["Beta1"] = 3] = "Beta1";
        AccessLevel[AccessLevel["Alpha"] = 4] = "Alpha";
        AccessLevel[AccessLevel["IT"] = 5] = "IT";
        AccessLevel[AccessLevel["Devs"] = 6] = "Devs";
    })(AccessLevel || (AccessLevel = {}));

    $scope.hasAccessLevel = function(accessLevel) {
        return _.isNumber(accessLevel) && accessLevel >= AccessLevel.Public;
    };

    $scope.getAccessLevel = function(accessLevel) {
        return AccessLevel[accessLevel];
    };
}]);
