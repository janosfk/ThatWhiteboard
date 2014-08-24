'use strict';

var theWhiteboardDataRepo = function ($http) {

    function initialize() {

        $.connection.hub.logging = true;

        $.connection.error = function (err) {
            console.log('An error occurred: ' + err);
        };

        $.connection.whiteBoard.client.echo = function (message) {
            $rootScope.$emit('echo', message);
        };

        $.connection.whiteBoard.client.handleDraw = function (drawObject) {
            $rootScope.$emit('handleDraw', drawObject);
        };

        $.connection.hub.start();
    };

    var factory = {
        initialize: initialize
    };

    return factory;
};

theWhiteboardDataRepo.$inject = ['$http'];  //TODO: is $http really needed?

angular.module('theWhiteboardModule').factory('theWhiteboardDataRepo', theWhiteboardDataRepo);