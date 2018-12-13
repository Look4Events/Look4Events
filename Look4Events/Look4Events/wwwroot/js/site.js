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
//$(document).ready(function () {
//    $('#example').DataTable({
//        columnDefs: [
//            {
//                targets: [0, 1, 2],
//                className: 'mdl-data-table__cell--non-numeric'
//            }
//        ]

//    });
//});

//---------- de igone + david -------------

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
            //console.log(json._embedded.events);
            listadoResultados = json._embedded.events;
            console.log(listadoResultados);
            for (let i = 0; i < listadoResultados.length; i++) { //prueba para ver que llega la informacion
                console.log(listadoResultados[i].name);
            //    console.log(listadoResultados[i].dates.start.localDate);
                //document.getElementById("filaResults").appendChild(parrafo);
            }

            let e = document.getElementById("events");
            e.innerHTML = json.page.totalElements + " events found.";
            showEvents(listadoResultados);
            positionActual = position;
            jsonSaved = listadoResultados;
            initMap(position, listadoResultados);
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });

}


function showEvents(json) {
    for (let i = 0; i < json.length; i++) {

        // creo elemento titulo
        let elementoTitulo = document.createElement("h3");
        elementoTitulo.setAttribute("class","rowspan=3");
        let textoTitulo = document.createTextNode(json[i].name);
        elementoTitulo.appendChild(textoTitulo);

        // creo elemento parrafo
        let elementoParrafo = document.createElement("li");
        let textoParrafo = document.createTextNode(json[i].dates.start.localDate + " /  Hora: " + json[i].dates.start.localTime + " / Ciudad: " + json[i]._embedded.venues[0].city.name);
        elementoParrafo.appendChild(textoParrafo);

        // creo un div, les incluyo el titulo y el parrafo
        let celdaEvento = document.createElement("button");
        celdaEvento.setAttribute("class", "col-xs-8 col-sm-6 col-md-4 personal");
        //<button id="volver" onclick="location.href='page2.html'">page2</button>
        celdaEvento.setAttribute("onclick", "location.href='/Home/Prueba'");
        celdaEvento.appendChild(elementoTitulo);
        celdaEvento.appendChild(elementoParrafo);
        
        
        //let texto = document.createTextNode(json[i].name);
        let parrafo = document.createElement("div");
        //parrafo.setAttribute("class", "col-xs-4");
        parrafo.appendChild(celdaEvento);
        //let filaResults = document.getElementById("filaResults");

        //filaResults.appendChild(parrafo);
        //document.getElementById("filaResults").appendChild(parrafo);
        if (i % 3 === 0) {
            let elementoFila = document.createElement("div");
            elementoFila.setAttribute("class", "row col-xs-8 col-sm-6 col-md-4");
            elementoFila.appendChild(celdaEvento);
            
        }
        document.getElementById("filaResults").appendChild(celdaEvento);
    }
}

//var url = $("#RedirectTo").val();
//location.href = www.google.com; 
    //--------------- el que funciona:  ------------
//function showEvents(json) {
//    for (let i = 0; i < json.length; i++) {
//        let texto = document.createTextNode(json[i].name);
//        let parrafo = document.createElement("li");
//        parrafo.setAttribute("class", "col-xs-4");
//        parrafo.appendChild(texto);
//        let filaResults = document.getElementById("filaResults");
//        filaResults.appendChild(parrafo);
//    }
//}

//--------------tambien funciona--------------------------
//function showEvents(json) {
//    for (let i = 0; i < json.length; i++) {
//        // creo elemento titulo
//        let elementoTitulo = document.createElement("h3");
//        let textoTitulo = document.createTextNode(json[i].name);
//        elementoTitulo.appendChild(textoTitulo);
//        // creo elemento parrafo
//        let elementoParrafo = document.createElement("p");
//        let textoParrafo = document.createTextNode(json[i].dates.start.localDate + " /  Hora: " + json[i].dates.start.localTime + " / Ciudad: " +json[i]._embedded.venues[0].city.name);
//        elementoParrafo.appendChild(textoParrafo);

//        // creo un div, les incluyo el titulo y el parrafo
//        let div = document.createElement("div");
//        div.setAttribute("class", "col-xs-4");
//        div.appendChild(elementoTitulo);
//        div.appendChild(elementoParrafo);

//        filaResults.appendChild(div);

//    }
//}


//------original -----------
//function showEvents(json) {
//    for (let i = 0; i < json.page.size; i++) {
//        $("#events").append("<table id='example' class='display' style='width:100%'>" +"<tr>"+
//            "<td>" + json._embedded.events[i].name + "</td >" +
//            " ---- "+
//            "<td>" + json._embedded.events[i]._embedded.venues[0].name + "</td >" +
//            "----"+
//            "<td>" + json._embedded.events[i].dates.start.localDate + "</td >" +
//            " ---- "+
//            "<td>" + json._embedded.events[i].dates.start.localTime + "</td >" +
//            " ---- "+
//            "<td>" + json._embedded.events[i].classifications[0].segment.name + "</td >" +
//            " ---- "+
//            "<td>" + json._embedded.events[i]._embedded.venues[0].type + "</td >" +
//            " ---- " +
//            "<td>" + json._embedded.events[i].url + "</td >" +
//            " ---- "+
//            "<td>" + json._embedded.events[i]._embedded.venues[0].postalCode + "</td >" +
//            " ---- "+
//            "<td>" + json._embedded.events[i]._embedded.venues[0].city.name + "</td >" +
//            " ---- "+
//            "<td>" + json._embedded.events[i]._embedded.venues[0].state.name + "</td >" +
//            " ---- "+
//            "<td>" + json._embedded.events[i]._embedded.venues[0].country.name + "</td >" +
//            " ---- "+
//            "<td>" + json._embedded.events[i]._embedded.venues[0].address.line1 + "</td >" +
//            " ---- "+
//            "<td>" + json._embedded.events[i]._embedded.venues[0].location.longitude + "</td >" +
//            " ---- "+
//            "<td>" + json._embedded.events[i]._embedded.venues[0].location.latitude + "</td >" +
//            "</tr>" +
//            " </table> "
//            );
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
