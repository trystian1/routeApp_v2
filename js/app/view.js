//view

var routeApp = routeApp || {};

(function() {
 
routeApp.initializeApp = {

  init: function(){
     this.createMap();
     this.getPosition();
     //localStorage.clear();
     
    
  },
  
//Maak de map aan voor de gebruiker
  createMap : function(){   
      routeApp.markersNearby = [];
      routeApp.directionsDisplay = new google.maps.DirectionsRenderer();
      routeApp.directionsService = new google.maps.DirectionsService();
      
      routeApp.mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(52.25597,4.768396),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
      }

      routeApp.map = new google.maps.Map(document.getElementById("map-canvas"),
                                  routeApp.mapOptions);

      routeApp.directionsDisplay.setMap(routeApp.map);
      routeApp.directionsDisplay.setOptions( { suppressMarkers: true } );
      
   },

   //krijg de locatie van de gebruiker, als hier toestemming voor gegeven is.
   getPosition : function(){
      
      routeApp.geolocate;
      navigator.geolocation.getCurrentPosition(function(position) {
      
      routeApp.geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              
          routeApp.positionMarker = new google.maps.Marker({
                       map: routeApp.map,
                       position: routeApp.geolocate,
                       icon: routeApp.people
                  
           });
          
         routeApp.places.init();
         routeApp.map.setCenter(routeApp.geolocate);
              
      });
        routeApp.center_aalsmeer = new google.maps.LatLng(52.268341,4.751108);
      

    }

};  

//Maak de markers aan en roep de opties om er op te klikken aan
routeApp.setMarkers = {

      init : function (){
        this.generateMarkers(routeApp.map, routeApp.horeca);
        routeApp.clickOptions.init();
          
      },

      generateMarkers : function(map, location){
          routeApp.markers_array = [];
          if (localStorage.getItem("horeca") !== null) {
                routeApp.storageItems.getStorage();
          }
         routeApp.ownMarkers = [];   
         
          if (localStorage.getItem("ownMarkers") !== null) {
             
             routeApp.storageItems.getMarkers();
             routeApp.setMarkers.storageMarkers();
            
         }
        
          
          for (var i = 0; i <= routeApp.horeca.length - 1; i++){
               routeApp.horecas = routeApp.horeca[i];
             
           
               console.log(routeApp.horecas);
               routeApp.myLatLng = new google.maps.LatLng(routeApp.horecas.lat, routeApp.horecas.longi);
               

               routeApp.marker = new google.maps.Marker({
                      position: routeApp.myLatLng,
                      map: routeApp.map,
                      shadow: routeApp.horecas.shadow,
                      icon: routeApp.horecas.img,
                      title: routeApp.horecas.naam,
                      zIndex: routeApp.horecas.z,
                      horecaType: routeApp.horecas.typeHoreca,
                      description: routeApp.horecas.description,
            });
              routeApp.markers_array.push(routeApp.marker);  
              routeApp.clickOptions.markerClick();
              routeApp.storageItems.init();
              //routeApp.storageItems.saveMarkers();
              
          } 
        },
    
        placeMarker : function(location) {
        
            routeApp.storageMarker = new google.maps.Marker({
                position: location,
                map: routeApp.map,
                description : routeApp.ownDescription,
                horecaType : routeApp.selectedValue,
                draggable : true
                
            });
            routeApp.clickOptions.ownMarkerClick(); 
            routeApp.infowindow = new google.maps.InfoWindow({
                content : routeApp.ownDescription
            
            });
            routeApp.infowindow.open(routeApp.storageMarker.get('map'), routeApp.storageMarker);
            

            routeApp.markers_array.push(routeApp.ownMarker);
           // console.log('ownMaerk', routeApp.ownMarker);
            routeApp.storageObject = {
                position : routeApp.storageMarker.position,
                description : routeApp.storageMarker.description,
                horecaType : routeApp.storageMarker.horecaType
            }
            //console.log("storageObjec", routeApp.storageObject);
            
            routeApp.ownMarkers.push(routeApp.storageObject);
            //console.log("OWNMARKERSFDMSFAMD", routeApp.ownMarkers);
            routeApp.storageItems.saveMarkers();

            
        },
    
        storageMarkers : function(){
            
            for (var i = 0; i <= routeApp.ownMarkers.length - 1; i++){
             routeApp.localMarkers = routeApp.ownMarkers[i]
            
                
            routeApp.storageLatLng = new google.maps.LatLng(routeApp.localMarkers.position.k, routeApp.localMarkers.position.A); 
            
            routeApp.storageMarker = new google.maps.Marker({
                    position: routeApp.storageLatLng,
                    map: routeApp.map,
                    description : routeApp.localMarkers.description,
                    horecaType : routeApp.localMarkers.horecaType,
                    draggable : true
                });
               routeApp.clickOptions.ownMarkerClick(); 
               routeApp.markers_array.push(routeApp.storageMarker);
               
               routeApp.infowindow = new google.maps.InfoWindow({
                    content : routeApp.storageMarker.description
            
                });
                routeApp.infowindow.open(routeApp.storageMarker.get('map'), routeApp.storageMarker);
            
            
            }


        
        }

        
};  

routeApp.initializeApp.init();
//routeApp.places.init();
routeApp.setMarkers.init();

})();


