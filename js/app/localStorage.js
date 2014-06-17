var routeApp = routeApp || {};

(function () {

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
       // console.log('OWNMARKERS222222', JSON.parse(localStorage.getItem('ownMarkers')));

    },
    getMarkers : function(){
        
        routeApp.ownMarkerLat = localStorage.getItem('markerLat');
        routeApp.ownMarkerLong = localStorage.getItem('markerLong');
        routeApp.ownMarkers = JSON.parse(localStorage.getItem('ownMarkers'));
        
    }
    

};
    
})();