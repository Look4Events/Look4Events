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
    //let listaImagenesDeEventos = [];
    for (let i = 0; i < events.length; i++) {
        
        console.log(events[i].name);
        console.log(events[i].type);
        console.log(events[i].url);
        console.log(events[i].classifications);
        console.log(events[i].dates.start.localDate);
        console.log(events[i].dates.start.localTime);
        console.log(events[i].images);
        console.log();
        //...........................................
        //let ResultadoImagen = events[i].images;

        //listaImagenesDeEventos.push
        //    ({ imagen1: ResultadoImagen[0] });








        //saco array "classifications"
        //let genero = [];
        //for (let j = 0; j < events[i].classifications.length; j++) {
        //    let genre = (events[i].classifications[j].genre.name)
        //    console.log(events[i].classifications[j].segment.name)
        //    console.log(events[i].classifications[j].subGenre.name)
        //}
        //genero.push({})

        ////saco array "images"
        //for (let j = 0; j < events[i].images.length; j++) {
        //    let image = (events[i].images[j].url)
        //}

        ////creo elemento foto
        let urlImagen = events[i].images[0].url;
        let divParaFoto = document.createElement("div");
        let elementoFoto = document.createElement("img");
        divParaFoto.setAttribute("class", "fotoEvento");
        elementoFoto.setAttribute("src", urlImagen);
        divParaFoto.appendChild(elementoFoto)
        console.log(events[i].images)
            //< div class="col-md-4" > <img src="imagenPrueba/2.jpg" alt="" class="img-responsive" style="overflow: hidden"></div>

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
        celdaEvento.appendChild(divParaFoto);
        celdaEvento.appendChild(elementoTitulo);
        celdaEvento.appendChild(elementoParrafo);

        //creo un div para unir lo anterior, a la imagen
        //let cuadradito = document.createElement("div");
        //cuadradito.appendChild(celdaEvento);
        //cuadradito.appendChild(imagenFoto);


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

//var optionTarget;

//$(":radio").click(function (e) {
//    e.preventDefault();
//    optionTarget = e.target;
//    $("#change-view").show();
//    $("#map").show();
//});

//$("#change-view button").click(function () {
//    $("#change-view").hide();
//    $("#map").hide();
//});

//$("#view-btn").click(function () {
//    $(optionTarget).prop('checked', true);
//});









//var FormStuff = {

//    init: function () {
////        // kick it off once, in case the radio is already checked when the page loads
//        this.conditionMap();
//        this.whenConditionChanges();
//    },

//    whenConditionChanges: function () {
////        // when a radio or checkbox changes value, click or otherwise
//        $("input[type='radio']").on("change", this.conditionMap);
//    },

//    conditionMap: function () {
//        // find each input that may be hidden or not
//        $(".require-if-active").each(function () {
//            var el = $(this);
//            // find the pairing radio or checkbox
//            if ($(el.data("require-pair")).is(":checked")) {
//                // if its checked, the field should be required
//                el.prop("required", true);
//            } else {
//                // otherwise it should not
//                el.prop("required", false);
//            }
//        });
//    }

//};
//FormStuff.init();

function listadoOn() {
    $("#filaResults").show();
    $("#map").hide();
}

function listadoOff() {
    $("#filaResults").hide();
    $("#map").show();
}
