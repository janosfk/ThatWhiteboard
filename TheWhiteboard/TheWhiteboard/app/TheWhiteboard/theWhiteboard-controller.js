(function () {
    'use strict';


    //angular.module('theWhiteboardModule').controller('theWhiteboardController', ['$scope', 'theWhiteboardDataRepo', 'bootstrappedData', theWhiteboardController]);

    ////theWhiteboardController.$inject = ['$scope', 'theWhiteboardDataRepo'];
    angular.module('app.theWhiteboard')
        .controller('theWhiteboardController', ['$rootScope','$scope','$http','authService','AUTH_EVENTS','theWhiteboardDataRepo', theWhiteboardController]);

    function theWhiteboardController($rootScope, $scope, $http,authService,AUTH_EVENTS, theWhiteboardDataRepo) {
        //$scope.bootstrappedData = bootstrappedData.vm;
        $scope.WIDTH = "400";
        $scope.HEIGHT = "200";
        $scope.message = "Initial";
        $scope.drawObject = "Not changed";
        $scope.users = []; // ['tom', 'bob'];

        //#region auth
        if (authService.authentication.isAuth) {
            onLoad();
        } else {
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }

        $scope.$on(AUTH_EVENTS.loginSuccess, function() {
            onLoad();
        });
        //#endregion auth

        function onLoad() {
            //$scope.authenticated = false;

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

            //$scope.$parent.$on("sendUserList", function (e, users) {
            $scope.$on("sendUserList", function (e, users) {
                $scope.$apply(function () {
                    userListChanged(users);
                });
            });

            theWhiteboardDataRepo.initialize();
        }
    };
})();