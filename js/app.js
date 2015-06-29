var app = angular.module('expensesApp', ['ngRoute']);

//define routes for the app, each route defines a template and a controller
app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'TagsController'
                })
                .when('/tags', {
                    templateUrl: 'views/main.html',
                    controller: 'TagsController'
                })
                .when('/users/:id', {
                    url: '/user',
                    templateUrl: 'views/user.html',
                    controller: 'UserController'
                })
                .otherwise({
                    redirectTo: '/'
                });
    }]);

app.controller('TagsController', ['$scope', '$http', 'Images', function($scope, $http, Images) {
        $scope.images = Images.entries;
        $scope.$watch(function() {
            return Images.entries;
        }, function(entries) {
            $scope.images = entries;
        });

        $scope.gettags = function() {
            console.log($scope.tag);
            var api = 'https://api.instagram.com/v1/tags/%tag%/media/recent?access_token=257058201.9af4692.6cf2c3b617d74a07848b198b3227ed05&callback=JSON_CALLBACK';
            api = api.replace('%tag%', $scope.tag);
            console.log(api);
            $http.jsonp(api).success(function(data) {
                console.log(data.data);
                $scope.images = data.data;
            });

        };

    }]);

app.controller('UserController', ['$scope', '$routeParams', '$http', 'Images', function($scope, $routeParams, $http, Images) {
        $scope.images = Images.entries;


        $scope.someText = $routeParams.id;

        var api = 'https://api.instagram.com/v1/users/%user%/media/recent?access_token=257058201.9af4692.6cf2c3b617d74a07848b198b3227ed05&callback=JSON_CALLBACK';

        api = api.replace('%user%', $routeParams.id);
        console.log(api);

        $http.jsonp(api).success(function(data) {
            console.log(data.data);
            $scope.images = data.data;
        });
        $scope.$watch('images', function() {
            console.log('hey, myVar has changed!');
        });
    }]);

app.factory('Images', function($http) {
    var service = {};
    service.entries = [];
    var api = 'https://api.instagram.com/v1/tags/deftones/media/recent?access_token=257058201.9af4692.6cf2c3b617d74a07848b198b3227ed05&callback=JSON_CALLBACK';
    $http.jsonp(api).success(function(data) {
        console.log(data.data);
        service.entries = data.data;
    });
    return service;

});