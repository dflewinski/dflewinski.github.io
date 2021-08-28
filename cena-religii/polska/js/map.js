var map = L.map('mapid', {
    renderer: L.canvas(
        {padding: 0.4}
    )
}).setView([54.186, 18.031], 7);

map.options.minZoom = minZoom;
map.options.maxZoom = maxZoom;
map.options.zoomSnap = zoomSnap;
map.options.zoomDelta = zoomDelta;
map.options.wheelPxPerZoomLevel = wheelPxPerZoomLevel;

var GMINA_STATUS = L.geoJson(gminy, {style: styleStatus, onEachFeature: onEachFeature});
var GMINA_COST = L.geoJson(gminy, {style: styleCost, onEachFeature: onEachFeature}).addTo(map);
var GMINA_PER_CITIZEN = L.geoJson(gminy, {style: stylePerCitizen, onEachFeature: onEachFeature});
var GMINA_PER_STUDENT = L.geoJson(gminy, {style: stylePerStudent, onEachFeature: onEachFeature});

var POWIAT_STATUS = L.geoJson(powiaty, {style: styleStatus, onEachFeature: onEachFeature});
var POWIAT_COST = L.geoJson(powiaty, {style: styleCost, onEachFeature: onEachFeature});
var POWIAT_PER_STUDENT = L.geoJson(powiaty, {style: stylePerStudent, onEachFeature: onEachFeature});

var CITIES = L.geoJson(cities, {pointToLayer: markerPointToLayer});

map.createPane('lines_woj');
map.getPane('lines_woj').style.zIndex = 402;

var WOJEWODZTWO_LINES = L.geoJson(wojewodztwa_borders, {style: styleWojLines, pane: 'lines_woj'}).addTo(map);

function styleWojLines() {
    return {
        color: BORDER_COLOR[0],
        weight: 1.5
    }
}

map.createPane('lines_pow');
map.getPane('lines_pow').style.zIndex = 401;

var POWIAT_LINES = L.geoJson(powiaty_borders, {style: stylePowLines, pane: 'lines_pow'}).addTo(map);

function stylePowLines() {
    return {
        color: BORDER_COLOR[0],
        weight: 0.5
    }
}

var currentLayer = GMINA_COST; //for reset style for each method

function hideLegend() {
    return function (event, ui) {
        var act = $("#accordion").accordion("option", "active");
        // console.log(act);

        if (act === false) {
            $(".legend").css("opacity", 0);
        } else {
            $(".legend").css("opacity", 1);
        }
    };
}

$(function () {
    $("#accordion").accordion({
        collapsible: true,
        active: false,
        beforeActivate: hideLegend()
    });
});

var info = L.control();

function infoDescriptionOnCreate() {
    var result = '<div id="accordion">\n' +
        '  <h4 style="font-weight: bold">' + infoText.title + '</h4>' +
        '  <div>' +
        '<p>' + infoText.content + '</p>' +
        '<p>' + infoText.dataSource + '</p>';

    result = result +
        '<div>Źródła:</div>' +
        '<div><a href="https://dane.gov.pl/pl/dataset/288,dane-jednostkowe-przedszkoli-szko-i-placowek-oswiatowych-w-latach-2012-2018/resource/26041/table">Liczba uczniów w szkołach.</a></div>' +
        '<div><a href="https://stat.gov.pl/obszary-tematyczne/ludnosc/ludnosc/powierzchnia-i-ludnosc-w-przekroju-terytorialnym-w-2019-roku,7,16.html">Ludność.</a></div>' +
        '</div>';
    return result;
}

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this._div.id = 'infobox';
    this._div.innerHTML = infoDescriptionOnCreate();
    return this._div;
};

info.addTo(map);

function markerPointToLayer(feature, latlng) {
    label = String(feature.properties.name) // Must convert to string, .bindTooltip can't use straight 'feature.properties.attribute'
    return new L.CircleMarker(latlng, {
        radius: 1,
        stroke: false,
        weight: 0,
    }).bindTooltip(label, {
        permanent: true,
        direction: "center",
        className: "city-marker-label"
    }).openTooltip();
}

function getColorByCost(d) {
    return d > 1200000 ? LEGENDPALETTE8[0] :
        d > 1000000 ? LEGENDPALETTE8[1] :
            d > 800000 ? LEGENDPALETTE8[2] :
                d > 600000 ? LEGENDPALETTE8[3] :
                    d > 400000 ? LEGENDPALETTE8[4] :
                        d > 200000 ? LEGENDPALETTE8[5] :
                            d > 100000 ? LEGENDPALETTE8[6] :
                                d > 50 ? LEGENDPALETTE8[7] :
                                    LEGENDPALETTE8[8];
}

