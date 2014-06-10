var routeApp = routeApp || {};


(function() {

routeApp.routeToMarker = {
//neem de route van de gebruiker naar de marker
  calcRouteToMarker : function() {
      console.log(routeApp.geolocate);
      if(!routeApp.geolocate){
        alert("Geef toestemming om huidige locatie te gebruiken");
      }else{
      routeApp.start = routeApp.geolocate;
      routeApp.end = routeApp.marker.position;
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
        
        routeApp.clickOptions.closeClick();
        routeApp.clickOptions.createButtons();
        routeApp.clickOptions.toAalsmeer();
        routeApp.clickOptions.closeMenu();
      
    },
    
//Hier worden de knoppen gemaakt om door de markers te filteren
    createButtons : function(){
    
    
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
   },

   //Klik op een marker op het scherm
   markerClick : function(){
     
      google.maps.event.addListener(routeApp.marker, 'click', function() {
     
        document.getElementById('info').style.display='block';
        document.getElementById('name').innerHTML = this.title;
        document.getElementById('horecatype').innerHTML =  this.horecaType;
        document.getElementById('description').innerHTML =  this.description;
        document.getElementById('route_knop').innerHTML = "route";
        

        //Roep de functie aan om de route naar de marker te krijgen
        routeApp.routeButton = document.getElementById('route_knop');
        routeApp.routeButton.addEventListener("click", function(e){
          routeApp.routeToMarker.calcRouteToMarker();
          },false);

        

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
        var center_aalsmeer = new google.maps.LatLng(52.268341,4.751108);
        
         routeApp.map.panTo(center_aalsmeer);

       });


    },
    //Krijg de html van de knop via clickedItem, en filter de markers op basis van de hmtl

    filterMarkers : function(){

      for (var i = 0; i < routeApp.markers_array.length; i++){
      
        if(routeApp.markers_array[i].horecaType != routeApp.clickedItem){
            routeApp.markers_array[i].setMap(null);
        }else{
          routeApp.markers_array[i].setMap(routeApp.map);
        }if(routeApp.clickedItem == "alles"){
            routeApp.markers_array[i].setMap(routeApp.map);
        }

      }

    },
    
};
    
})();
