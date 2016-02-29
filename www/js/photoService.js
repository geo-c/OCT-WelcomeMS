app.service('photoService', function(){
	var photos = [
		{
			id: '0',
			type: 'Feature',
			geometry:{
				type:'point',
				coordinates: {
					lat: 51.956186, 
					lng: 7.633506
				}
			},
			viewDirection:100	
		},
		{
			id: '1',
			type: 'Feature',
			geometry:{
				type:'point',
				coordinates: {
					lat: 51.955875, 
					lng: 7.637247
				}
			},
			viewDirection:350
		},
		{
			id: '2',
			type: 'Feature',
			geometry:{
				type:'point',
				coordinates: {
					lat: 51.958461,  
					lng: 7.638186
				}
			},
			viewDirection:120
		},
		{
			id: '3',
			type: 'Feature',
			geometry:{
				type:'point',
				coordinates: {
					lat: 51.957708,  
					lng: 7.640013
				}
			},
			viewDirection:120
		},
		{
			id: '4',
			type: 'Feature',
			geometry:{
				type:'point',
				coordinates: {
					lat: 51.959035,  
					lng: 7.647330
				}
			},
			viewDirection:95
		},
		{
			id: '5',
			type: 'Feature',
			geometry:{
				type:'point',
				coordinates: {
					lat: 51.959817,  
					lng: 7.648559
				}
			},
			viewDirection:350
		},										
	];
	
	var get = function(){
		return photos;
	};
	
	var getPhotoById = function(id){
		for (photo in photos){
			if (photos[photo].id == id)
				return photos[photo];
		}
	};
	
	return {
		getCamps: get,
		getPhotoById: getPhotoById
	};
});