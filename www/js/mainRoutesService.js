app.service('mainRoutesService', function(){
	var mainRoutes = [
		{
			id: 1,
			destination: 'Franziskus Hospital',
			icon: 'img/franziskus.jpg',
			series: [0,1,2,3,4,5],
		},
		{
			id: 2,
			destination: 'Main Station',
			icon: 'img/hbf.png',
			series: [0,1,2,3,4,5],
		},
		{
			id: 3,
			destination: 'Agentur für Arbeit',
			icon: 'img/afa.png',
			series: [5,4,3,2,1,0],
		},
		{
			id: 4,
			destination: 'Clemens Hospital',
			icon: 'img/clemens.png',
			series: [0,1,2,3,4,5],
		}		
	];
	
	var get = function(){
		return mainRoutes;
	};
	
	var findEntry = function(searchedID){
		for (route in mainRoutes){
			if (mainRoutes[route].id == searchedID){
				return mainRoutes[route];
			}
		}
		return null;
	};
	
	return {
		getMainRoutes: get,
		getEntryById: findEntry
	}; 	
});