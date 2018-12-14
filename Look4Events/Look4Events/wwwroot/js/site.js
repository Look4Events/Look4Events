//Situación del mapa
let positionActual;
let jsonSaved;
//let listadoResultados;
let latlon;
let radius;
let x;


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        console.log()
    } else {
        let x = document.getElementById("location");
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
function showPosition(position) {
    console.log()
    x = document.getElementById("location");
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    latlon = position.coords.latitude + "," + position.coords.longitude;
    radius = "&radius=50&unit=km"

    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=h3I9tWkebYWN4j7RUCINFghyZEoQMjMi&latlong="
            + latlon + radius,
        async: true,
        dataType: "json",
        success: function (json) {
            console.log(json);
            let events = json._embedded.events;
            let e = document.getElementById("events");
            e.innerHTML = json.page.totalElements + " events found.";
            showEvents(events);
            positionActual = position;
            jsonSaved = json;
            initMap(position, events);
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });
}

let fechaInicio = {};
let fechaFin = {};
let fechFin;
let fechInicial;
let hora = "T00:00:00Z";
let StartDateTime = "&startDateTime=";
let EndDateTime = "&endDateTime=";
$('#fechaIn').on('change', function () {
    let date = new Date($('#fechaIn').val());
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    fechaInicio = { year: year, month: month, day: day };
    fechInicial = fechaInicio.year + "-" + fechaInicio.month + "-" + fechaInicio.day;
});
$('#fechaFin').on('change', function () {
    let date = new Date($('#fechaFin').val());
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    fechaFin = { year: year, month: month, day: day };
    fechFin = fechaFin.year + "-" + fechaFin.month + "-" + fechaFin.day;
});
function searchByDateShowPosition() {
    latlon = positionActual.coords.latitude + "," + positionActual.coords.longitude;
    radius = "&radius=50&unit=km"
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=h3I9tWkebYWN4j7RUCINFghyZEoQMjMi&latlong="
            + latlon + radius + StartDateTime + fechInicial + hora + EndDateTime + fechFin + hora,
        async: true,
        dataType: "json",
        success: function (json) {
            let events = json._embedded.events;
            console.log(events);
            let e = document.getElementById("events");
            e.innerHTML = json.page.totalElements + " events found.";
            showEventsByDate(events);
            jsonSaved = json;
            initMap(positionActual, events);
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });
}

function showEvents(events) {
    for (let i = 0; i < events.length; i++) {

        // creo elemento titulo
        let elementoTitulo = document.createElement("h3");
        elementoTitulo.setAttribute("class", "rowspan=3");
        let textoTitulo = document.createTextNode(events[i].name);
        elementoTitulo.appendChild(textoTitulo);

        // creo elemento parrafo
        let elementoParrafo = document.createElement("li");
        let textoParrafo = document.createTextNode(events[i].dates.start.localDate + " /  Hora: " + events[i].dates.start.localTime + " / Ciudad: " + events[i]._embedded.venues[0].city.name);
        elementoParrafo.appendChild(textoParrafo);

        // creo un div, les incluyo el titulo y el parrafo
        let celdaEvento = document.createElement("button");

        celdaEvento.setAttribute("onclick", "location.href='/Home/Prueba'");
        celdaEvento.setAttribute("class", "personal");
        celdaEvento.appendChild(elementoTitulo);
        celdaEvento.appendChild(elementoParrafo);



        let parrafo = document.createElement("div");
        parrafo.setAttribute("class", "column");
        parrafo.appendChild(celdaEvento);


        if (i % 3 === 0) {
            let elementoFila = document.createElement("div");
            elementoFila.setAttribute("class", "row col-xs-4");
            elementoFila.appendChild(parrafo);

        }
        document.getElementById("filaResults").appendChild(parrafo);
        console.log()
    }
}

function showEventsByDate(events) {
    for (let i = 0; i < events.length; i++) {
        $("#events").append("<p>" + events[i].name +
            " ---- "
            + events[i]._embedded.venues[0].name +
            " ---- "
            + events[i].dates.start.localDate +
            "</p>");
    }
}

function initMap(position, events) {
    let mapDiv = document.getElementById('map');
    let map = new google.maps.Map(mapDiv, {
        center: { lat: position.coords.latitude, lng: position.coords.longitude },
        zoom: 10

    });
    for (let i = 0; i < events.length; i++) {
        addMarker(map, events[i]);
    }
}

function addMarker(map, event) {
    let marker = new google.maps.Marker({
        position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
        //infoWindow: new google.maps.InfoWindow({ content: json._embedded.events[i].name }),
        animation: google.maps.Animation.DROP,
        map: map
    });
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    let infoWindow = new google.maps.InfoWindow({
        content: '<a href="http://www.finofilipino.org">' + event.name + '</a>'

    });
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
    console.log(marker);
}
getLocation();