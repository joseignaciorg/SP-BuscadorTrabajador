'use strict';

function getPersonas() {
    var nom = $("#txtNombre").val();

    //vacio la capa de resultado
    $("#resultado").empty();

    //recupero la lista para recuperar el nombre del trabajador
    var uri = _spPageContextInfo.webAbsoluteUrl + "/_api/lists/getByTitle('Trabajador')/items?$filter=nombre eq '" + nom + "'";

    //llamada ajax para recuperar
    $.ajax({
        type: "GET",
        url: uri,
        contenType: "application/json",
        headers: {
            "accept":"application/json;odata=verbose"
        },
        success:onGetresults,
        error:onError
    });
}

function onError() {
    alert(r.status);
}

function onGetresults(xhr) {
    var odata = xhr.d.results;
    var res = "<table><thead><th>Nombre</th><th>Apellidos</th><th>Edad</th><th>Salario</th><th>Alta</th></thead>";
    $.each(odata, function(i, item) {
        res += "<tr>";
        res += "<td>" + item.nombre + "</td>";
        res += "<td>" + item.apellidos + "</td>";
        res += "<td>" + item.edad + "</td>";
        res += "<td>" + item.salario + "</td>";
        res += "<td>" + item.alta + "</td>";
        res += "</tr>";
    });
    res += "</table>";
    $("#resultado").html(res);
}

$(document).ready(function() {
    $("#btnOK").click(getPersonas);
});


