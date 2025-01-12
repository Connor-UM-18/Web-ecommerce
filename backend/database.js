import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const DEFAULT_DB_CONFIG = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'estilo_exquisito_db'
}

// Crear la conexión a la base de datos
const connectionString = process.env.MYSQL_ADDON_URI;

let connection;

try {
  // Intentar conectar usando la cadena de conexión de las variables de entorno
  if (connectionString) {
    connection = await mysql.createConnection(connectionString);
    await connection.connect();
    console.log('Connected to the database using environment variables');
    console.log('Connection host:', connection.config.host);
  } else {
    throw new Error('Environment variable for connection string not found');
  }
} catch (err) {
  console.error('Error connecting using environment variables:', err.message);
  try {
    // Si falla, intentar conectar usando la configuración por defecto
    connection = await mysql.createConnection(DEFAULT_DB_CONFIG);
    await connection.connect();
    console.log('Connected to the database using default configuration');
    console.log('Connection host:', connection.config.host);
  } catch (defaultErr) {
    console.error('Error connecting to the database with default configuration:', defaultErr.message);
    process.exit(1); // Salir del proceso si no se puede conectar de ninguna forma
  }
}

export default connection;