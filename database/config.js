import mysql from 'mysql2/promise';


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection().then(connection => {
    console.log('Database connection established');
    connection.release();
}).catch(error => {
    console.error('Error connecting to the database:', error);
});

export default pool;