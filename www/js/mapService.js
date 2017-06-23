app.service('mapService', function(){
	
	var map = null;
	var cityCircle = null;
	var data = null;
	var dataMarkerBusstations = [];
	var dataMarkerShops = [];
	var dataMarkerPharmacy = [];
	var routeElements = new Array();
	
	var initMap = function(camp){
		var latLng = null;
		if (camp === null || camp === undefined){
			latLng = new google.maps.LatLng(51.963269, 7.625426);
		}else{
			latLng = new google.maps.LatLng(camp.lat, camp.lng);						
		}

	    var mapOptions = {
	      center: latLng,
	      zoom: 15,
	      mapTypeId: google.maps.MapTypeId.ROADMAP,
	      mapTypeControl: false,
	      streetViewControl: false	      
	    };
	    
    	map = new google.maps.Map(document.getElementById("map"), mapOptions); 	
    	
    	map.addListener('idle', function() {
		   		google.maps.event.trigger(map, 'resize');
		});
		
		var longpress = false;

    	google.maps.event.addListener(map,'click', function (event) {
        	    (longpress) ? setMarkerForRouting(event.latLng) : null;
        });

	    google.maps.event.addListener(map, 'mousedown', function(event){

      	          start = new Date().getTime();           
        });

    	google.maps.event.addListener(map, 'mouseup', function(event){
                end = new Date().getTime();
                    longpress = (end - start < 500) ? false : true;         

        });
    	
    	return map;
 	};
 	
 	var setMarkerForRouting = function(location){	
 		if (routeElements.length < 2){
	 		var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(location.lat(), location.lng()),
			    draggable: true			  	
			});
			routeElements.push(marker);
			for (marker in routeElements){
				routeElements[marker].setMap(map);
			}
			if (routeElements.length == 2) routing();
		}else{
			deleteRoutingElements();
		}
 	};
 	
 	var deleteRoutingElements = function(){
 		for (elem in routeElements){
 			routeElements[elem].setMap(null);
 		}
 		routeElements = new Array();
 	};
 	
 	var routing = function(){
 		var directionsService = new google.maps.DirectionsService();	
		var request = {
		    origin: routeElements[0].position,
		    destination: routeElements[1].position,
		    travelMode: google.maps.TravelMode.WALKING,
		};		
		directionsService.route(request, function(response, status) {
		  if (status == google.maps.DirectionsStatus.OK) {
		    var route = new google.maps.Polyline({path:response.routes[0].overview_path});
		    route.setMap(map);
		    routeElements.push(route);
		  }
		});			
 	};
 	
 	var setCenter = function(camp){
 		map.setCenter(new google.maps.LatLng(camp.lat, camp.lng));
 		map.setZoom(15);
 	};
 	
 	var setCircle = function(camp){
 		  if (cityCircle != null) cityCircle.setMap(null); 
		  cityCircle = new google.maps.Circle({
			  strokeColor: '#FF0000',
			  strokeOpacity: 0.8,
			  strokeWeight: 2,
			  fillColor: '#FF0000',
			  fillOpacity: 0.2,
			  map: map,
			  center: {lat:camp.lat, lng:camp.lng},
			  clickable: false,
			  radius: 2000
    	});
 	};
 	
 	var get = function(){
 		return map;
 	};
 	
 	var clear = function(){
 		if (dataMarkerBusstations.length > 0){
	 		for (point in dataMarkerBusstations){
	 			dataMarkerBusstations[point].setMap(null);
	 		} 			
 		}
 		dataMarkerBusstations = [];
 		
 		if (dataMarkerShops.length > 0){
	 		for (point in dataMarkerShops){
	 			dataMarkerShops[point].setMap(null);
	 		} 			
 		}
 		dataMarkerShops = [];
 		
 		if (dataMarkerPharmacy.length > 0){
	 		for (point in dataMarkerPharmacy){
	 			dataMarkerPharmacy[point].setMap(null);
	 		} 			
 		}
 		dataMarkerPharmacy = []; 		 		

 	};
 	
 	var query = function(type, radius, $scope){	
		latLng = new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng());
		var service = new google.maps.places.PlacesService(map);
		clear();
		service.nearbySearch({
		    location: latLng,
		    radius: radius,
		    types: [type]
		}, callback);

		function callback(results, status) {
		  if (status === google.maps.places.PlacesServiceStatus.OK) {
		    data = results;
		    for (var i = 0; i < results.length; i++) {
		    	createMarker(results[i], type, $scope);
		    }
		  }
		}	
		$scope.hideCheckBox = false;
 	};
 	
	function createMarker(place, type, $scope) {			
		var icon ="";
		switch (type) {
			case "grocery_or_supermarket":
				if (place.name.indexOf('ALDI')>-1){
					    icon = 'img/aldi.png';
				}else if (place.name.indexOf('Lidl')>-1){
					    icon = 'img/lidl.png';
				} else if (place.name.indexOf('Rewe')) {
					    icon = 'img/rewe.png';
				};
				break;
			case "bus_station":
				icon = 'img/busstation.png';
				break;
			case "pharmacy":
				icon = 'img/pharmacy.png';	
			default:
		}
		var placeLoc = place.geometry.location;
		
		var marker = new google.maps.Marker({
		    map: map,
		    icon: icon,
		    position: place.geometry.location,
		    clickable: false		  	
		});
		if (type === "grocery_or_supermarket"){
			dataMarkerShops.push(marker);
			shopManager($scope.shops);			  					
		} else if (type === "bus_station") {
			dataMarkerBusstations.push(marker);
			busManager($scope.busstations);
		} else if (type === "pharmacy") {
			dataMarkerPharmacy.push(marker);
			pharmacyManager($scope.pharmacy);
		}
	};
 	
 	var busManager = function(show){
 		if (!show && dataMarkerBusstations.length > 0){
		 		for (point in dataMarkerBusstations){
		 			dataMarkerBusstations[point].setMap(null);
		 		} 					
 		} else if (show && dataMarkerBusstations.length > 0){
 				for (point in dataMarkerBusstations) {
					dataMarkerBusstations[point].setMap(map);
		    }
 		}
 	};
 	
 	 var shopManager = function(show){
 		if (!show && dataMarkerShops.length > 0){
		 		for (point in dataMarkerShops){
		 			dataMarkerShops[point].setMap(null);
		 		} 					
 		} else if (show && dataMarkerShops.length > 0){
 				for (point in dataMarkerShops) {
					dataMarkerShops[point].setMap(map);
		    }
 		}
 	};
 	
 	var pharmacyManager = function(show){
 		if (!show && dataMarkerPharmacy.length > 0){
		 		for (point in dataMarkerPharmacy){
		 			dataMarkerPharmacy[point].setMap(null);
		 		} 					
 		} else if (show && dataMarkerPharmacy.length > 0){
 				for (point in dataMarkerPharmacy) {
					dataMarkerPharmacy[point].setMap(map);
		    }
 		}
 	};
 	
 	var showCamps = function(camps){
 		for(camp in camps){
 			latLng = new google.maps.LatLng(camps[camp].lat, camps[camp].lng);
			var marker = new google.maps.Marker({
			    position: latLng,
			    map: map,
			    icon:'img/RefugeeCampIcon.png',
			    clickable: false		  	
			});
		}
 	};
 	
 	return {
 		initMap: initMap,
 		setCenter: setCenter,
 		getMap: get,
 		setCircle:setCircle,
 		queryData:query,
 		clearData: clear,
 		manageBusstations: busManager,
 		manageShops: shopManager,
 		managePharmacy: pharmacyManager,
 		showCamps: showCamps 		
 	};
	
});