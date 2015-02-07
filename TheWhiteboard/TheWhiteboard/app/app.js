(function () {
    'use strict';

    angular.module('app', ['ngRoute', 'LocalStorageModule', 'app.theWhiteboard', 'app.auth', 'toaster'])
        .value('$', $)
        .config(function($routeProvider) {
            $routeProvider
                .when("/TheWhiteboard", {
                    templateUrl: '../app/TheWhiteboard/theWhiteboard.html',
                    controller: 'theWhiteboardController'
                })
                .when("/Goodbye", {
                    templateUrl: '../app/Authentication/goodbye.html'
                })
                .when("/Hello", {
                    templateUrl: '../app/Authentication/hello.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
        })
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('authInterceptorService');
        })
        .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            notAuthenticated: 'auth-not-authenticated'
        })
       .directive('loginDialog', function (AUTH_EVENTS) {
           return {
               restrict: 'A',
               template: '<div ng-if="visible" ng-include="\'../app/Authentication/login.html\'" ng-style="mys" style="margin: 0px; padding: 0px; position: fixed; right: 0px;top: 0px; width: 100%; height: 100%; background-color: #666666; z-index: 30001;opacity: .98; filter: alpha(opacity=90)">',
               link: function (scope) {
                   var showDialog = function () {
                       scope.visible = true;
                       scope.mys = { display: 'block' };
                   };

                   var hideDialog = function () {
                       scope.visible = false;
                       scope.mys = { display: 'none' };
                       scope.test = 'hidden';
                   };

                   scope.mys = { display: 'none' };
                   scope.visible = false;
                   scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
                   scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);
                   scope.$on(AUTH_EVENTS.loginSuccess, hideDialog);
               }
           };
       });
})();