function styleCost(feature) {
    return {
        weight: 0.3,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColorByCost(feature.properties.price)
    };
}

function getColorByPerCitizen(d) {
    return d > 70 ? LEGENDPALETTE8[0] :
        d > 60 ? LEGENDPALETTE8[1] :
            d > 50 ? LEGENDPALETTE8[2] :
                d > 40 ? LEGENDPALETTE8[3] :
                    d > 30 ? LEGENDPALETTE8[4] :
                        d > 20 ? LEGENDPALETTE8[5] :
                            d > 10 ? LEGENDPALETTE8[6] :
                                d >= 1 ? LEGENDPALETTE8[7] :
                                    LEGENDPALETTE8[8];
}

function stylePerCitizen(feature) {
    return {
        weight: 0.3,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColorByPerCitizen(feature.properties.perCitizen)
    };
}

function getColorByStatus(d) {
    return d == 1 ? STATUS_PALETTE4[1] :
        d == 2 ? STATUS_PALETTE4[2] :
            d == 3 ? STATUS_PALETTE4[3] :
                d == 0 ? STATUS_PALETTE4[0] :
                    d == 4 ? (STATUS_PALETTE4[4] == null ? STATUS_PALETTE4[2] : STATUS_PALETTE4[4]) :
                        STATUS_PALETTE4[2];
}

function styleStatus(feature) {
    return {
        weight: 0.3,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColorByStatus(feature.properties.status)
    };
}

function getColorByPerStudent(d) {
    return d > 800 ? LEGENDPALETTE8[0] :
        d > 700 ? LEGENDPALETTE8[1] :
            d > 600 ? LEGENDPALETTE8[2] :
                d > 500 ? LEGENDPALETTE8[3] :
                    d > 400 ? LEGENDPALETTE8[4] :
                        d > 300 ? LEGENDPALETTE8[5] :
                            d > 200 ? LEGENDPALETTE8[6] :
                                d > 50 ? LEGENDPALETTE8[7] :
                                    LEGENDPALETTE8[8];
}

function stylePerStudent(feature) {
    return {
        weight: 0.3,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColorByPerStudent(feature.properties.perStudent)
    };
}

//legends
var LEGEND_STATUS = L.control({position: 'bottomright'});
LEGEND_STATUS.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3],
        labels = ['Odmowa podania informacji', 'Przedłużono czas na odpowiedź', 'Brak odpowiedzi', 'Otrzymano informacje'];

    div.innerHTML += '<div><b>Status zbierania danych</b></div><br>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorByStatus(grades[i]) + '"></i> ' +
            labels[i] + '<br>';
    }
    return div;
};

var LEGEND_PER_STUDENT = L.control({position: 'bottomright'});
LEGEND_PER_STUDENT.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [801, 701, 601, 501, 401, 301, 201, 51, 0],
        labels = ['≥ 800 zł/os',
            '< 800 zł/os',
            '< 700 zł/os',
            '< 600 zł/os',
            '< 500 zł/os',
            '< 400 zł/os',
            '< 300 zł/os',
            '< 200 zł/os',
            'Brak danych'];
    div.innerHTML += '<div><b>Roczny koszt na jednego ucznia</b></div><br>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        var idom = document.createElement("i");
        idom.style.background = getColorByPerStudent(grades[i]);
        div.appendChild(idom);
        div.innerHTML += labels[i] + '<br>';
    }
    return div;
};

var LEGEND_COST = L.control({position: 'bottomright'});
LEGEND_COST.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [
            1200001,
            1000001,
            800001,
            600001,
            400001,
            200001,
            100001,
            51,
            0],
        labels = [
            '≥ 1 200 000 zł',
            '< 1 200 000 zł',
            '< 1 000 000 zł',
            '< 800 000 zł',
            '< 600 000 zł',
            '< 400 000 zł',
            '< 200 000 zł',
            '< 100 000 zł',
            'Brak danych'];

    div.innerHTML += '<div><b>Roczne wydatki na katechezę</b></div><br>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorByCost(grades[i]) + '"></i> ' +
            labels[i] + '<br>';
    }
    return div;
};

