// frontend/src/features/access/accessService.js

const API_URL = "http://localhost:4000/api/access";

export async function hasPermission(permissionCode) {
    const token = sessionStorage.setItem("token");

    const response = await fetch(`${API_URL}/check/${permissionCode}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error verificando permiso");
    }

    return response.json();
}