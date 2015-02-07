(function () {
    'use strict';

    angular.module('app.auth')
        .factory('authInterceptorService', ['$rootScope', '$q', '$location', 'localStorageService', 'AUTH_EVENTS',

            function ($rootScope, $q, $location, localStorageService, AUTH_EVENTS) {
                var authInterceptorServiceFactory = {};

                var _request = function (config) {

                    config.headers = config.headers || {};

                    var authData = localStorageService.get('authorizationData');
                    if (authData) {
                        config.headers.Authorization = 'Bearer ' + authData.token;
                    }

                    return config;
                }

                var _responseError = function (rejection) {
                    //if (rejection.status === 401) {
                    //    $location.path('/login');
                    //}
                    $rootScope.$broadcast({
                        401: AUTH_EVENTS.notAuthenticated
                    }[rejection.status], rejection);

                    return $q.reject(rejection);
                }

                authInterceptorServiceFactory.request = _request;
                authInterceptorServiceFactory.responseError = _responseError;

                return authInterceptorServiceFactory;
            }
        ]);
})();

