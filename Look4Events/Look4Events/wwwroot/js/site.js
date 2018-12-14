﻿//function initMap() {
//    var map = new google.maps.Map(document.getElementById('map'), {
//        zoom: 8,
//        center: { lat: 40.731, lng: -73.997 }
//    });
//    var geocoder = new google.maps.Geocoder;
//    var infowindow = new google.maps.InfoWindow;

//    document.getElementById('submit').addEventListener('click', function () {
//        geocodeLatLng(geocoder, map, infowindow);
//    });
//}

//function geocodeLatLng(geocoder, map, infowindow) {
//    var input = document.getElementById('latlng').value;
//    var latlngStr = input.split(',', 2);
//    var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
//    geocoder.geocode({ 'location': latlng }, function (results, status) {
//        if (status === 'OK') {
//            if (results[0]) {
//                map.setZoom(11);
//                var marker = new google.maps.Marker({
//                    position: latlng,
//                    map: map
//                });
//                infowindow.setContent(results[0].formatted_address);
//                infowindow.open(map, marker);
//            } else {
//                window.alert('No results found');
//            }
//        } else {
//            window.alert('Geocoder failed due to: ' + status);
//        }
//    });
//}

let fechaInicio = {};
let fechaFin = {};
let fechFin;
let fechInicial;

$('#fechaIn').on('click', function () {
    let date = new Date($('#fechaInicio').val());
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    fechaInicio = { year: year, month: month, day: day };
 fechInicial = fechaInicio.year + "-" + fechaInicio.month + "-" + fechaInicio.day;
});


$('#fechaFin').on('click', function () {
    let date = new Date($('#fechaFinal').val());
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    fechaFin = { year: year, month: month, day: day };
 fechFin = fechaFin.year + "-" + fechaFin.month + "-" + fechaFin.day;
});




//Situación del mapa
let positionActual;
let jsonSaved;
let listadoResultados;
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
    let x = document.getElementById("location");
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    //let latlon = position.coords.latitude + "," + position.coords.longitude;


    $.ajax({
        type: "GET",
        //url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=h3I9tWkebYWN4j7RUCINFghyZEoQMjMi&latlong=" + latlon,
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=h3I9tWkebYWN4j7RUCINFghyZEoQMjMi&city=Bilbao",
        async: true,
        dataType: "json",
        success: function (json) {
            console.log(json);
            let e = document.getElementById("events");
            e.innerHTML = json.page.totalElements + " events found.";
            showEvents(json);
            positionActual = position;
            jsonSaved = json;
            initMap(position, json);
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });
}


function showEvents(json) {
    for (let i = 0; i < json.page.size; i++) {
        $("#events").append("<p>"
            + json._embedded.events[i].name + 
            " ---- " 
            + json._embedded.events[i].images[2].url + 
            " ---- " 
            + json._embedded.events[i]._embedded.venues[0].name +
            "----"
            + json._embedded.events[i].dates.start.localDate +
            " ---- "
            + json._embedded.events[i].dates.start.localTime +
            " ---- "
            + json._embedded.events[i].classifications[0].segment.name +
            " ---- "
            + json._embedded.events[i].url +
            " ---- "
            + json._embedded.events[i]._embedded.venues[0].postalCode +
            " ---- "
            + json._embedded.events[i]._embedded.venues[0].city.name +
            " ---- "
            + json._embedded.events[i]._embedded.venues[0].state.name +
            " ---- "
            + json._embedded.events[i]._embedded.venues[0].country.name +
            " ---- "
            + json._embedded.events[i]._embedded.venues[0].address.line1 +
            " ---- "
            + json._embedded.events[i]._embedded.venues[0].location.longitude +
            " ---- "
            + json._embedded.events[i]._embedded.venues[0].location.latitude +
            "</p>");
    }
}

