var map = L.map('mapid', {
    renderer: L.canvas(
        {padding: 0.4}
    )
}).setView([54.186, 18.031], 7);

var WOJEWODZTWA = L.geoJson(data, {style: style, onEachFeature: onEachFeature}).addTo(map);

L.easyButton("fas fa-expand", function () {
    map.fitBounds(WOJEWODZTWA.getBounds(), {
        paddingTopLeft: [0, 60]
    });
}).addTo(map);

map.fitBounds(WOJEWODZTWA.getBounds(), {
    paddingTopLeft: [0, 60]
});

function getColorPerJobs(jobs) {
    return jobs > 2700 ? LEGENDPALETTE8[0] :
        jobs > 2400 ? LEGENDPALETTE8[1] :
            jobs > 2100 ? LEGENDPALETTE8[2] :
                jobs > 1800 ? LEGENDPALETTE8[3] :
                    jobs > 1500 ? LEGENDPALETTE8[4] :
                        jobs > 1200 ? LEGENDPALETTE8[5] :
                            jobs > 900 ? LEGENDPALETTE8[6] :
                                jobs > 600 ? LEGENDPALETTE8[7] :
                                    LEGENDPALETTE8[8];
}

function style(feature) {
    return {
        color: '#838383',
        fillOpacity: 0.4,
        fillColor: getColorPerJobs(feature.properties.lectures['religia'].jobs)
    };
}

var hoverStyle = {
    weight: 3,
    color: '#838383',
    dashArray: '',
    fillOpacity: 0.7
};

function onEachFeature(feature, layer) {
    layer.on('mouseover', function (f, l) {
        layer.setStyle(hoverStyle);
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    })

    layer.on('mouseout', function (f, l) {
        WOJEWODZTWA.resetStyle(layer);
    });

    // layer.bindPopup(getDescriptionPopup(feature));
    layer.bindTooltip(getDescription(feature));
}

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
        '<div><a href="https://dane.gov.pl/pl/dataset/811,nauczyciele-w-osobach-i-etatach/resource/18645/table">Nauczyciele w osobach i etatach (dane.gov.pl)</a></div>' +
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

var LEGEND = L.control({position: "bottomright"});
LEGEND.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [2701, 2401, 2101, 1801, 1501, 1201, 901, 601],
        labels = ['≥ 2700',
            '< 2700',
            '< 2400',
            '< 2100',
            '< 1800',
            '< 1500',
            '< 1200',
            '< 900'];
    div.innerHTML += '<div><b>Liczba etatów n. religii</b></div><br>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="opacity: 0.7; background:' + getColorPerJobs(grades[i]) + '"></i> ' +
            labels[i] + '<br>';
    }
    return div;
};

LEGEND.addTo(map);

L.tileLayer('', {
    attribution: footerText.datasource + footerText.separator + footerText.creator,
}).addTo(map);

function getDescription(feature) {
    let content = '';
    content += '<h3>' + feature.properties.JPT_NAZWA_.toUpperCase() + '</h3>';

    content += '<table> ';
    content += '<tr>';
    content += "<th>Przedmiot</th>";
    content += "<th>Etaty</th>";
    content += "<th>Nauczyciele</th>";
    content += '</tr>';

    content += "<tr>";
    content += "<td>Religia</td>";
    content += "<td>" + feature.properties.lectures['religia'].jobs + "</td>";
    content += "<td>" + feature.properties.lectures['religia'].teachers + "</td>";
    content += '</tr>';

    content += "<tr>";
    content += "<td>Etyka</td>";
    content += "<td>" + feature.properties.lectures['etyka'].jobs + "</td>";
    content += "<td>" + feature.properties.lectures['etyka'].teachers + "</td>";
    content += '</tr>';

    content += "<tr>";
    content += "<td>Język polski</td>";
    content += "<td>" + feature.properties.lectures['język polski'].jobs + "</td>";
    content += "<td>" + feature.properties.lectures['język polski'].teachers + "</td>";
    content += '</tr>';

    content += "<tr>";
    content += "<td>Matematyka</td>";
    content += "<td>" + feature.properties.lectures['matematyka'].jobs + "</td>";
    content += "<td>" + feature.properties.lectures['matematyka'].teachers + "</td>";
    content += '</tr>';

    content += "<tr>";
    content += "<td>Fizyka</td>";
    content += "<td>" + feature.properties.lectures['fizyka'].jobs + "</td>";
    content += "<td>" + feature.properties.lectures['fizyka'].teachers + "</td>";
    content += '</tr>';

    content += "<tr>";
    content += "<td>Biologia</td>";
    content += "<td>" + feature.properties.lectures['biologia'].jobs + "</td>";
    content += "<td>" + feature.properties.lectures['biologia'].teachers + "</td>";
    content += '</tr>';

    content += "<tr>";
    content += "<td>Historia</td>";
    content += "<td>" + feature.properties.lectures['historia'].jobs + "</td>";
    content += "<td>" + feature.properties.lectures['historia'].teachers + "</td>";
    content += '</tr>';

    content += "<tr>";
    content += "<td>Język angielski</td>";
    content += "<td>" + feature.properties.lectures['język angielski'].jobs + "</td>";
    content += "<td>" + feature.properties.lectures['język angielski'].teachers + "</td>";
    content += '</tr>';

    content += '</table>';
    return content;
}