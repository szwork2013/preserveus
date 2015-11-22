'use strict';

angular.module('preserveusApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui.mask',
        'ngTouch',
        'ngFileUpload',
        'ngStorage',
        'vcRecaptcha',
        'chart.js',
        'summernote'
    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    })

.factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
    return {
        // Add authorization token to headers
        request: function(config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
            }
            return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
            if (response.status === 401) {
                $location.path('/login');
                // remove any stale tokens
                $cookieStore.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
})

.run(function($rootScope, $location, $timeout, Auth) {
    $rootScope.Auth = Auth;
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next, toParams, fromState, fromParams) {
        Auth.isLoggedInAsync(function(loggedIn) {
            if (next.authenticate || next.roles && !loggedIn) {
                event.preventDefault();


                $timeout(function() {
                    $location.path('/login');
                });
            } else if (next.roles && !Auth.hasRoles(next.roles)) {
                event.preventDefault();
                $timeout(function() {
                    $location.path('/notAuthorized').replace();
                });
            }

            /*
            if (next.isOrgAdminFor && toParams[next.isOrgAdminFor] && !Auth.isOrgAdminFor(toParams[next.isOrgAdminFor])) {
                event.preventDefault();
                return $location.path('/notAuthorized').replace();
            }
            */
        });
    });

    $rootScope.$on('$stateChangeSuccess', function(event, next) {
        $('html, body').scrollTop(0);
    });

});

angular.module('preserveusApp').filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
}]);
