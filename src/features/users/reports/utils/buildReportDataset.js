// Funcion utilitaria para construir el dataset de  un reporte (tala)
// Patron: transformacion de datos (input -> output listo para exportar)

export function buildReportDataset({
    users,      //Array de usuarios origen
    selectedFields, // Campos seleccionados para el reporte [{key,label}]
    scope,      //Alcance del reporte: "all 1 "document
    documentNumber // Numero de documento para filtrar (si place)
}) {
    // Copia inmutable del array original (evita mutacioness)
    let filteredUsers = [...users];

    // Filtro por el alcance si es por documento, se aplica filtro especifico
    if (scope === "document" && documentNumber) {
        filteredUsers = filteredUsers.filter(
            (user) => user.document_number === documentNumber
        );
    }

    // Construccion de emcabezados del reporte
    // Se toma e  abel de cada campo seleccionado
    const headers = selectedFields.map((field) => field.label);

    // Construccion de filas del reporte
    // Cada usuario se transforma en un array de valores ssegpun los campos seleccionados
    const rows = filteredUsers.map((user) =>
        selectedFields.map((field) => {
            const value = user[field.key]; //Acceso dinamico a la propiedad))
            // Normalizacion: evita undefined o null en el reporte
            return value ?? "";
        })
    );

    // Estructura final desacoplada de la UI
    // Lista para exportar e Excel, PDF, o renderizar en tabla
    return {
        headers, // Array de strings (columnas)
        rows  //Array de Arrays (filas)
    };

}