function showPosition2(position) {
    console.log()
    let x = document.getElementById("location");
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    //let latlon = position.coords.latitude + "," + position.coords.longitude;


    $.ajax({
        type: "GET",
        //url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=h3I9tWkebYWN4j7RUCINFghyZEoQMjMi&latlong=" + latlon,
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=h3I9tWkebYWN4j7RUCINFghyZEoQMjMi&city=Bilbao",
        async: true,
        dataType: "json",
        success: function (json) {
            console.log(json);
            let e = document.getElementById("events");
            e.innerHTML = json.page.totalElements + " events found.";
            showEvents2(json);
            positionActual = position;
            jsonSaved = json;
            initMap(position, json);
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });
}
function showEvents2(json) {
    for (let i = 0; i < json.page.size; i++) {
        $("#events2").append("<p>"
            + json._embedded.events[i].name +
            " ---- "
            + json._embedded.events[i].images[2].url +
            " ---- "
            + json._embedded.events[i]._embedded.venues[3].name +
            "----"
            + json._embedded.events[i].dates.start.localDate +
            " ---- "
            + json._embedded.events[i].dates.start.localTime +
            " ---- "
            + json._embedded.events[i]._embedded.venues[0].city.name +
            "</p>");
    }

}
function initMap(position, json) {
    let mapDiv = document.getElementById('map');
    let map = new google.maps.Map(mapDiv, {
        center: { lat: position.coords.latitude, lng: position.coords.longitude },
        zoom: 10

    });
    for (let i = 0; i < json.page.size; i++) {
        addMarker(map, json._embedded.events[i]);
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
        content: '<a>' + event._embedded.venues[0].name + '</a>'
    });

    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
    console.log(marker);
}

//function showPosition(position) {
//    console.log()
//    let x = document.getElementById("location");
//    x.innerHTML = "Latitude: " + position.coords.latitude +
//        "<br>Longitude: " + position.coords.longitude;
//    //let latlon = position.coords.latitude + "," + position.coords.longitude;

//    $.ajax({
//        type: "GET",
//        //url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=h3I9tWkebYWN4j7RUCINFghyZEoQMjMi&latlong=" + latlon,
//        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=h3I9tWkebYWN4j7RUCINFghyZEoQMjMi&city=Bilbao",
//        async: true,
//        dataType: "json",
//        success: function (json) {
//            console.log(json);
//            listadoResultados = json._embedded.events;
//            for (let i = 0; i < listadoResultados.length; i++) { //prueba para ver que llega la informacion
//                //    console.log(listadoResultados[i].name);
//                //    console.log(listadoResultados[i].dates.start.localDate);
//            }

//            let e = document.getElementById("events");
//            e.innerHTML = json.page.totalElements + " events found.";
//            showEvents(listadoResultados);
//            positionActual = position;
//            jsonSaved = listadoResultados;
//            initMap(position, listadoResultados);
//        },
//        error: function (xhr, status, err) {
//            console.log(err);
//        }
//    });

//}

////--------------tambien funciona--------------------------
//function showEvents(json) {
//    for (let i = 0; i < json.length; i++) {
//        // creo elemento titulo
//        let elementoTitulo = document.createElement("h3");
//        let textoTitulo = document.createTextNode(json[i].name);
//        elementoTitulo.appendChild(textoTitulo);
//        // creo elemento parrafo
//        let elementoParrafo = document.createElement("p");
//        let textoParrafo = document.createTextNode(json[i].dates.start.localDate + " /  Hora: " + json[i].dates.start.localTime + " / Ciudad: " + json[i]._embedded.venues[0].city.name);
//        elementoParrafo.appendChild(textoParrafo);

//        // creo un div, les incluyo el titulo y el parrafo
//        let div = document.createElement("div");
//        div.setAttribute("class", "col-xs-4");
//        div.appendChild(elementoTitulo);
//        div.appendChild(elementoParrafo);

//        filaResults.appendChild(div);

//    }
//}

getLocation();