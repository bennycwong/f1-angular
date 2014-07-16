'use strict';

/* Controllers */
angular.module('F1FeederApp.controllers', []).
	/* Seasons controller */
	controller('seasonsController', function($scope, ergastAPIservice, $location, $route, $routeParams) {
    // console.log($location.path().replace('/drivers','').replace('/races','').replace('/constructors','').replace('/',''))
    $scope.selectedSeason = $location.path().replace('/drivers','').replace('/races','').replace('/constructors','').replace('/','');
    $scope.seasonsList = [];
	  ergastAPIservice.getSeasons().success(function (response) {
	      //Digging into the response to get the relevant data
	      $scope.seasonsList = response.MRData.SeasonTable.Seasons;
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
				$scope.standingsTable = response.MRData.StandingsTable;
    });
  }).

  /* Races controller */
  controller('racesController', function($scope, $routeParams, ergastAPIservice) {

    $scope.nameFilter = null;
    $scope.racesList = [];
    $scope.season = $routeParams.season;
    $scope.raceTable = [];
    $scope.searchFilter = function (race) {
        var re = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || re.test(race.Races.raceName) || re.test(race.Race.raceName);
    };
    
    ergastAPIservice.getRaces($scope.season).success(function (response) {
        //Digging into the response to get the relevant data
        $scope.racesList = response.MRData.RaceTable.Races;
        $scope.raceTable = response.MRData.RaceTable;
    });
  }).

  /* Constructors controller */
  controller('constructorsController', function($scope, $routeParams, ergastAPIservice) {

    $scope.nameFilter = null;
    $scope.constructorsList = [];
    $scope.season = $routeParams.season;
    $scope.standingsTable = [];
    $scope.searchFilter = function (constructor) {
        var re = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || re.test(constructor.Constructors.name) || re.test(constructor.Constructors.name);
    };
    
    ergastAPIservice.getConstructors($scope.season).success(function (response) {
        //Digging into the response to get the relevant data
        
        $scope.constructorsList = response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        $scope.standingsTable = response.MRData.StandingsTable;
        console.log($scope.constructorsList)
        // console.log($scope.constructorsTable);
    });
  }).
	
  /* Driver controller */
  controller('driverController', function($scope, $routeParams, ergastAPIservice) {

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
  }).

    /* Constructor controller */
  controller('constructorController', function($scope, $routeParams, ergastAPIservice) {
    $scope.id = $routeParams.id;
    $scope.driverTable = [];
    $scope.constructorInfo = [];
    $scope.season = $routeParams.season;

    ergastAPIservice.getConstructorInfo($scope.season, $scope.id).success(function (response) {
      
      $scope.constructorInfo = response.MRData.ConstructorTable;
      console.log($scope.constructorInfo)
    });
    ergastAPIservice.getDriversOfConstructors($scope.season, $scope.id).success(function (response) {
      $scope.driverTable = response.MRData.DriverTable
    });

  }).

    /* Race controller */
  controller('raceController', function($scope, $routeParams, ergastAPIservice) {
    $scope.id = $routeParams.id;
    $scope.race = null;
    $scope.season = $routeParams.season;
    $scope.raceResult = [];

    ergastAPIservice.getRace($scope.season, $scope.id).success(function (response) {
        $scope.race = response.MRData.RaceTable.Races[0];

    });

   
  });