var LEGEND_PER_CITIZEN = L.control({position: 'bottomright'});
LEGEND_PER_CITIZEN.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [
            71,
            61,
            51,
            41,
            31,
            21,
            11,
            1,
            0],
        labels = [
            '≥ 70,00 zł',
            '< 70,00 zł',
            '< 60,00 zł',
            '< 50,00 zł',
            '< 40,00 zł',
            '< 30,00 zł',
            '< 20,00 zł',
            '< 10,00 zł',
            'Brak danych'];

    div.innerHTML += '<div><b>Roczne wydatki na mieszkańca</b></div><br>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorByPerCitizen(grades[i]) + '"></i> ' +
            labels[i] + '<br>';
    }
    return div;
};

L.easyButton("fas fa-expand", function () {
    map.fitBounds(GMINA_STATUS.getBounds(), {
        paddingTopLeft: [0, 60]
    });
}).addTo(map);

var searchControl = new L.Control.Search({
    layer: currentLayer,
    propertyName: 'JPT_NAZWA_',
    initial: false,
    marker: false,
    minLength: 2,
    position: 'topleft',
    firstTipSubmit: true,
    textPlaceholder: 'Nazwa JST',
    textCancel: 'Anuluj',
    textErr: 'Nie znaleziono',
    moveToLocation: function (latlng, title, map) {
        //map.fitBounds( latlng.layer.getBounds() );
        var zoom = map.getBoundsZoom(latlng.layer.getBounds());
        map.setView(latlng, zoom); // access the zoom
    }
});

searchControl.on('search:locationfound', function (e) {
    if (e.layer._popup)
        e.layer.openPopup();
}).on('search:collapsed', function (e) {
    currentLayer.eachLayer(function (layer) {	//restore feature color
        currentLayer.resetStyle(layer);
    });
});
//
// searchControl.on('keyup', function (e) {
//     controlSearch.searchText(e.target.value);
// })

map.addControl(searchControl);  //inizialize search control

var baseMaps = {
    "Gmina - status": GMINA_STATUS,
    "Gmina - koszt": GMINA_COST,
    "Gmina - na ucznia": GMINA_PER_STUDENT,
    "Gmina - na mieszkańca": GMINA_PER_CITIZEN,
    "Powiat - status": POWIAT_STATUS,
    "Powiat - koszt": POWIAT_COST,
    "Powiat - na ucznia": POWIAT_PER_STUDENT
};

var overlayMaps = {
    "Miasta": CITIES,
    "Powiaty": POWIAT_LINES,
    "Województwa": WOJEWODZTWO_LINES
};

L.control.layers(baseMaps, overlayMaps, {
    collapsed: true,
    position: 'topright'
}).addTo(map);

LEGEND_COST.addTo(map);
var currentLegend = LEGEND_COST;

map.on('baselayerchange', function (eventLayer) {
    if (eventLayer.name === "Gmina - status") {
        map.removeControl(currentLegend);
        currentLegend = LEGEND_STATUS;
        currentLayer = GMINA_STATUS;
        searchControl.setLayer(currentLayer);
        LEGEND_STATUS.addTo(map);
    } else if (eventLayer.name === 'Gmina - koszt') {
        map.removeControl(currentLegend);
        currentLegend = LEGEND_COST;
        currentLayer = GMINA_COST;
        searchControl.setLayer(currentLayer);
        LEGEND_COST.addTo(map);
    } else if (eventLayer.name === 'Gmina - na ucznia') {
        map.removeControl(currentLegend);
        currentLegend = LEGEND_PER_STUDENT;
        currentLayer = GMINA_PER_STUDENT;
        searchControl.setLayer(currentLayer);
        LEGEND_PER_STUDENT.addTo(map);
    } else if (eventLayer.name === 'Gmina - na mieszkańca') {
        map.removeControl(currentLegend);
        currentLegend = LEGEND_PER_CITIZEN;
        currentLayer = GMINA_PER_CITIZEN;
        searchControl.setLayer(currentLayer);
        LEGEND_PER_CITIZEN.addTo(map);
    } else if (eventLayer.name === 'Powiat - status') {
        map.removeControl(currentLegend);
        currentLegend = LEGEND_STATUS;
        currentLayer = POWIAT_STATUS;
        searchControl.setLayer(currentLayer);
        LEGEND_STATUS.addTo(map);
    } else if (eventLayer.name === 'Powiat - koszt') {
        map.removeControl(currentLegend);
        currentLegend = LEGEND_COST;
        currentLayer = POWIAT_COST;
        searchControl.setLayer(currentLayer);
        LEGEND_COST.addTo(map);
    } else if (eventLayer.name === 'Powiat - na ucznia') {
        map.removeControl(currentLegend);
        currentLegend = LEGEND_PER_STUDENT;
        currentLayer = POWIAT_PER_STUDENT;
        searchControl.setLayer(currentLayer);
        LEGEND_PER_STUDENT.addTo(map);
    }
});

