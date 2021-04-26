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
    title: "Koszty lekcji religii w gminach i miastach województwa warmińsko-mazurskiego",
    content:"Obejmuje szkoły i przedszkola dla których organem prowadzącym jest jednostka samorządu terytorialnego na rok szkolny 2019-2020 (o ile nie wspomniano inaczej).",
    dataSource:'Dane zebrane przez użytkowników grupy <a href="https://www.facebook.com/groups/444041633430048/">Świecka szkoła Warmińsko-Mazurskie</a> przy użyciu wniosków do lokalnych samorządów o udzielenie informacji publicznej. Jeżeli posiadasz takie i chcesz nimi się podzielić, skontaktuj się z twórcą mapy.'
}

var footerText = {
    datasource:'<a href="https://www.facebook.com/groups/444041633430048/">Dane - Świecka szkoła Warmińsko-Mazurskie</a>',
    separator:' | ',
    creator:'<a href="https://www.facebook.com/profile.php?id=100000663068342">Wizualizacja - DFL</a>'
}