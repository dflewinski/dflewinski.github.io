var map = L.map('mapid').setView([ 54.186, 18.031], 8);

map.options.minZoom = 8;
map.options.maxZoom = 11;

L.tileLayer('',{
  attribution: '<a href="https://www.facebook.com/groups/1584850021763935/">Dane uzyskane z grupy - Świecka szkoła Pomorze</a>. <a href="">Wykonał DFL</a> ',
}).addTo(map);

L.geoJson(gminyData).addTo(map);

