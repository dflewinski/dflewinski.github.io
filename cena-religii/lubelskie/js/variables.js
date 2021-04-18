var minZoom = 7;
var maxZoom = 10.5;
var zoomSnap = 0.30;
var zoomDelta = 0.30;
var wheelPxPerZoomLevel = 200;

var hoverStyle = {
    weight: 3,
    color: '#838383',
    dashArray: '',
    fillOpacity: 0.7
};

var STATUS_PALETTE4 = [
    '#9F4439',
    '#FDDCA2',
    '#a0a0a0',
    '#32b13c',
    '#648ed7'
]

// var LEGENDPALETTE8 = [
//     '#53000b',
//     '#761B22',
//     '#9F4439',
//     '#BD6B5C',
//     '#FDDCA2',
//     '#96B59A',
//     '#4E828E',
//     '#075177',
//     '#CBCBCB'
// ]

// var LEGENDPALETTE8 = [
//     '#53000b',
//     '#99000d',
//     '#cb181d',
//     '#ef3b2c',
//     '#fb6a4a',
//     '#fc9272',
//     '#fcbba1',
//     '#fee0d2',
//     '#151212'
// ]

var LEGENDPALETTE8 = [
    '#53000b',
    '#99000d',
    '#cb181d',
    '#ef3b2c',
    '#fb6a4a',
    '#fc9272',
    '#fcbba1',
    '#fee0d2',
    '#a0a0a0'
]

var infoText = {
    title: "Koszty lekcji religii w gminach i miastach województwa lubelskiego",
    content:"Obejmuje głównie szkoły podstawowe i przedszkola. Nie zawiera kosztów ponoszonych przez powiaty (np. większość szkół średnich), jeżeli nie wspomniano inaczej.",
    dataSource:'Dane zebrane przez użytkowników grupy <a href="">Świecka szkoła lubelskie</a> przy użyciu wniosków do lokalnych samorządów o udzielenie informacji publicznej. Jeżeli posiadasz takie i chcesz nimi się podzielić, skontaktuj się z twórcą mapy.'
}

var footerText = {
    datasource:'<a href="">Dane - Świecka szkoła lubelskie</a>',
    separator:' | ',
    creator:'<a href="https://www.facebook.com/profile.php?id=100000663068342">Wizualizacja - DFL</a>'
}