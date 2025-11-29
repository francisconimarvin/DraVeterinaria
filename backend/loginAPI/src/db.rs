use rust_oracle::{ConnectionPool, Error};
use std::env;
use std::path::PathBuf;
use dotenv::dotenv;

// Función para inicializar el pool de conexiones de forma portable
pub async fn init_db_pool() -> Result<ConnectionPool, Error> {
    dotenv().ok(); 

    // 1. Lógica de Portabilidad para TNS_ADMIN
    let tns_admin_relative = env::var("TNS_ADMIN").expect("TNS_ADMIN debe estar definido en .env");
    let current_dir = env::current_dir().map_err(|e| Error::Other(format!("Error al obtener el directorio actual: {}", e)))?;
    let tns_admin_path: PathBuf = current_dir.join(tns_admin_relative);
    
    // Establecer la variable de entorno TNS_ADMIN con la ruta absoluta generada
    env::set_var("TNS_ADMIN", &tns_admin_path);

    println!("TNS_ADMIN configurado de forma portable a: {}", tns_admin_path.display()); 

    // 2. Obtiene las credenciales
    let user = env::var("DB_USER").expect("DB_USER debe estar definido en .env");
    let password = env::var("DB_PASSWORD").expect("DB_PASSWORD debe estar definido en .env");
    let service_name = env::var("DB_SERVICE_NAME").expect("DB_SERVICE_NAME debe estar definido en .env");

    // 3. Configuración y Creación del Pool
    let pool_config = rust_oracle::PoolConfig::new()
        .min_size(1)
        .max_size(10)
        .increment(2);

    let pool = ConnectionPool::new(&user, &password, &service_name, &pool_config)?;
    
    println!("Pool de conexiones a Oracle creado exitosamente.");
    
    Ok(pool)

    // 4. Prueba de Conexión
    pub async fn test_connection(pool: &ConnectionPool) -> Result<(), Error> {
    println!("Probando conexión a la base de datos...");
    
    // Obtiene una conexión del pool
    let mut conn = pool.get_conn()?;

    // Ejecuta una consulta simple para verificar la conectividad
    let sql = "SELECT 1 FROM DUAL";
    let result: i32 = conn.query_row(sql, &[], |row| row.get::<i32, _>(0))?;
    
    if result == 1 {
        println!("Prueba de conexión exitosa. Resultado de DUAL: {}", result);
        Ok(())
    } else {
        Err(Error::Other("La consulta a DUAL no devolvió 1. Fallo de conexión o configuración.".to_string()))
    }
}
}