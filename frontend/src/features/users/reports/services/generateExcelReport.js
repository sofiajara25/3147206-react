// Libreroa para manipulación y generacion de archivos Excel
import * as XLSX from "xlsx";

// Función utilitaria para generar un archivo Excel a partir de datos tabulares
// patron: exportacion de datos (datase => archivo descargable)
export function generateExcelReport({
    headers,        //Array de encabezados (colmnas)
    rows,   //Array de filas (Array de Arrays )
    fileName = "user-report.xlsx" // Nombre del archivo de salida
}) {
    const currentDate = new Date().toLocaleDateString();
    const reportTitle = `=========== REPORTE DE USUARIOS - ${ currentDate } ==========`
    //Estructura final de la hoja
    //Primera fila = headers
    // Siguientes filas = datos
    const worksheetData = [
        [reportTitle],
        [],
        headers,
        ...rows
    ];

    // Convierte un Array de arrays (AOA = Array of Arrays) en una hoja de Excel
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    //Merge visual
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    worksheet["!merges"] = [{
        s: { r: 0, c: 0 },
        e: { r: 0, c: range.e.c }
    }];


    // Ancho columnas
    worksheet["!cols"] = headers.map(() => ({ wch: 25 }));

    // Altura fila título (simulacion impacto visual)
    worksheet["!rows"] = [{ hpt: 25 }];

    // Crea un nuevo libro de Excel (workbook)
    const workbook = XLSX.utils.book_new();

    //Agrega la hoja al libro con el nombre "usuarios"
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

    // Genra y descarga el archivo Excel en el cliente
    XLSX.writeFile(workbook, fileName)
}