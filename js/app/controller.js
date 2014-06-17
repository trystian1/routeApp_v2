var routeApp = routeApp || {};

(function () {

routeApp.routeToMarker = {
//neem de route van de gebruiker naar de marker
  calcRouteToMarker : function() {
      //console.log(routeApp.geolocate);
      if(!routeApp.geolocate){
        alert("Geef toestemming om huidige locatie te gebruiken");
      }else{
      //console.log("endMarkerZZZZ", routeApp.endMarker);
      routeApp.start = routeApp.geolocate;
      routeApp.end = routeApp.endMarker;
      //routeApp.end = routeApp.endMarker;
      //routeApp.end = this;
      routeApp.request = {
              origin: routeApp.start,
              destination: routeApp.end,
              travelMode: google.maps.DirectionsTravelMode.BICYCLING
      };

      routeApp.directionsService.route(routeApp.request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
                routeApp.directionsDisplay.setDirections(response);
        }
      });

    }
    }  

};

//Opties om te klikken op bepaalde objecten op het scherm
routeApp.clickOptions = {
    
    init : function(){
        
        this.closeClick();
        this.createButtons();
        this.toAalsmeer();
        this.closeMenu();
        this.mapClick();
        
      
    },
    
//Hier worden de knoppen gemaakt om door de markers te filteren
    createButtons : function(){
    routeApp.typeSelector =  document.getElementById('gmap_type');   
   // routeApp.type = document.getElementById('gmap_type').value;
   // routeApp.typeSelector

    
    routeApp.select = document.getElementsByClassName('selectie_button')
    for (var i=0;i<routeApp.select.length;i++){
        //addEvent(routeApp.select[i], 'click', routeApp.clickOptions.filterMarkers);
       // console.log('aaa', routeApp.select[i]);
        routeApp.select[i].addEventListener("click", function(e){
          routeApp.clickedItem = e.target.innerHTML;
            routeApp.clickOptions.filterMarkers();
            console.log(e.target.innerHTML);
             
             console.log();
        },false);
    }
    routeApp.createMarker = false;
        
    routeApp.createMarkerButton = document.getElementById('toevoegen_button');
    routeApp.createMarkerButton.addEventListener("click", function(){
        if(routeApp.createMarker){
            routeApp.createMarker = false;
            routeApp.createMarkerButton.style.backgroundColor='#2c3e50';
        }else{
          routeApp.createMarker = true; 
            routeApp.createMarkerButton.style.backgroundColor='#e74c3c';
        }
    },false);
   },

   //Klik op een marker op het scherm
   markerClick : function(){
     
      google.maps.event.addListener(routeApp.marker, 'click', function() {
     
        document.getElementById('info').style.display='block';
        document.getElementById('name').innerHTML = this.title;
        document.getElementById('horecatype').innerHTML =  this.horecaType;
        document.getElementById('description').innerHTML =  this.description;
        document.getElementById('route_knop').innerHTML = "route";
        
        routeApp.endMarker = routeApp.marker.position;
        //Roep de functie aan om de route naar de marker te krijgen
        routeApp.routeButton = document.getElementById('route_knop');
        //routeApp.endMarker = routeApp.marker.position;
        routeApp.routeButton.addEventListener("click", function(e){
          
          
          routeApp.routeToMarker.calcRouteToMarker();
          },false);

        

      });



    },
    ownMarkerClick : function(){
        google.maps.event.addListener(routeApp.storageMarker, 'click', function() {
     
        document.getElementById('info').style.display='block';
        //document.getElementById('name').innerHTML = this.title;
        document.getElementById('horecatype').innerHTML =  this.horecaType;
        document.getElementById('description').innerHTML =  this.description;
        document.getElementById('route_knop').innerHTML = "route";
        
         routeApp.endMarker = routeApp.storageMarker.position;
        //Roep de functie aan om de route naar de marker te krijgen
        routeApp.routeButton = document.getElementById('route_knop');
        routeApp.routeButton.addEventListener("click", function(e){
          routeApp.routeToMarker.calcRouteToMarker();
          },false);

        

      });
    },
    nearbyMarkerClick : function(){
       google.maps.event.addListener(routeApp.nearbyMarker, 'click', function() {
            document.getElementById('info').style.display='block';
           
           document.getElementById('description').innerHTML =  this.name;
           
       });
            routeApp.endMarker = routeApp.storageMarker.position;
        //Roep de functie aan om de route naar de marker te krijgen
            routeApp.routeButton = document.getElementById('route_knop');
            routeApp.routeButton.addEventListener("click", function(e){
            routeApp.routeToMarker.calcRouteToMarker();
        },false);
        
    },
    mapClick : function(){
        google.maps.event.addListener(routeApp.map, "click", function(event){                            
            routeApp.ownDescription = document.getElementById("input_description").value;
            routeApp.selects = document.getElementById("soort_plaats");
            routeApp.selectedValue = routeApp.selects.options[routeApp.selects.selectedIndex].value;
            
            if(routeApp.createMarker){
                
                routeApp.setMarkers.placeMarker(event.latLng);
            }
        
        
        });
          
    },
    //Sluit het informatie block
    closeClick : function(){
        routeApp.close = document.getElementById('close');
        routeApp.close.addEventListener("click", function(e){
              document.getElementById('info').style.display='none';
        },false);

    },

    //sluit het Menu waar gefilterd kan worden door de markers
    closeMenu : function(){

    routeApp.categorie_knop = document.getElementById('categorie');
    routeApp.menu = document.getElementById('menu');

    routeApp.menu.addEventListener("click", function(e){
          //show_categories();
        if(routeApp.categorie_knop.style.display == "block"){
          routeApp.categorie_knop.style.display = "none";
        }else{
          routeApp.categorie_knop.style.display = "block";
        }
      },false);


    },
    //Ga naar Aalsmeer functie, beweegt het scherm richting aalsmeer
    toAalsmeer : function(){

    routeApp.aalsmeerButton = document.getElementById('button_aalsmeer');   

    routeApp.aalsmeerButton.addEventListener("click",function(e){
        
        routeApp.map.panTo(routeApp.center_aalsmeer);

       });


    },
    //Krijg de html van de knop via clickedItem, en filter de markers op basis van de hmtl

    filterMarkers : function(){
    if(routeApp.geolocate){
     
        routeApp.places.requestPlaces();
        
    }
      for (var i = 0; i < routeApp.markers_array.length; i++){
          
        routeApp.type = routeApp.typeSelector.value;
        
        if(routeApp.markers_array[i].horecaType != routeApp.type){
            routeApp.markers_array[i].setMap(null);
        }else{
          routeApp.markers_array[i].setMap(routeApp.map);
        }if(routeApp.type == "alles"){
            routeApp.markers_array[i].setMap(routeApp.map);
        }

      }

    },
    
    
    
};
})();
