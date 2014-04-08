'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('F1FeederApp.services', [])
  .factory('ergastAPIservice', function($http) {

    var ergastAPI = {};
    ergastAPI.getSeasons = function() {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/seasons.json?callback=JSON_CALLBACK&limit=100&offset=0'
      });
    }
		
    ergastAPI.getDrivers = function(season) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/' + season + '/driverStandings.json?callback=JSON_CALLBACK'
      });
    }

    ergastAPI.getDriverDetails = function(season, id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/' + season + '/drivers/'+ id +'/driverStandings.json?callback=JSON_CALLBACK'
      });
    }

    ergastAPI.getDriverRaces = function(season, id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/'+ season + '/drivers/'+ id +'/results.json?callback=JSON_CALLBACK'
      });
    }

    return ergastAPI;
  });