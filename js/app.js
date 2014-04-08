'use strict';


// Declare app level module which depends on filters, and services
angular.module('F1FeederApp', [
  'F1FeederApp.services',
  'F1FeederApp.controllers',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/:season/drivers", {templateUrl: "partials/drivers.html", controller: "driversController"}).
	when("/:season/drivers/:id", {templateUrl: "partials/driver.html", controller: "driverController"}).

	// when("/", {templateUrl: "partials/seasons.html", controller: "seasonsController"}).
	otherwise({redirectTo: '/2014/drivers'});
}]);