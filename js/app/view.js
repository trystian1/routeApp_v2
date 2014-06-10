//view

var routeApp = routeApp || {};

(function() {
 
routeApp.initializeApp = {

  init: function(){
     routeApp.initializeApp.createMap();
     routeApp.initializeApp.getPosition();
  },
  
//Maak de map aan voor de gebruiker
  createMap : function(){   

      routeApp.directionsDisplay = new google.maps.DirectionsRenderer();
      routeApp.directionsService = new google.maps.DirectionsService();

      routeApp.mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(52.25597,4.768396),
            mapTypeId: google.maps.MapTypeId.ROADMAP
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
           routeApp.map.setCenter(routeApp.geolocate);

              
      });


    }

};  

//Maak de markers aan en roep de opties om er op te klikken aan
routeApp.setMarkers = {

      init : function (){
        routeApp.setMarkers.generateMarkers(routeApp.map, routeApp.horeca);
        routeApp.clickOptions.init();
      },

      generateMarkers : function(map, location){
          routeApp.markers_array = [];
        
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
          } 
        }


    };  

routeApp.initializeApp.init();
routeApp.setMarkers.init();

})();


