import React, { useState, useMemo } from 'react';

export default function Example() {

    // Definimos un estado 'txt' con valor inicial "Algo de texto"
    // setTxt es la función que permite actualizarlo
    const [txt, setTxt] = useState("Algo de texto"); //guarda un texto que se muestra en pantalla.

    // Definimos dos estados numéricos 'a' y 'b', ambos empiezan en 0
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);

    // Aquí usamos useMemo para calcular la suma de 'a' y 'b'
    // useMemo memoriza el resultado y solo lo recalcula si cambian 'a' o 'b'
    const sum = useMemo(() => {
        console.log('Calculando suma...');// Este solo a aparce en la consola si solo ejecuta cuando cambian 'a' o 'b'
        return a + b; // Retorna la suma de los dos estados
    }, [a, b]); // Las dependencias si cambian 'a' o 'b', se recalcula

    return (
        <div className='place-self-center'>
            {/* Mostramos el texto almacenado en 'txt' */}
            <p>Texot: {txt}</p>
            {/* Mostramos los valores actuales de 'a' y 'b' */}
            <p>a: {a}</p>
            <p>b: {b}</p>
            {/* Mostramos la suma calculada con useMemo */}
            <p>sum: {sum}</p>
            {/* Botón que cambia el texto */}
            <button
                className='w-32 text-left px-3 py-2 rounded-lg
                hover:bg-gray-500 focus:bg-gray-100
                transition-colors'
                onClick={() => setTxt("Sofia Jaramillo!")}>
                Escribir Texto
            </button>
            {/* Botón que incrementa el valor de 'a' en 1 */}
            <button
                className='w-32 text-left px-3 py-2 rounded-lg
                hover:bg-gray-500 focus:bg-gray-100
                transition-colors'
                onClick={() => setA(a + 1)}>
                Incrementar a
            </button>
            {/* Botón que incrementa el valor de 'b' en 1 */}
            <button
                className='w-32 text-left px-3 py-2 rounded-lg
                hover:bg-gray-500 focus:bg-gray-100
                transition-colors'
                onClick={() => setB(b + 1)}>
                Incrementar b
            </button>
        </div >
    );
}

// En nuestro componente Ejemplo de arriba, asumimos que la función sum() ejecuta un cálculo costoso. Si el estado txt se actualiza, React va a re-renderizar nuestro componente, pero como memoizamos el valor devuelto de sum, esta función no se ejecutará esta vez nuevamente.

//La única vez que la función sum() se ejecutará es si el estado a o b ha sido mutado (cambiado). Este una mejora excelente sobre el comportamiento predeterminado, el cual re-ejecutará este método sobre cada re-renderizado.



// Evitar cálculos costosos: Si tienes una función que realiza transformaciones de datos complejas, filtrados masivos o cálculos matemáticos intensivos, useMemo almacena el resultado y evita rehacerlo si los datos de entrada son los mismos.

// Omitir el renderizado de componentes secundarios: Cuando pasas un objeto o array como prop a un componente envuelto en React.memo(), useMemo asegura que la referencia del objeto sea la misma entre renderizados, evitando que el componente secundario se vuelva a renderizar innecesariamente.

// Memoizar dependencias de otros Hooks: Si usas un objeto o array como dependencia en un useEffect o useCallback, useMemo puede prevenir que ese efecto se ejecute innecesariamente al mantener la estabilidad de la referencia de la dependencia.

// Procesamiento de listas grandes: Filtrar o transformar una lista enorme que depende de una búsqueda, pero que no debería recalcularse si el usuario solo interactúa con otra parte de la interfaz