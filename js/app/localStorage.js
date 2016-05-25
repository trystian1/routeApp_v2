var routeApp = routeApp || {};

(function () {
//Sla items op in localStorage
routeApp.storageItems = {
    init: function(){
    
        this.saveStorage(); 
    
    },
    
    saveStorage : function(){
        
        localStorage.setItem('horeca', JSON.stringify(routeApp.horeca));

    },
    getStorage : function(){
         routeApp.horeca = JSON.parse(localStorage.getItem('horeca'));
        
    },
    saveMarkers : function(){
        
        localStorage.setItem('ownMarkers', JSON.stringify(routeApp.ownMarkers));
    },
    getMarkers : function(){
        
        routeApp.ownMarkerLat = localStorage.getItem('markerLat');
        routeApp.ownMarkerLong = localStorage.getItem('markerLong');
        routeApp.ownMarkers = JSON.parse(localStorage.getItem('ownMarkers'));
        
    }
};
    
})();