function getDescription(feature) {
    var content = '';
    content += '<h3>' + feature.properties.JPT_NAZWA_ + '</h3>';
    if (feature.properties.price) {
        content += '<div><b>Kwota przeznaczona na lekcje religii:</b></div><div class="tooltip">' + parseFloat(feature.properties.price).toLocaleString(undefined, {minimumFractionDigits: 2}) + ' zł</div>';
    }

    if (feature.properties.populate) {
        content += '<div><b>Liczba mieszkańców: </b>' + parseFloat(feature.properties.populate).toLocaleString(undefined) + '</div>';
    }

    if (feature.properties.students) {
        if (feature.properties.students > 0) {
            content += '<b><div>Liczba uczniów: </b>' + parseFloat(feature.properties.students).toLocaleString(undefined) + '</div>';
        }
    }

    if (feature.properties.perCitizen) {
        if (feature.properties.perStudent != 0) {
            content += '<b><div>Kwota na mieszkańca: </b>' + parseFloat(feature.properties.perCitizen).toLocaleString(undefined, {minimumFractionDigits: 2}) + ' zł/os</div>';
        }
    }

    if (feature.properties.perStudent) {
        if (feature.properties.perStudent != 0) {
            content += '<b><div>Kwota na ucznia: </b>' + parseFloat(feature.properties.perStudent).toLocaleString(undefined, {minimumFractionDigits: 2}) + ' zł/os</div>';
        }
    }

    if (feature.properties.description) {
        content += '<br><div><b>Uwaga:</b></div><div class="tooltip">' + feature.properties.description + '</div>';
    }

    return content;
}

function getDescriptionPopup(feature) {
    var content = '';
    content += getDescription(feature);

    if ((feature.properties.subvention && feature.properties.subvention !== " ") || (feature.properties.gminaCost && feature.properties.gminaCost !== " ") || feature.properties.link.length > 0) {
        content += '<br>';
        if (feature.properties.subvention) {
            if (feature.properties.subvention !== " ") {
                content += '<div><b>Kwota subwencji oświatowej: </b>' + parseFloat(feature.properties.subvention).toLocaleString(undefined) + ' zł</div>';
            }
        }

        if (feature.properties.gminaCost) {
            if (feature.properties.gminaCost !== " ") {
                content += '<div><b>Kwota z samorządu: </b>' + parseFloat(feature.properties.gminaCost).toLocaleString(undefined) + ' zł</div>';
            }
        }

        if (feature.properties.link.length > 0) {
            content += '<div><b>Źródła:</b></div>';
            for (let j = 0; j < feature.properties.link.length; j++) {
                var str = feature.properties.link[j].substring(0, 30);
                content += '<div class="tooltip"><a target="_blank" href="' + feature.properties.link[j] + '">' + str + "..." + '</a><div/>';
            }
        }
    }

    return content;
}

var temppopup = 0;


//for each features methods
function onEachFeature(feature, layer) {
    layer.bindPopup(getDescriptionPopup(feature));
    layer.bindTooltip(getDescription(feature));

    layer.on('mouseover', function (f, l) {
        layer.setStyle(hoverStyle);
        if (layer.isPopupOpen()) {
            layer.closeTooltip();
        }
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        if (temppopup !== 0) {
            layer.closeTooltip();
        }
    });

    layer.on('popupopen', function (f, l) {
        temppopup = 1;
    });

    layer.on('popupclose', function (f, l) {
        temppopup = 0;
    });

    layer.on('mouseout', function (f, l) {
        currentLayer.resetStyle(layer);
    });

    layer.on('click', function (f, l) {
        map.fitBounds(layer.getBounds());
        layer.closeTooltip();
    });
};

L.tileLayer('', {
    attribution: footerText.datasource + footerText.separator + footerText.creator,
}).addTo(map);

map.fitBounds(GMINA_STATUS.getBounds(), {
    paddingTopLeft: [0, 60]
});

