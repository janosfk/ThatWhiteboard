(function () {
    'use strict';

    var theWhiteboardController = function ($scope, theWhiteboardDataRepo) {
        $scope.WIDTH = "400";
        $scope.HEIGHT = "200";
        $scope.message = "Initial";
        $scope.drawObject = "Not changed";

        function echo(message) {
            $scope.message = message;
        };
        function handleDraw(drawObject) {
            $scope.drawObject = drawObject;
        };

        theWhiteboardDataRepo.initialize();
    };

    theWhiteboardController.$inject = ['$scope', 'theWhiteboardDataRepo'];

    angular.module('theWhiteboardModule').controller('theWhiteboardController', theWhiteboardController);

})();