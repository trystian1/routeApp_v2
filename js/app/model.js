

var routeApp = routeApp || {};

(function() {
  
routeApp.horeca = [
 {
    naam:'Feesterij de Bok', 
    lat: 52.25597,
    longi: 4.768396, 
    z:4, 
    typeHoreca: "bar", 
    description: "De Bok, zoals velen de feesterij noemen, heeft twee ruimtes. Een grote discotheek met twee bars en ruime dansvloer en een gezellig bruin café",
    website: "http//www.feesterijdebok.nl",
    img: 'images/bok.png'


    },

    {
      naam:'Welkom Thuis',
      lat: 52.259621,
      longi: 4.756068,
      z:5,
      typeHoreca: "food",
      description:" Welkom Thuis, de naam zegt het al: het gevoel van thuiskomen en toch in de watten worden gelegd. Goed eten voor een fatsoenlijke prijs en een warme sfeer. Dat is de filosofie van eigenaar Mark Bergsma.",
      website: "http://www.welkomthuisaalsmeer.nl/",
      img: 'images/welkom_thuis.png'

    },

    {
      naam:'Crown',
      lat: 52.268341,
      longi: 4.751108,
      z:3,
      typeHoreca: "cafe",
      description:"Crown, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget quam erat. Vestibulum velit ante, dictum",
      website:"http://www.crowntheateraalsmeer.nl/",
      img: 'images/shadow.png'
    },
    {
      naam: 'Cafe de Praam',
      lat:52.26799,
      longi:4.74759,
      z:6,
      typeHoreca: "bar",
      description:"de praam",
      img: 'images/praam.png'  
    },
    {
      naam: 'Oude Veiling',
      lat:52.26870,
      longi:4.74877,
      z:5,
      typeHoreca: "food",
      description:"Pasta Vino",
      img: 'images/shadow.png'  
    }
];

routeApp.people = {
    url: 'images/people.png',
    size: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 32)
}

})();