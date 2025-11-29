use serde::{Deserialize, Serialize};

// Estructura que mapea el JSON de la petición (POST /login)
#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

// Estructura para la respuesta JSON
#[derive(Debug, Serialize)]
pub struct LoginResponse {
    pub success: bool,
    pub message: String,
}