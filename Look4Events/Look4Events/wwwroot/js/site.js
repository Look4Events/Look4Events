﻿//Situación del mapa
let positionActual;
let jsonSaved;
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
    x.innerHTML = "You are here: Latitude: " + position.coords.latitude +
        " & Longitude: " + position.coords.longitude;
    latlon = position.coords.latitude + "," + position.coords.longitude;
    radius = "&radius=500&unit=km"

    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=h3I9tWkebYWN4j7RUCINFghyZEoQMjMi&latlong="
            + latlon + radius,
        async: true,
        dataType: "json",
        success: function (json) {
            console.log(json);
            let events = json._embedded.events;
            let e = document.getElementById("totalEvents");
            e.innerHTML = json.page.totalElements + " events found." + '<img src="/images/marcadorpeke.png"/>';
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

function showEvents(events) {
    for (let i = 0; i < events.length; i++) {


        //creo elemento URL
        let UrlEvento = events[i].url;
        let textoEnlace = document.createTextNode("Get info / Tickets");
        let divParaUrl = document.createElement("div");
        let elementoUrl = document.createElement("a");
        //divParaUrl.setAttribute("class", "urlTickets");


        elementoUrl.setAttribute("href", UrlEvento);
        //elementoUrl.href = UrlEvento;
        elementoUrl.appendChild(textoEnlace);
        elementoUrl.setAttribute("target", "_blank");
        divParaUrl.appendChild(elementoUrl);


        //creo elemento genero
        let segmento = events[i].classifications[0].segment.name;
        let subGenero = events[i].classifications[0].subGenre.name;

        /*asigno clase para cambiar estilo en funcion del subGenero / a través de la API en ".genero" no se corresponde,
        por eso sacamos la info desde subgenero*/
        //...........................................

        let divParaSegmento = document.createElement("div");
        divParaSegmento.setAttribute("class", "segmento");

        let divParaSubGenero = document.createElement("div");
        divParaSubGenero.setAttribute("class", "subGenero");
        if (subGenero == "Hard Rock") {
            divParaSubGenero.setAttribute("class", "tipoHardRock")
        }
        else if (subGenero == "Alternative Rock") {
            divParaSubGenero.setAttribute("class", "tipoAlternativeRock")
        }
        else if (subGenero == "Pop") {
            divParaSubGenero.setAttribute("class", "tipoPop")
        }
        else if (subGenero == "Hip-Hop/Rap") {
            divParaSubGenero.setAttribute("class", "tipoHipHopRap")
        }
        else {
            divParaSubGenero.setAttribute("class", "tipoOtros")
        }


        let divParaInfoGenero = document.createElement("div");

        let textoSegmento = document.createTextNode(segmento);
        let textoSubGenero = document.createTextNode(subGenero);

        divParaSegmento.appendChild(textoSegmento);
        divParaSubGenero.appendChild(textoSubGenero);

        divParaInfoGenero.appendChild(divParaSegmento)
        divParaInfoGenero.appendChild(divParaSubGenero)

        ////creo elemento foto
        let urlImagen = events[i].images[0].url;
        let divParaFoto = document.createElement("div");
        let elementoFoto = document.createElement("img");
        divParaFoto.setAttribute("class", "fotoEvento");
        elementoFoto.setAttribute("src", urlImagen);
        divParaFoto.appendChild(elementoFoto)


        // creo elemento titulo
        let elementoTitulo = document.createElement("h2");
        elementoTitulo.setAttribute("class", "rowspan=3");
        let textoTitulo = document.createTextNode(events[i].name);
        elementoTitulo.appendChild(textoTitulo);

        // creo elemento lugar
        let elementoLugar = document.createElement("h3");
        elementoLugar.setAttribute("class", "lugar");
        let textoLugar = document.createTextNode(events[i]._embedded.venues[0].city.name);
        elementoLugar.appendChild(textoLugar);

        // creo elemento fecha
        let elementoFecha = document.createElement("h3");
        elementoFecha.setAttribute("class", "fecha");
        let textoFecha = document.createTextNode(events[i].dates.start.localDate);
        elementoFecha.appendChild(textoFecha);

        // creo elemento hora
        let elementoHora = document.createElement("h3");
        elementoHora.setAttribute("class", "hora");
        let textoHora = document.createTextNode(events[i].dates.start.localTime);
        elementoHora.appendChild(textoHora);

        let elementoLugarFechaHora = document.createElement("li");
        elementoLugarFechaHora.setAttribute = ("list-style:", "none")
        elementoLugarFechaHora.appendChild(elementoLugar);
        elementoLugarFechaHora.appendChild(elementoFecha);
        elementoLugarFechaHora.appendChild(elementoHora);

        // creo un div, les incluyo el titulo y el parrafo
        let idEvento = events[i].id;
        let celdaEvento = document.createElement("button");

        celdaEvento.setAttribute("onclick", "showDetails('" + idEvento + "')");
        celdaEvento.setAttribute("class", "personal");
        celdaEvento.appendChild(divParaInfoGenero);
        celdaEvento.appendChild(divParaFoto);
        celdaEvento.appendChild(elementoTitulo);

        //creo un boton para que se oculten los detalles
        let divParaBotonVolver = document.createElement("div");
        let elementoBotonVolver = document.createElement("button");
        elementoBotonVolver.setAttribute("onclick", "hideDetails('" + idEvento + "')");
        let textoBotonVolver = document.createTextNode("Volver");
        elementoBotonVolver.appendChild(textoBotonVolver);
        divParaBotonVolver.appendChild(elementoBotonVolver)

        // creo un div, para incluir la info sobre detalles de evento
        let celdaDetalles = document.createElement("div");
        celdaDetalles.setAttribute("id", idEvento);
        celdaDetalles.setAttribute("class", "celdaDetalles")
        celdaDetalles.appendChild(elementoLugarFechaHora);
        celdaDetalles.appendChild(divParaUrl);
        celdaDetalles.appendChild(divParaBotonVolver);
        celdaDetalles.setAttribute("style", "display:none;")


        let parrafo = document.createElement("div");
        parrafo.setAttribute("class", "column");
        parrafo.appendChild(celdaEvento);
        parrafo.appendChild(celdaDetalles);


        if (i % 3 === 0) {
            let elementoFila = document.createElement("div");
            elementoFila.setAttribute("class", "row col-xs-4");
            elementoFila.appendChild(parrafo);

        }
        document.getElementById("events").appendChild(parrafo);
        console.log()
    }
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
            let e = document.getElementById("totalEvents");
            e.innerHTML = json.page.totalElements + " events found." +'<img src="/images/marcadorpeke.png"/>';
            showEventsByDate(events);
            jsonSaved = json;
            initMap(positionActual, events);
            document.getElementById("fechFin").value = "";
            document.getElementById("fechInicial").value = "";
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });
}

