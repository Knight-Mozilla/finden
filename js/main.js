$(function(){

  //no retweets
  //time scale
  //galery of images and video from the tweet
  //have a heat map and then 
  //integrate twitters user's lists
  //cross referencing 
  var map = new L.Map('map');
  
  var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/3a83164a47874169be4cabc2e8b8c449/43782/256/{z}/{x}/{y}.png', cloudmadeAttribution = '', cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttribution});
  
  if (Modernizr.geolocation) {
  
    navigator.geolocation.getCurrentPosition(show_map);
    
  } else {
  
    alert('your browser does not support geolocation')
    
  }
  
  function show_map( location ){
  
    console.log( location )
  
  }
	
	map.setView( new L.LatLng( 51.505, -0.09 ), 13 ).addLayer( cloudmade );
	
	var circleLocation = new L.LatLng(51.508, -0.11),
		circleOptions = {color: '#f03', opacity: 0.7, weight:1},
		circle = new L.Circle(circleLocation, 500, circleOptions);
	
	circle.bindPopup("I am a circle.");
	
	map.addLayer(circle);
	
	map.on('click', onMapClick);
			
	function onMapClick(e) {
	  
	  
	   
	  /*
	    the following is busted because dwix sends band the wrong headers
	    
	    response header is text / html
	    i expect application / javascript
	    bug filed at http://bit.ly/quGNx6
	  
	  $.getJSON('http://geoapi.fwix.com/content.json?api_key=1640a4cf9096&content_types=status_updates&lat=' + e.latlng.lat.toFixed(3) + '&lng=' + e.latlng.lng.toFixed(3) + '&radius=100&callback=?', function (data) {
	  
	     console.log( data.status_updates )
	  
	   });*/
	  
	  
	  
		var latlngStr = '(' + e.latlng.lat.toFixed(3) + ', ' + e.latlng.lng.toFixed(3) + ')';
		circle.setLatLng( e.latlng )
		
		$.getJSON('http://search.twitter.com/search.json?geocode=' + e.latlng.lat.toFixed(3) + ',' + e.latlng.lng.toFixed(3) + ',.25km&&rpp=100&callback=?', function (data) {
		
	    $('#results').empty();
	    
	    $.each(data.results, function(i, t){
	    
	        if(t.geo){
	          
	          var lat = t.geo.coordinates[0], lng = t.geo.coordinates[1];
	          var marker = new L.Marker(new L.LatLng(lat, lng));
            map.addLayer(marker);
	            
	        }
	        
	        $('#results').append('<div style="padding: 5px;"><span><img src="' + t.profile_image_url + '" /></span><span style="vertical-align:top;">' + t.text + ' <br />'+ t.created_at +'</span></div')
	    
	    })
	
		})
		
	}

})