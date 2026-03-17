export default function Input({
    label,
    type = "text",
    ...props
}) {
    // Cuerpo de la función 
    return (
        // Contenedor del input que se exporta con label, cuerpo y feedback message
        <div className="w-[320px]">
            {/* Label */}
            <label
                className="
                    block
                    text-caption
                    mb-1
                    text-text-primary
                 "
            >
                {label}
            </label>

            {/* Contenedor del input */}
            <div>

                {/* Area interactiva invisible de un input 48px */}

                <div
                    className="
                        absolute
                        inset-0
                     "
                    onMouseDown={(e) => {
                        e.preventDefault();
                        // Mueve el foco al siguiente elemento hermano del elemento atual.
                        // `currentTarget` referencia el elemento que tiene el heandler del evento.
                        // `nextSibling` obtiene el siguiente nodo en el DOM (puede ser un input u otro elemento)
                        // `focus()` cambia el foco del usuario hacia ese elemento
                        e.currentTarget.nextSibling.focus();
                    }}
                ></div>

                {/* Area visual del input */}

                <input
                    className="
                        relative
                        w-full
                        h-12
                        rounded-md
                        border
                        border-border
                        px-4
                        text-base

                        focus:outline-none
                        focus:right-2
                        focus:right-focus-ring
                        focus:border-focus-border
                    "
                    {...props} 
                    />
            </div>

            {/* Feedback message */}
            <div>

            </div>

        </div>
    )
};