//Libreria para generacion de PDF en el cliente
import jsPDF from "jspdf";

//plugin para creacion de tablas dentro eddl PDF 
import autoTable from "jspdf-autotable";

// Función utilitaria para generar un reporte en PDF
// Patron: exportacion de datos ( dataset => documento estructurado)

export function generatePdfReport({
    headers, // Emcabezados de la tabla ( columnas)
    rows, // Datos (array de filas)
    fileName = "user-report.pdf", // Nombre del archivp de salida
}) {
    //Inicializa el dicumentp PDF
    const doc = new jsPDF();

    //Configuracion del titulo 
    doc.setFontSize(16);
    doc.text("Reporte de UsuAarios", 14, 20); // Posicion (x,y)

    // Generacion de tabla automatica
    autoTable(doc, {
        startY: 39, // Posicion inicial debajo del titulo

        head: [headers], //Encabezados (debe ser array de arrays)
        body: rows, // Filas del reporte

        theme: "grid", // Estilo visual de la tabla

        // Estilos del encabezado
        headStyles: {
            fillColor: [33, 150, 243], // Clor de fondo (RGB)
            textClor: 255, //Clor del texto
            fontSize: 11,
        },

        // Estilos globales de las celdas
        styles: {
            fontSize: 10,
        },

        // Márgenes del documento
        margin: {
            left: 14,
            right: 14,
        },
    });
    //Genera y descarga el  archivo PDF
    doc.save(fileName);
}