'use strict';

angular.module('preserveusApp')
    .controller('LoginCtrl', function($scope, Auth, $location, $window, ValidationService) {
        $scope.user = {};

        $scope.login = function(form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.login({
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .then(function() {
                        ValidationService.success('Logged In');
                        // Logged in, redirect to home
                        Auth.getUser().$promise.then(function(user) {
                            $location.path('/profile/' + user._id);
                        });

                    })
                    .catch(function(err) {
                        ValidationService.error(err.message);
                    });
            }
        };

        $scope.loginOauth = function(provider) {
            $window.location.href = '/auth/' + provider;
        };
    });
