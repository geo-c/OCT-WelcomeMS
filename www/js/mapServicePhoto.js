app.service('mapServicePhoto', function(){
	var map2 = null;
	
	var init = function(origin, destination, photoSeries){
		var latLng = null;
		var	latLng = new google.maps.LatLng(51.963269, 7.625426);
	    
	    var mapOptions = {
	      center: latLng,
	      zoom: 17,
	      mapTypeId: google.maps.MapTypeId.ROADMAP,
	      mapTypeControl: false,
	      streetViewControl: false,
	      draggable: false	      
	    };
	    
    	map2 = new google.maps.Map(document.getElementById("map2"), mapOptions);
		
		map2.addListener('idle', function() {
		   		google.maps.event.trigger(map2, 'resize');
		});
		
    	routing(map2, origin, destination, photoSeries);
    	
    	return map2;
 	};
 	
 	var createWaypoints = function(photoSeries){
 		var waypoints = [];
 		for (photo in photoSeries){
 			waypoints.push({location: new google.maps.LatLng(photoSeries[photo].geometry.coordinates.lat, 
 															photoSeries[photo].geometry.coordinates.lng)});						
 		}	
 		return waypoints;
 	};
 	
 	var routing = function(map2, origin, destination, photoSeries){
 		var directionsService = new google.maps.DirectionsService();	
		var request = {
		    origin: origin.geometry.coordinates,
		    destination: destination.geometry.coordinates,
		    waypoints: createWaypoints(photoSeries),
		    travelMode: google.maps.TravelMode.WALKING,
		};		
		directionsService.route(request, function(response, status) {
		  if (status == google.maps.DirectionsStatus.OK) {
		    var route = new google.maps.Polyline({path:response.routes[0].overview_path});
		    route.setMap(map2);
		  }
		});
		updatePhotoMap(origin.geometry.coordinates, origin.viewDirection);				
 	};
 	
 	var updatePhotoMap = function(coordinates, viewDirection){
 		map2.setCenter(coordinates);
 		updateMarker(coordinates, viewDirection);	
 	};
 	
 	var marker = null;
 	var marker2 = null;
 	var updateMarker = function(coordinates, viewDirection){
 		  	var symbolOne = {
			    path: "M -15 0 q 15 -30 30 0",
			    strokeColor: 'blue',
			    strokeWidth: '5',
			    fillOpacity: 0,
			    rotation: viewDirection
			};
			
			if (marker != null) marker.setMap(null);
			if (marker2 != null) marker2.setMap(null);
			
			marker = new google.maps.Marker({
			    map: map2,
			    position: coordinates,	
			    icon: symbolOne,
			    fillColor: '#5882FA' 	
			}); 
			marker2 = new google.maps.Marker({
		    map: map2,
		    position: coordinates,	
		    icon: {	path: google.maps.SymbolPath.CIRCLE,
		    		scale: 5,
		    		fillOpacity: 1,
		    		strokeColor: 'blue',
		    		fillColor: 'blue'
		    	}	  	
		}); 				
 	};
 	
 	return {
		initMap: init, 	
		updatePhotoMap: updatePhotoMap	
 	};
});