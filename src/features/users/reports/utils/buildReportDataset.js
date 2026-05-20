//funcion utilitaria para construir el dataset de un reporte (tabla)
//patron: transformacion de datos  (input => output listo para exportar)
export function buildReportDataset({
    users,      //Array de usuario origen
    selectdFields,  //campos selecionados para el reporte [{ key, label }]
    scope,          //Alcance del reporte: "all" | "document"
    documentNumber  //numero de docuemnto para filtrar (si aplica)
}) {

    //copia inmutable del array original (evita mutaciones)
    let filteredUsers = [...users];

    //filtro po alcance : si es por docuemnto se aplica filtro especifico
    if (scope === "document" && documentNumber) {
        filteredUsers = filteredUsers.filter(
            (users) => users.document_number === documentNumber
        );
    }

    //construccion de encabezados del reporte
    //se toma el label de cada campo selecionado
    const headers = selectdFields.map((field) => field.label);

    //contrsuccion de filas de reporte
    //cada usuario se transforma en un array de valores segun los campos selecionados

    const rows = filteredUsers.map((user) =>
        selectdFields.map((field) => {
            const value = user[field.key] //acceso dinamico a la propiedad

            //normalizacion: evita underfined o null en el reporte
            return value ?? "";
        })

    );

    //estructura final desacoplada de la UI
    //lista para exportar a Exel, PDF o renderizar en tabla
    return {
        headers, //Array de string (columnas)
        rows,   //Array de arrays (filas)
    };
}