function showEventsByDate(events) {
    document.getElementById("events").innerHTML = "";
    for (let i = 0; i < events.length; i++) {
                
        //creo elemento URL
        let UrlEvento = events[i].url;
        let textoEnlace = document.createTextNode("Get info / Tickets");
        let divParaUrl = document.createElement("div");
        let elementoUrl = document.createElement("a");
        //divParaUrl.setAttribute("class", "urlTickets");


        elementoUrl.setAttribute("href", UrlEvento);
        //elementoUrl.href = UrlEvento;
        elementoUrl.appendChild(textoEnlace);
        elementoUrl.setAttribute("target", "_blank");
        divParaUrl.appendChild(elementoUrl);


        //creo elemento genero
        let segmento = events[i].classifications[0].segment.name;
        let subGenero = events[i].classifications[0].subGenre.name;

        /*asigno clase para cambiar estilo en funcion del subGenero / a través de la API en ".genero" no se corresponde,
        por eso sacamos la info desde subgenero*/
        //...........................................

        let divParaSegmento = document.createElement("div");
        divParaSegmento.setAttribute("class", "segmento");

        let divParaSubGenero = document.createElement("div");
        divParaSubGenero.setAttribute("class", "subGenero");
        if (subGenero == "Hard Rock") {
            divParaSubGenero.setAttribute("class", "tipoHardRock")
        }
        else if (subGenero == "Alternative Rock") {
            divParaSubGenero.setAttribute("class", "tipoAlternativeRock")
        }
        else if (subGenero == "Pop") {
            divParaSubGenero.setAttribute("class", "tipoPop")
        }
        else if (subGenero == "Hip-Hop/Rap") {
            divParaSubGenero.setAttribute("class", "tipoHipHopRap")
        }
        else {
            divParaSubGenero.setAttribute("class", "tipoOtros")
        }


        let divParaInfoGenero = document.createElement("div");

        let textoSegmento = document.createTextNode(segmento);
        let textoSubGenero = document.createTextNode(subGenero);

        divParaSegmento.appendChild(textoSegmento);
        divParaSubGenero.appendChild(textoSubGenero);

        divParaInfoGenero.appendChild(divParaSegmento)
        divParaInfoGenero.appendChild(divParaSubGenero)

        ////creo elemento foto
        let urlImagen = events[i].images[0].url;
        let divParaFoto = document.createElement("div");
        let elementoFoto = document.createElement("img");
        divParaFoto.setAttribute("class", "fotoEvento");
        divParaFoto.setAttribute("id", "divFoto");
        elementoFoto.setAttribute("src", urlImagen);
        divParaFoto.appendChild(elementoFoto)


        // creo elemento titulo
        let elementoTitulo = document.createElement("h2");
        elementoTitulo.setAttribute("class", "rowspan=3");
        let textoTitulo = document.createTextNode(events[i].name);
        elementoTitulo.appendChild(textoTitulo);

        // creo elemento lugar
        let elementoLugar = document.createElement("h3");
        elementoLugar.setAttribute("class", "lugar");
        let textoLugar = document.createTextNode(events[i]._embedded.venues[0].city.name);
        elementoLugar.appendChild(textoLugar);

        // creo elemento fecha
        let elementoFecha = document.createElement("h3");
        elementoFecha.setAttribute("class", "fecha");
        let textoFecha = document.createTextNode(events[i].dates.start.localDate);
        elementoFecha.appendChild(textoFecha);

        // creo elemento hora
        let elementoHora = document.createElement("h3");
        elementoHora.setAttribute("class", "hora");
        let textoHora = document.createTextNode(events[i].dates.start.localTime);
        elementoHora.appendChild(textoHora);

        let elementoLugarFechaHora = document.createElement("li");
        elementoLugarFechaHora.setAttribute = ("list-style:", "none")
        elementoLugarFechaHora.appendChild(elementoLugar);
        elementoLugarFechaHora.appendChild(elementoFecha);
        elementoLugarFechaHora.appendChild(elementoHora);

        // creo un div, les incluyo el titulo y el parrafo
        let idEvento = events[i].id;
        let celdaEvento = document.createElement("button");

        celdaEvento.setAttribute("onclick", "showDetails('" + idEvento + "')");
        celdaEvento.setAttribute("class", "personal");
        celdaEvento.appendChild(divParaInfoGenero);
        celdaEvento.appendChild(divParaFoto);
        celdaEvento.appendChild(elementoTitulo);

        //creo un boton para que se oculten los detalles
        let divParaBotonVolver = document.createElement("div");
        let elementoBotonVolver = document.createElement("button");
        elementoBotonVolver.setAttribute("onclick", "hideDetails('" + idEvento + "')");
        let textoBotonVolver = document.createTextNode("Volver");
        elementoBotonVolver.appendChild(textoBotonVolver);
        divParaBotonVolver.appendChild(elementoBotonVolver)

        // creo un div, para incluir la info sobre detalles de evento
        let celdaDetalles = document.createElement("div");
        celdaDetalles.setAttribute("id", idEvento);
        celdaDetalles.setAttribute("class", "celdaDetalles")
        celdaDetalles.appendChild(elementoLugarFechaHora);
        celdaDetalles.appendChild(divParaUrl);
        celdaDetalles.appendChild(divParaBotonVolver);
        celdaDetalles.setAttribute("style", "display:none;")


        let parrafo = document.createElement("div");
        parrafo.setAttribute("class", "column");
        parrafo.appendChild(celdaEvento);
        parrafo.appendChild(celdaDetalles);


        if (i % 3 === 0) {
            let elementoFila = document.createElement("div");
            elementoFila.setAttribute("class", "row col-xs-4");
            elementoFila.appendChild(parrafo);

        }
        document.getElementById("events").appendChild(parrafo);
        console.log()
    }
}


