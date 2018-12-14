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
                console.log(listadoResultados[i].name);
                console.log(listadoResultados[i].type);
                console.log(listadoResultados[i].url);
                console.log(listadoResultados[i].classifications);
                console.log(listadoResultados[i].dates.start.localDate);
                console.log(listadoResultados[i].dates.start.localTime);
                console.log(listadoResultados[i].images);
                console.log();
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
        elementoTitulo.setAttribute("class", "rowspan=3");
        let textoTitulo = document.createTextNode(json[i].name);
        elementoTitulo.appendChild(textoTitulo);

        // creo elemento parrafo
        let elementoParrafo = document.createElement("li");
        let textoParrafo = document.createTextNode(json[i].dates.start.localDate + " /  Hora: " + json[i].dates.start.localTime + " / Ciudad: " + json[i]._embedded.venues[0].city.name);
        elementoParrafo.appendChild(textoParrafo);

        // creo un div, les incluyo el titulo y el parrafo
        let celdaEvento = document.createElement("button");
        //<button id="volver" onclick="location.href='page2.html'">page2</button>
        celdaEvento.setAttribute("onclick", "location.href='/Home/Prueba'");
        celdaEvento.setAttribute("class", "personal");
        celdaEvento.appendChild(elementoTitulo);
        celdaEvento.appendChild(elementoParrafo);


        //let texto = document.createTextNode(json[i].name);
        let parrafo = document.createElement("div");
        parrafo.setAttribute("class", "column");
        parrafo.appendChild(celdaEvento);
        //let filaResults = document.getElementById("filaResults");

        //filaResults.appendChild(parrafo);
        //document.getElementById("filaResults").appendChild(parrafo);

        if (i % 3 === 0) {
            let elementoFila = document.createElement("div");
            elementoFila.setAttribute("class", "row col-xs-4");
            elementoFila.appendChild(parrafo);

        }
        document.getElementById("filaResults").appendChild(parrafo);
    }
}
