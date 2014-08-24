(function () {
    'use strict';


    angular.module('theWhiteboardModule').controller('theWhiteboardController', ['$scope', 'theWhiteboardDataRepo', 'bootstrappedData', theWhiteboardController]);
    //theWhiteboardController.$inject = ['$scope', 'theWhiteboardDataRepo'];

    function theWhiteboardController($scope, theWhiteboardDataRepo, bootstrappedData) {
        $scope.bootstrappedData = bootstrappedData.vm;
        $scope.WIDTH = "400";
        $scope.HEIGHT = "200";
        $scope.message = "Initial";
        $scope.drawObject = "Not changed";
        $scope.users = ['tom', 'bob'];

        //function echo(message) {
        //    $scope.message = message;
        //};
        //function handleDraw(drawObject) {
        //    $scope.drawObject = drawObject;
        //};

        function userListChanged(users) {
            angular.copy(users, $scope.users);
            //$scope.apply();
        };

        $scope.$parent.$on("sendUserList", function (e, users) {
            $scope.$apply(function () {
                userListChanged(users);
            });
        });

        theWhiteboardDataRepo.initialize();
    };


})();