function searchEventsByKeywordShowPosition() {
    latlon = positionActual.coords.latitude + "," + positionActual.coords.longitude;
    radius = "&radius=500&unit=km"
    let keyword = document.getElementById("keyword").value;
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events?apikey=h3I9tWkebYWN4j7RUCINFghyZEoQMjMi&keyword="
            + keyword,
        async: true,
        dataType: "json",
        success: function (json) {
            let events = json._embedded.events;
            console.log(events);
            let e = document.getElementById("totalEvents");
            e.innerHTML = json.page.totalElements + " events found." + '<img src="/images/marcadorpeke.png"/>';
            showEventsByKeyword(events);
            jsonSaved = json;
            initMap(positionActual, events);
            document.getElementById("keyword").value = "";
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });

}

function showEventsByKeyword(events) {
    document.getElementById("events").innerHTML = "";
    for (let i = 0; i < events.length; i++) {

        //creo elemento URL
        let UrlEvento = events[i].url;
        let textoEnlace = document.createTextNode("Get info / Tickets <br/>");
        let divParaUrl = document.createElement("div");
        let elementoUrl = document.createElement("a");
        //divParaUrl.setAttribute("class", "urlTickets");


        elementoUrl.setAttribute("href", UrlEvento);
        //elementoUrl.href = UrlEvento;
        elementoUrl.appendChild(textoEnlace);
        elementoUrl.setAttribute("target", "_blank");
        divParaUrl.appendChild(elementoUrl);


        //creo elemento genero
        let segmento = events[i].classifications[0].segment.name;
        let subGenero = events[i].classifications[0].subGenre.name;

        /*asigno clase para cambiar estilo en funcion del subGenero / a través de la API en ".genero" no se corresponde,
        por eso sacamos la info desde subgenero*/
        //...........................................

        let divParaSegmento = document.createElement("div");
        divParaSegmento.setAttribute("class", "segmento");

        let divParaSubGenero = document.createElement("div");
        divParaSubGenero.setAttribute("class", "subGenero");
        if (subGenero == "Hard Rock") {
            divParaSubGenero.setAttribute("class", "tipoHardRock")
        }
        else if (subGenero == "Alternative Rock") {
            divParaSubGenero.setAttribute("class", "tipoAlternativeRock")
        }
        else if (subGenero == "Pop") {
            divParaSubGenero.setAttribute("class", "tipoPop")
        }
        else if (subGenero == "Hip-Hop/Rap") {
            divParaSubGenero.setAttribute("class", "tipoHipHopRap")
        }
        else {
            divParaSubGenero.setAttribute("class", "tipoOtros")
        }


        let divParaInfoGenero = document.createElement("div");

        let textoSegmento = document.createTextNode(segmento);
        let textoSubGenero = document.createTextNode(subGenero);

        divParaSegmento.appendChild(textoSegmento);
        divParaSubGenero.appendChild(textoSubGenero);

        divParaInfoGenero.appendChild(divParaSegmento)
        divParaInfoGenero.appendChild(divParaSubGenero)

        ////creo elemento foto
        let urlImagen = events[i].images[0].url;
        let divParaFoto = document.createElement("div");
        let elementoFoto = document.createElement("img");
        divParaFoto.setAttribute("class", "fotoEvento");
        divParaFoto.setAttribute("id", "divFoto");
        elementoFoto.setAttribute("src", urlImagen);
        divParaFoto.appendChild(elementoFoto)


        // creo elemento titulo
        let elementoTitulo = document.createElement("h2");
        elementoTitulo.setAttribute("class", "rowspan=3");
        let textoTitulo = document.createTextNode(events[i].name);
        elementoTitulo.appendChild(textoTitulo);

        // creo elemento lugar
        let elementoLugar = document.createElement("h3");
        elementoLugar.setAttribute("class", "lugar");
        let textoLugar = document.createTextNode(events[i]._embedded.venues[0].city.name);
        elementoLugar.appendChild(textoLugar);

        // creo elemento fecha
        let elementoFecha = document.createElement("h3");
        elementoFecha.setAttribute("class", "fecha");
        let textoFecha = document.createTextNode(events[i].dates.start.localDate);
        elementoFecha.appendChild(textoFecha);

        // creo elemento hora
        let elementoHora = document.createElement("h3");
        elementoHora.setAttribute("class", "hora");
        let textoHora = document.createTextNode(events[i].dates.start.localTime);
        elementoHora.appendChild(textoHora);

        let elementoLugarFechaHora = document.createElement("li");
        elementoLugarFechaHora.appendChild(elementoLugar);
        elementoLugarFechaHora.appendChild(elementoFecha);
        elementoLugarFechaHora.appendChild(elementoHora);

        // creo un div, les incluyo el titulo y el parrafo
        let idEvento = events[i].id;
        let celdaEvento = document.createElement("button");

        celdaEvento.setAttribute("onclick", "showDetails('" + idEvento + "')");
        celdaEvento.setAttribute("class", "personal");
        celdaEvento.appendChild(divParaInfoGenero);
        celdaEvento.appendChild(divParaFoto);
        celdaEvento.appendChild(elementoTitulo);

        //creo un boton para que se oculten los detalles
        let divParaBotonVolver = document.createElement("div");
        let elementoBotonVolver = document.createElement("button");
        elementoBotonVolver.setAttribute("onclick", "hideDetails('" + idEvento + "')");
        let textoBotonVolver = document.createTextNode("Volver");
        elementoBotonVolver.appendChild(textoBotonVolver);
        divParaBotonVolver.appendChild(elementoBotonVolver)

        // creo un div, para incluir la info sobre detalles de evento
        let celdaDetalles = document.createElement("div");
        celdaDetalles.setAttribute("id", idEvento);
        celdaDetalles.setAttribute("class", "celdaDetalles")
        celdaDetalles.appendChild(elementoLugarFechaHora);
        celdaDetalles.appendChild(divParaUrl);
        celdaDetalles.appendChild(divParaBotonVolver);
        celdaDetalles.setAttribute("style", "display:none;")


        let parrafo = document.createElement("div");
        parrafo.setAttribute("class", "column");
        parrafo.appendChild(celdaEvento);
        parrafo.appendChild(celdaDetalles);


        if (i % 3 === 0) {
            let elementoFila = document.createElement("div");
            elementoFila.setAttribute("class", "row col-xs-4");
            elementoFila.appendChild(parrafo);

        }
        
        document.getElementById("events").appendChild(parrafo);
        console.log()
    }
}





