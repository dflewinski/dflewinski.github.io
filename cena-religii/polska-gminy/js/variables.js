var minZoom = 5.5;
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

var BORDER_COLOR = [
    '#606060',
    '#919191'
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
    title: "Koszty lekcji religii w gminach i miastach na prawach powiatu.",
    content:"Obejmuje szkoły i przedszkola dla których organem prowadzącym jest jednostka samorządu terytorialnego na rok szkolny 2019-2020 (o ile nie wspomniano inaczej).",
    dataSource:'Jeżeli posiadasz odpowiedzi urzędów i chcesz nimi się podzielić, skontaktuj się z twórcą mapy.'
}

var footerText = {
    datasource:'',
    separator:'',
    creator:'<a href="https://www.facebook.com/profile.php?id=100000663068342">Wizualizacja - DFL</a>'
}