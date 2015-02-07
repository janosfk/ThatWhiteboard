(function () {
    'use strict';

    angular.module('app').controller('layoutController', ['$rootScope', '$scope', '$http', 'authService', 'AUTH_EVENTS', layoutController]);

    function layoutController($rootScope, $scope, $http, authService, AUTH_EVENTS) {

        $scope.isLoginPage = false;
        $scope.loggedInUserName = "Anonymus";

        if (authService.authentication.isAuth) {
            $scope.loggedInUserName = authService.authentication.username;
        }

        $scope.$on(AUTH_EVENTS.loginSuccess, function () {
            $scope.loggedInUserName = authService.authentication.username;
        });

        $scope.logout = function () {
            authService.logout(true);
        };

        $scope.isAuth = function () {
            return authService.authentication.isAuth;
        };

        $scope.$on('$viewContentLoaded', function () {
            if (authService.authentication.isAuth) {
                console.log('loading painter....');
                loadPainter();
                console.log('painter loaded');
            }
            //else {
            //    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            //}
        });
    }
}());
