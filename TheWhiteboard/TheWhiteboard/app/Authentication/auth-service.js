(function() {
    'use strict';

    angular.module('app.auth')
        .factory('authService', ['$http', '$q', '$window', 'localStorageService', authServiceFactoryFunc]);

    function authServiceFactoryFunc($http, $q, $window, localStorageService) {

        function login(loginData) {
            var data = "grant_type=password&username=" + loginData.username + "&password=" + encodeURIComponent(loginData.password);

            var deferred = $q.defer();

            $http.post('/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function(response) {
                    authentication.isAuth = true;
                    var username = loginData.username;

                    authentication.username = username;
                    authentication.token = response.access_token;
                    localStorageService.set('authorizationData', { token: response.access_token, username: authentication.username });

                    deferred.resolve(response);
                })
                .error(function(err) {
                    logout(false);
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function logout(useRedirect) {
            localStorageService.remove('authorizationData');

            authentication.isAuth = false;
            authentication.username = "";
            authentication.token = "";

            if (useRedirect) {
                $window.location = '/#/Goodbye';
            }
        }

        function register(data) {
            return $http.post('api/register', data);
        }

        var authentication = {
            isAuth: false,
            username: "",
            token: ""
        };

        fillAuthData();

        function fillAuthData() {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                authentication.isAuth = true;
                authentication.username = authData.username;
                authentication.token = authData.token;
            }
        }

        var authServiceFactory = {
            login: login,
            logout: logout,
            authentication: authentication,
            register:register
        };

        return authServiceFactory;
    }
})();