use actix_web::{web, HttpResponse, Responder};
use rust_oracle::ConnectionPool;

// Estructuras de datos desde nuestro módulo models
use crate::models::{LoginRequest, LoginResponse};

// alias para el tipo de dato compartido (DbPool)
type DbPool = web::Data<ConnectionPool>;

// Handler para la petición POST a /login
pub async fn login_user(pool: DbPool, req: web::Json<LoginRequest>) -> impl Responder {
    // 1. Obtener una conexión del pool
    let mut conn = match pool.get_conn() {
        Ok(c) => c,
        Err(e) => {
            eprintln!("Error al obtener conexión del pool: {}", e);
            return HttpResponse::InternalServerError().json(LoginResponse {
                success: false,
                message: "Error interno del servidor (fallo en pool de DB)".to_string(),
            });
        }
    };

    // 2. Sentencia SQL para la verificación de credenciales
    let sql = "SELECT COUNT(*) FROM USERS WHERE USERNAME = :1 AND PASSWORD = :2";

    let result = conn.query_row(
        sql, 
        &[&req.username, &req.password],
        |row| row.get::<i32, _>(0)       
    );

    match result {
        Ok(count) if count > 0 => {
            // Login exitoso
            HttpResponse::Ok().json(LoginResponse {
                success: true,
                message: "Login exitoso.".to_string(),
            })
        }
        Ok(_) => {
            // Credenciales incorrectas
            HttpResponse::Unauthorized().json(LoginResponse {
                success: false,
                message: "Usuario o contraseña incorrectos.".to_string(),
            })
        }
        Err(e) => {
            // Error de base de datos
            eprintln!("Error al ejecutar consulta de login: {}", e);
            HttpResponse::InternalServerError().json(LoginResponse {
                success: false,
                message: "Error al consultar la base de datos.".to_string(),
            })
        }
    }
}