// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// • • • • • • • • • • •RELOJ • • • • • • • • • • •
function verHora() {
    let mihora = new Date();
    let horas = mihora.getHours().toString();
    let minutos = mihora.getMinutes().toString();
    if (minutos.length == 1) minutos = "0" + minutos;
    let segundos = mihora.getSeconds().toString();
    if (segundos.length == 1) segundos = "0" + segundos;
    document.forms[0].miReloj.value = horas + " : " + minutos + " : " + segundos;
}
// • • • • • • • • • • •

//~~~~~~~~~~~tabla en vista:
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


