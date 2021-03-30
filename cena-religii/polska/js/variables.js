var minZoom = 5.5;
var maxZoom = 9.5;
var zoomSnap = 0.30;
var zoomDelta = 0.30;
var wheelPxPerZoomLevel = 200;

var hoverStyle = {
    weight: 3,
    color: '#838383',
    dashArray: '',
    fillOpacity: 0.7
};

var STATUSPALETTE4 = [
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
    title: "Koszty lekcji religii w jednostkach samorządu terytorialnego",
    content: "Zawiera koszty ponoszone na wynagrodzenia katechetów w placówkach prowadzonych przez samorządy (o ile " +
        "nie wspomniano inaczej). Wartość \"liczba uczniów\" obejmuje uczniów i przedszkolaków uczęszczających do placówek " +
        "prowadzonych przez JST, zadeklarowaną przez MEN (patrz źródła).",
    dataSource:'Jeżeli posiadasz odpowiedzi urzędów i chcesz nimi się podzielić, skontaktuj się z twórcą mapy.'
}

var footerText = {
    datasource:'',
    separator:'',
    creator:'<a href="https://www.facebook.com/profile.php?id=100000663068342">Wizualizacja - DFL</a>'
}