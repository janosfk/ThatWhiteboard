(function () {
    'use strict';

    angular.module('app.auth')
        .controller('authCtrl', ['$rootScope', '$scope', 'authService', 'AUTH_EVENTS', 'toaster',
            function ($rootScope, $scope, authService, AUTH_EVENTS, toaster) {

                $scope.newUserRegistration = false;

                $scope.loginData = {
                    username: "",
                    password: ""
                };

                $scope.message = "";
                $scope.loginPressed = false;
                //$scope.registerPressed = false;

                $scope.login = function () {
                    if (!$scope.newUserRegistration) {          //login
                        $scope.loginPressed = true;

                        authService.login($scope.loginData)
                            .then(function (response) {
                                toaster.pop('success', 'Login information', 'Login success');
                                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                                $scope.loginPressed = false;
                                loadPainter();
                            },
                                function (err) {
                                    toaster.pop('error', 'Login information', err.error_description);
                                    //$scope.message = err.error_description;
                                    $scope.loginPressed = false;
                                });
                    } else {        //register new user
                        if ($scope.loginData.username === "" && $scope.loginData.password === "") {
                            toaster.pop('warning', 'Register info', 'Please fill out the form.');
                        } else if($scope.loginData.password !== $scope.repassword) {
                            toaster.pop('warning', 'Register info', 'The two passwords typed do not coincide.');
                        } else {
                            authService.register($scope.loginData)
                                .then(function(response) {
                                    var t = response;
                                }, function(err) {
                                    $scope.message = err.error_description;
                                    $scope.registerPressed = false;
                                });
                        }
                    }
                };

                $scope.newUser = function () {
                    $scope.newUserRegistration = true;
                }

                $scope.register = function () {
                    // $scope.registerPressed = true;

                    authService.register($scope.loginData)
                        .then(function (response) {
                            var t = response;
                        }, function (err) {
                            $scope.message = err.error_description;
                            $scope.registerPressed = false;
                        });
                }

            }]);
})();