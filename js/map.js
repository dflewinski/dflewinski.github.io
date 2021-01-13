function getColorByStatus(d) {
  return d == 1 ? '#FFEDA0' :
      d == 2 ? '#484040' :
          d == 3 ? '#49914e' :
              '#ff0000';
}

function getColorByPerStudent(d) {
  return d > 800 ? '#9b2d46' :
      d > 700 ? '#ab4e50' :
      d > 600 ? '#d2a78e' :
      d > 500 ? '#E9DAC8' :
      d > 400 ? '#E3E4C6' :
      d > 300 ? '#C6CAA5' :
      d > 200 ? '#8D9764' :
      d > 50 ? '#546323' :
          '#151212';
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display == "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
};

function getDescription(feature) {

  var content = '';
  content += '<h3>' + feature.properties.JPT_NAZWA_ + '</h3>';
  if(feature.properties.price){
    content += '<div>Kwota przeznaczona na lekcje relgii:</div><div class="tooltip">' + parseFloat(feature.properties.price).toLocaleString(undefined,{minimumFractionDigits: 2}) + ' zł</div>';
  }

  if(feature.properties.populate){
    content += '<div>Liczba mieszkańców: ' + parseFloat(feature.properties.populate).toLocaleString(undefined) + '</div>';
  }

  if(feature.properties.students){
    content += '<div>Liczba uczniów: ' + parseFloat(feature.properties.students).toLocaleString(undefined) +  '</div>';
  }

  if(feature.properties.perCitizen){
    content += '<div>Kwota na mieszkańca: ' + parseFloat(feature.properties.perCitizen).toLocaleString(undefined) + ' zł/os</div>';
  }

  if(feature.properties.perStudent){
    content += '<div>Kwota na ucznia: ' + parseFloat(feature.properties.perStudent).toLocaleString(undefined) + ' zł/os</div>';
  }

  if(feature.properties.description){
    content += '<br><div>Uwaga:</div><div class="tooltip">' + feature.properties.description + '</div><br>';
  }

  return content;
}

function getDescriptionPopup(feature){
  var content = '';
  content += getDescription(feature);
  
  if(feature.properties.subvention){
    content += '<div>Kwota subwencji oświatowej: ' + parseFloat(feature.properties.subvention).toLocaleString(undefined) + ' zł</div>';
  }

  if(feature.properties.gminaCost){
    content += '<div>Kwota z samorządu: ' + parseFloat(feature.properties.gminaCost).toLocaleString(undefined) + ' zł</div>';
  }

  if(feature.properties.link.length>0){
    content += '<br><div>Źródła:</div>';
    for (let j = 0; j < feature.properties.link.length; j++) {
      content += '<div class="tooltip"><a href="'+ feature.properties.link[j] + '">'+ feature.properties.link[j] + '</a><div/><br>';
    }
  }

  return content;
}

function style(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: getColorByPerStudent(feature.properties.perStudent)
  };
}

var geojson;

function onEachFeature(feature, layer) {
  layer.bindPopup(getDescriptionPopup(feature));
  layer.bindTooltip(getDescription(feature));

  layer.on('mouseover', function (f, l) {
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });
    if (layer.isPopupOpen()) {
      layer.closeTooltip();
    }
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  });

  layer.on('mouseout', function (f, l) {
    geojson.resetStyle(layer);
  });

  layer.on('click', function (f, l) {
    map.fitBounds(layer.getBounds());
    layer.closeTooltip();
  });
}

geojson = L.geoJson(gminyData, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
      grades = [800, 700, 600, 500, 400, 300, 200, 0],
      labels = ['> 800 zł/os','800 - 700 zł/os','700 - 600 zł/os','600 - 500 zł/os','500 - 400 zł/os','400 - 300 zł/os','< 200 zł/os','Brak danych'];

  div.innerHTML += '<div><b>Roczny koszt na jednego ucznia</b></div><br>'

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
        '<i style="background:' + getColorByPerStudent(grades[i]) + '"></i> ' +
        labels[i] + '<br>';
  }
  return div;
};

legend.addTo(map);

var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div.innerHTML = '<h4>Koszty lekcji religii w jednostkach samorządowych województwa pomorskiego</h4>'+
  '<p>Dane zebrane przez użytkowników grupy <a href="https://www.facebook.com/groups/1584850021763935/">Świecka szkoła Pomorze</a> za pomocą wniosków do lokalnych samorządów o udzielenie informacji publicznej.</p>'
};

info.addTo(map);

