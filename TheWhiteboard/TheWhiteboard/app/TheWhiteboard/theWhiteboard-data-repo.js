(function () {
    'use strict';

    angular.module('theWhiteboardModule').factory('theWhiteboardDataRepo', ['$rootScope', 'bootstrappedData', theWhiteboardDataRepo]);

    function theWhiteboardDataRepo($rootScope, bootstrappedData) {
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

            $.connection.whiteBoard.client.sendUserList = function (users) {
                $rootScope.$emit('sendUserList', users);
                
            };

            $.connection.hub.start().done(join());


            function join() {
                console.log(bootstrappedData.vm.userName + " " + bootstrappedData.vm.manager + " joined");
            }

        };

        var factory = {
            initialize: initialize
        };

        return factory;
    };


})();