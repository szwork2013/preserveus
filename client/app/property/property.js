'use strict';

angular.module('preserveusApp')
    .config(function($stateProvider) {
        $stateProvider.state('propertyList', {
            url: '/property',
            templateUrl: 'app/property/propertyList.html',
            controller: 'PropertyCtrl'
        }).state('propertyAddEdit', {
            url: '/property/:action/:id',
            templateUrl: 'app/property/propertyAdd.html',
            controller: 'PropertyAddEditCtrl',
            roles: ['admin']
        }).state('propertyView', {
            url: '/property/:id',
            templateUrl: 'app/property/propertyView.html',
            controller: 'PropertyViewCtrl'
        }).state('propertyInvestment', {
            url: '/propertyInvestment/:action/:id',
            templateUrl: 'app/property/propertyInvestment.html',
            controller: 'PropertyInvestmentCtrl'
        }).state('propertyRent', {
            url: '/propertyRent/:id',
            templateUrl: 'app/property/propertyRent.html',
            controller: 'PropertyRentCtrl'
        }).state('propertyIncomeReport', {
            url: '/propertyIncomeReport/:id',
            templateUrl: 'app/property/propertyIncomeReport.html',
            controller: 'PropertyIncomeReportCtrl',
            roles: ['admin']
        }).state('propertyTotalReport', {
            url: '/propertyTotalReport',
            templateUrl: 'app/property/propertyTotalReport.html',
            controller: 'PropertyTotalReportCtrl',
            roles: ['admin']
        });
    });
