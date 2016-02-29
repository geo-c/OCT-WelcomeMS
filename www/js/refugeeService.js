app.service('refugeeService', function(){
	var camps = [
		{
			name: 'Roxeler Str. 340',
			lat: 51.961291, 
			lng: 7.576731	
		},
		{
			name: 'York Kaserne',
			lat: 51.926722, 
			lng: 7.668543	
		},
		{
			name: 'Handorf Kaserne',
			lat: 52.002114,  
			lng: 7.721634	
		},
		{
			name: 'Kirschgarten',
			lat: 51.988192, 
			lng: 7.704767	
		},			
		{
			name: 'Mariendorfer Str.',
			lat: 51.988538,  
			lng: 7.673918	
		},	
		{
			name: 'Warendorfer Str.',
			lat: 51.974389,  
			lng: 7.699354	
		},
		{
			name: 'Gutenberg Str.',
			lat: 51.959737,  
			lng: 7.645669	
		}									
	];
	
	var get = function(){
		return camps;
	};
	
	return {
		getCamps: get
	}; 
});