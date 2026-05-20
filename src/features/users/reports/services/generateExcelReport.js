//libreria para manipualcion y generacion de archivos excel 
import * as XLSX from "xlsx";

//funcion utilitaria para generar un archivo excel a partir de datos tabulares
//patron: exportacion de datos (dataset -> archivo descragable)
export function generateExcelReport({
    headers,    //Array de string (columnas)
    rows,       //Array de arrays (filas)
    fileName = "user-report.xlsx"   //nombre del archivo de salida
}) {

    //Estructura final de la hoja:
    // primera fila  = headers
    //siguiente files = datos
    const worksheetData = [
        headers,
        ...rows
    ];

    //convierte un array de arrays (AOA = array of arrays en una hoja de excel)
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    //crea un nuevo libro de excel (workbook)
    const workbook = XLSX.utils.book_new();

    //agrega la hoja al libro con el nombre "usuarios"
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

    //genera y descraga el archivo excel en el cliente
    XLSX.writeFile(workbook, fileName);
}