function initMap(position, events) {
    let mapDiv = document.getElementById('map');
    let map = new google.maps.Map(mapDiv, {
        center: { lat: position.coords.latitude, lng: position.coords.longitude },
        zoom: 3

    });
    for (let i = 0; i < events.length; i++) {
        addMarker(map, events[i], events);
    }
}

function addMarker(map, event, events) {
    let marker = new google.maps.Marker({
        position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
        animation: google.maps.Animation.DROP,
        map: map,
        icon: '/images/free-map-marker-icon-green-darkerPEKE.png'

    });
    //marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    let texto = '';
    for (let i = 0; i < events.length; i++) {
        if (event._embedded.venues[0].name === events[i]._embedded.venues[0].name) {
            texto += '<a href="' + events[i].url + '" target="_blank">' + events[i].name + '</a> </br>'
        }
    }
    let infoWindow = new google.maps.InfoWindow({
        content: texto
    });
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
    console.log(marker);
}
getLocation();


/*--------------------------------------------------------------*/
function listadoOn() { /*filtro para mostrar listado de los resultados*/
    $("#listadoEvents").show();
    $("#map").hide();
}

function listadoOff() { /*filtro para mostrar resultados en el mapa*/
    $("#listadoEvents").hide();
    $("#map").show();
}


/*--------------------------------------------------------------*/
function showDetails(id) { /*al hacer click en el boton del evento, se muestren los detalles*/

    $("#" + id).show();

}
function hideDetails(id) { /*al hacer click en el boton del volver, se oculten los detalles*/

    $("#" + id).hide();

}