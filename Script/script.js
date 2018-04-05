"use strict";
// create the module and name it UsersApp
var UsersApp = angular.module('UsersApp', ['ngRoute', 'ngResource']);



UsersApp.factory("GetUsers", function ($resource) {
    // configure the service methods
    return $resource('/api/Users/:id', {}, {
        'get': { method: 'GET' },
        'save': { method: 'POST', isArray: true },
        'query': { method: 'GET', isArray: true },
        'delete': { method: 'DELETE' }
    })

});

// configure our routes
UsersApp.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl: 'pages/contact.html',
            controller: 'contactController'
        });
});

// create the controller and inject Angular's $scope and service 
UsersApp.controller('mainController', function ($scope, GetUsers) {

    $scope.Delete = function (id) {
        GetUsers.delete({ id: id }, function (data) {
            $scope.loadUsers();
        });
    }

    $scope.Edit = function (user) {
        $scope.OperationUpdateText = "Update"
        $scope.OperationCancelText = "Undo"
        $scope.errorMessages = [];
        GetUsers.get({ id: user.id }, function (data) {
            $scope.User = data;
            $scope.CopyUser = angular.copy(data);
        });

    }

    $scope.Update = function () {
        GetUsers.save(JSON.stringify($scope.User)).$promise.then(function (data) {
            $scope.errorMessages = data;
            $scope.loadUsers();
            $scope.CopyUser = angular.copy($scope.User);
        });
    }

    $scope.AddUser = function () {
        newUser();
    }
    $scope.Cancel = function () {
        if ($scope.User.id === 0) {
            newUser();
        }
        else {
            $scope.User = $scope.CopyUser;
        }
    }

    $scope.loadUsers = function () {
        GetUsers.query(function (data) {
            $scope.Users = data;
        });
    }

    $scope.newUser = function () {
        $scope.errorMessages = [];
        $scope.User = {}
        $scope.User.id = 0;
        $scope.OperationUpdateText = "Save"
        $scope.OperationCancelText = "Reset"
    }
    $scope.newUser();
    $scope.loadUsers();

});

UsersApp.controller('aboutController', function ($scope) {
    $scope.message = "Tejinder's about page.";
});

UsersApp.controller('contactController', function ($scope) {
    $scope.message = 'Contact me! Tejinder This is just a demo.';
});