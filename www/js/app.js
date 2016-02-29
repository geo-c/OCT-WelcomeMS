
var app = angular.module('starter', ['ionic']);
 
app.config(function($stateProvider, $urlRouterProvider) {
 
  $stateProvider
  .state('map', {
    url: '/map',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl'
  })  
  .state('list', {
    url: '/list',
    templateUrl: 'templates/list.html',
    controller: 'ListController'
  }) 
  .state('#', {
    url: '/',
    templateUrl: 'templates/index.html'
  })   
  .state('photos', {
    url: '/photos/:id',
    templateUrl: 'templates/photos.html', 
    controller: 'PhotoController'
  });
  $urlRouterProvider.otherwise("/");
});

app.controller('MainController', function($scope){
	$scope.$on('$locationChangeSuccess',function(newUrl, oldUrl){
		document.addEventListener("deviceready", onDeviceReady, false);
		function onDeviceReady(){
			if (oldUrl.indexOf('/photos/') > -1){
				screen.lockOrientation('landscape');
			}else{
				screen.unlockOrientation();	
			}
		}	
	});
});

app.controller('PhotoController', function($scope, $stateParams, mainRoutesService, mapServicePhoto, photoService){
	$scope.selectedDestination = mainRoutesService.getEntryById($stateParams.id); 
	$scope.origin = photoService.getPhotoById($scope.selectedDestination.series[0]);
	$scope.destination = photoService.getPhotoById($scope.selectedDestination.series[$scope.selectedDestination.series.length-1]);
	
	$scope.photoSeries = new Array();
	for (photo in $scope.selectedDestination.series){
			$scope.photoSeries.push(photoService.getPhotoById($scope.selectedDestination.series[photo]));
	}
	mapServicePhoto.initMap($scope.origin, $scope.destination, $scope.photoSeries);
	
	var swiper = null;
	//http://idangero.us/swiper/api/#.VtAWQ_nhBhH
	swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        //direction: 'vertical',         
        observer:true,      
    });
    //Bad hack :(
    if (swiper instanceof(Array)){
    	location.reload();
    }
    
    swiper.on('onSlideChangeEnd', function(swiper){
		var currentPhoto = photoService.getPhotoById($scope.selectedDestination.series[swiper.snapIndex]);
		mapServicePhoto.updatePhotoMap(new google.maps.LatLng(currentPhoto.geometry.coordinates.lat,
												currentPhoto.geometry.coordinates.lng), currentPhoto.viewDirection);
    });
});

app.controller('ListController', function($scope, mainRoutesService){
	$scope.routes = mainRoutesService.getMainRoutes();
});

app.controller('dropdown', function($scope, refugeeService, mapService){
	$scope.hideCheckBox = true;
	$scope.camps = refugeeService.getCamps();
	$scope.selectedCamp = null;
	$scope.updateMap = function(){
		mapService.setCenter($scope.selectedCamp);
		mapService.setCircle($scope.selectedCamp);
		mapService.clearData();
		mapService.queryData('bus_station', 1500, $scope); //see google maps places library for tags.
		mapService.queryData('grocery_or_supermarket', 1500, $scope);
		mapService.queryData('pharmacy', 1500, $scope);
	};
});

app.controller('GeolocalizationController', function($scope, mapService){
	$scope.localize = function(){
		navigator.geolocation.getCurrentPosition(function(position){
			mapService.getMap().setCenter(new google.maps.LatLng(position.coords.latitude,
												position.coords.longitude));
		});
	};
});

app.controller('MapCtrl', function($scope, mapService, refugeeService) {
	mapService.initMap($scope.selectedCamp);
	mapService.showCamps(refugeeService.getCamps());
	$scope.busstations = true;
	$scope.shops = true;
	$scope.pharmacy = true;
	$scope.busCheck= function() {
		$scope.busstations = !$scope.busstations;
		mapService.manageBusstations($scope.busstations);
	};
	$scope.shopsCheck= function() {
		$scope.shops = !$scope.shops;
		mapService.manageShops($scope.shops);
	};	
	$scope.pharmacyCheck= function() {
		$scope.pharmacy = !$scope.pharmacy;
		mapService.managePharmacy($scope.pharmacy);
	};	
});



