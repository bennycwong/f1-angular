'use strict';

/* Controllers */
angular.module('F1FeederApp.controllers', []).
	/* Drivers controller */
	controller('seasonsController', function($scope, ergastAPIservice) {
		
	  $scope.seasonsList = [];
		
	  ergastAPIservice.getSeasons().success(function (response) {
	      //Digging into the response to get the relevant data
	      $scope.seasonsList = response.MRData.SeasonTable.Seasons;
				console.log($scope);
	  });
	}).

  /* Drivers controller */
  controller('driversController', function($scope, $routeParams, ergastAPIservice) {
	
    $scope.nameFilter = null;
    $scope.driversList = [];
		$scope.season = $routeParams.season;
		$scope.standingsTable = [];
    $scope.searchFilter = function (driver) {
        var re = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || re.test(driver.Driver.givenName) || re.test(driver.Driver.familyName);
    };
    
    ergastAPIservice.getDrivers($scope.season).success(function (response) {
        //Digging into the response to get the relevant data
				
        $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
				$scope.standingsTable = response.MRData.StandingsTable
    });
  }).
	
  /* Driver controller */
  controller('driverController', function($scope, $routeParams, ergastAPIservice) {
		var year = 2014;
    $scope.id = $routeParams.id;
    $scope.races = [];
    $scope.driver = null;
		$scope.season = $routeParams.season;
    ergastAPIservice.getDriverDetails($scope.season, $scope.id).success(function (response) {
        $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]; 
    });

    ergastAPIservice.getDriverRaces($scope.season, $scope.id).success(function (response) {
        $scope.races = response.MRData.RaceTable.Races; 
    }); 
  });