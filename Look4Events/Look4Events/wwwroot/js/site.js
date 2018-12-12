// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// • • • • • • • • • • •RELOJ • • • • • • • • • • •
//function verHora() {
//    let mihora = new Date();
//    let horas = mihora.getHours().toString();
//    let minutos = mihora.getMinutes().toString();
//    if (minutos.length == 1) minutos = "0" + minutos;
//    let segundos = mihora.getSeconds().toString();
//    if (segundos.length == 1) segundos = "0" + segundos;
//    document.forms[0].miReloj.value = horas + " : " + minutos + " : " + segundos;
//}
// • • • • • • • • • • •

//~~~~~~~~~~~tabla en vista~~~~~~~~~~~~~~:
$(document).ready(function () {
    $('#example').DataTable({
        columnDefs: [
            {
                targets: [0, 1, 2],
                className: 'mdl-data-table__cell--non-numeric'
            }
        ]

    });
});


//---------- de igone + david -------------

//Situación del mapa
let positionActual;
let jsonSaved;
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

    function openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }
}
function showEvents(json) {
    for (let i = 0; i < json.page.size; i++) {
        $("#events").append("<table id='example' class='display' style='width:100%'>"+ "<tr>"+
            "<td>" + json._embedded.events[i].name +"</td >"+
            " ---- "+
            "<td>" + json._embedded.events[i]._embedded.venues[0].name + "</td >" +
            "----"+
            "<td>" + json._embedded.events[i].dates.start.localDate +
            " ---- "+
            "<td>" + json._embedded.events[i].dates.start.localTime +
            " ---- "+
            "<td>" + json._embedded.events[i].classifications[0].segment.name +
            " ---- "+
            "<td>" + json._embedded.events[i]._embedded.venues[0].type +
            " ---- " +
            "<td>" + json._embedded.events[i].url +
            //"<td>" + json._embedded.events[i].url +
            " ---- "+
            "<td>" + json._embedded.events[i]._embedded.venues[0].postalCode +
            " ---- "+
            "<td>" + json._embedded.events[i]._embedded.venues[0].city.name +
            " ---- "+
            "<td>" + json._embedded.events[i]._embedded.venues[0].state.name +
            " ---- "+
            "<td>" + json._embedded.events[i]._embedded.venues[0].country.name +
            " ---- "+
            "<td>" + json._embedded.events[i]._embedded.venues[0].address.line1 +
            " ---- "+
            "<td>" + json._embedded.events[i]._embedded.venues[0].location.longitude +
            " ---- "+
            "<td>" + json._embedded.events[i]._embedded.venues[0].location.latitude +
            "</tr>" +
            " </table> "
            //+"<td>" + <button id="volver" onclick="location.href='/Home/Prueba'">VistaPrueba</button> + "</td>"
            );

    }
}
//function showEvents(json) {
//    for (let i = 0; i < json.page.size; i++) {
//        $("#events").append(
//            "<p>" + json._embedded.events[i].name +
//            " ---- "
//            + json._embedded.events[i]._embedded.venues[0].name +
//            "----"
//            + json._embedded.events[i].dates.start.localDate +
//            " ---- "
//            + json._embedded.events[i].dates.start.localTime +
//            " ---- "
//            + json._embedded.events[i].classifications[0].segment.name +
//            " ---- "
//            + json._embedded.events[i]._embedded.venues[0].type +
//            " ---- "
//            + json._embedded.events[i].url +
//            " ---- "
//            + json._embedded.events[i]._embedded.venues[0].postalCode +
//            " ---- "
//            + json._embedded.events[i]._embedded.venues[0].city.name +
//            " ---- "
//            + json._embedded.events[i]._embedded.venues[0].state.name +
//            " ---- "
//            + json._embedded.events[i]._embedded.venues[0].country.name +
//            " ---- "
//            + json._embedded.events[i]._embedded.venues[0].address.line1 +
//            " ---- "
//            + json._embedded.events[i]._embedded.venues[0].location.longitude +
//            " ---- "
//            + json._embedded.events[i]._embedded.venues[0].location.latitude +
//            "</p>");
//    }
//}

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
        content: '<a>' + event.name + '</a>'
    });

    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
    console.log(marker);
}



getLocation();

//~~~~~~~~~~~ Radio Button ~~~~~~~~~~~~~~+:
//$(function () {

//    var valor = $ ("input[name=TipoDeVista]:checked").prop("value");

//    alert(valor)
//    // &gt;&gt; 2

//})

//$("input[name=TipoDeVista]:checked").change(function (prop("value");

//alert(valor)) {
//    // Do something interesting here
//});

//function showEvents(json) {
//    for (let i = 0; i < json.page.size; i++) {
//        $("#events").append("<p>" + json._embedded.events[i].name + 
//                          " ---- " 
//                                  + json._embedded.events[i]._embedded.venues[0].name + "</p>");
//    }
//}


