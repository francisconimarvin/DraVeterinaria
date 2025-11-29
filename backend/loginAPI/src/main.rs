use actix_web::{web, App, HttpServer};
use rust_oracle::ConnectionPool;

mod db;
mod handlers;
mod models;

type DbPool = web::Data<ConnectionPool>;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    // 1. Inicializa el pool
    let pool = match db::init_db_pool().await {
        Ok(p) => p,
        Err(e) => {
            eprintln!("Fallo al inicializar el Pool de DB. Verifica TNS_ADMIN, wallet y credenciales. Error: {}", e);
            std::process::exit(1); 
        }
    };
    
    // 2. ¡EJECUTAR PRUEBA DE CONEXIÓN!
    match db::test_connection(&pool).await {
        Ok(_) => {
            println!("Servidor listo para iniciar...");
        }
        Err(e) => {
            eprintln!("FALLO CRÍTICO en la prueba de conexión a Oracle: {}", e);
            eprintln!("Asegúrate de que la BD de Oracle Cloud esté activa y el servicio '{}' sea correcto.", 
                      env::var("DB_SERVICE_NAME").unwrap_or_default());
            std::process::exit(1); 
        }
    }
    
    // 3. Continúa con la inicialización del servidor
    let pool_data: DbPool = web::Data::new(pool);

    HttpServer::new(move || {
        App::new()
            .app_data(pool_data.clone())
            .service(
                web::resource("/login")
                    .route(web::post().to(handlers::login_user)) 
            )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}