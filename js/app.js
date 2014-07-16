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
	when("/:season/races", {templateUrl: "partials/races.html", controller: "racesController"}).
	when("/:season/constructors", {templateUrl: "partials/constructors.html", controller: "constructorsController"}).
	when("/:season/drivers/:id", {templateUrl: "partials/driver.html", controller: "driverController"}).
	when("/:season/races/:id", {templateUrl: "partials/race.html", controller: "raceController"}).
	when("/:season/constructor/:id", {templateUrl: "partials/constructor.html", controller: "constructorController"}).
	// when("/", {templateUrl: "partials/seasons.html", controller: "seasonsController"}).
	otherwise({redirectTo: '/2014/drivers'});
}]);