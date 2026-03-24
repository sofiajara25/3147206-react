import { Input, Button } from "@/shared";

export default function UserRegisterFrom() {

    // Handle

    const handleNameChange = (e) => {
        console.log("Nombre: ", e.target.value)
    }

    const handleEmailBlur = (e) => {
        console.log("Email: ", e.target.value)
    }

    return (
        <div>
            <h1 className="text-text-primary text-2xl mb-6">
                Registro de usuarios
            </h1>
            <form className="grid grid-cols-1 items-center ">
                {/* Inputs */}
                <div className="grid grid-cols-2 gap-6 my-0 mx-auto">
                    <Input
                        label="Nombre"
                        placeholder="Ingrese su nombre"
                        onChange={handleNameChange}
                    />
                    <Input
                        label="Teléfono"
                        placeholder="Ingrese su teléfono"
                        type="tel"
                    />
                    <Input
                        label="Correo"
                        placeholder="Ingrese su correo"
                        type="email"
                        onBlur={handleEmailBlur}
                    />
                    <Input
                        label="Contraseña"
                        placeholder="Ingrese su contraseña"
                        type="password"
                    />
                    <Input
                        label="Edad"
                        placeholder="Ingrese su edad"
                        type="number"
                    />
                    <Input
                        label="Correo"
                        placeholder="Ingrese su correo"
                        type="email"
                        onBlur={handleEmailBlur}
                    />
                    <Input
                        label="Contraseña"
                        placeholder="Ingrese su contraseña"
                        type="password"
                    />
                    <Input
                        label="Edad"
                        placeholder="Ingrese su edad"
                        type="number"
                    />
                    {/* Action */}
                    <div className="flex items-end justify-end gap-12">
                        <Button variant="primary" size="sm">
                            Guardar
                        </Button>

                        <Button variant="primary" size="md">
                            Cancelar
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}