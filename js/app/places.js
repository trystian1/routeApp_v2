var routeApp = routeApp || {};

(function () {
    
    routeApp.places = {
       
        init :  function(){
          this.requestPlaces();
          
        },
        
        requestPlaces : function(){
            routeApp.places.clearMarker();
            
            routeApp.requestedLocation = routeApp.geolocate;
            
            routeApp.type = document.getElementById('gmap_type').value;
            console.log(routeApp.type);
            routeApp.request = {    
                location : routeApp.requestedLocation,
                radius : 3000,
                types : [routeApp.type]
            }
            routeApp.service = new google.maps.places.PlacesService(routeApp.map);  
            routeApp.service.nearbySearch(routeApp.request, routeApp.places.callback);
            
            
            
        },
        callback : function(results, status){
        
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
         
                routeApp.places.createMarkers(results[i]);
            
            }
      
            
        }
            
        }, 
        
        createMarkers : function(place){
            
            routeApp.placeLocation = place.geometry.location;
            routeApp.nearbyMarker = new google.maps.Marker({
                map : routeApp.map,
                position : routeApp.placeLocation,
                name : place.name
               
        });
        
            routeApp.infowindow = new google.maps.InfoWindow({
               content : routeApp.nearbyMarker.name
            
            });
            routeApp.infowindow.open(routeApp.nearbyMarker.get('map'), routeApp.nearbyMarker);
            
            routeApp.markers_array.push(routeApp.nearbyMarker);
            routeApp.clickOptions.nearbyMarkerClick(); 
            routeApp.markersNearby.push(routeApp.nearbyMarker);
           
        },
        clearMarker : function(){
            for(var i = 0; i < routeApp.markersNearby.length; i++){
                
                 routeApp.markersNearby[i].setMap(null);
            }
        }
    };

})();