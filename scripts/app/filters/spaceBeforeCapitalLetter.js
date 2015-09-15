patcherApp.filter('spaceBeforeCapitalLetter', [function() {
    return function(text) {
    	return text && text.replace(/([a-z])([A-Z])/g, '$1 $2');
    };
}]);
