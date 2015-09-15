var patcherApp = angular.module('patcherApp', ['ngAnimate']);

patcherApp.WEB_API_HOST = 'http://hatchery.camelotunchained.com:8000';
patcherApp.SERVER_API_HOST = 'http://api.citystateentertainment.com:8001';

function DropDown(el) {
    this.dd = el;
    this.initEvents();
}

DropDown.prototype.initEvents = function() {
    this.dd.on('click', function(e) {
        $(this).toggleClass('active');
        e.stopPropagation();
    });    
};

$(function() {
    var dd = new DropDown($('#server-select'));

    $(document).click(function() {
        $('.wrapper-dropdown').removeClass('active');
    });
});