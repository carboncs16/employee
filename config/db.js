const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || `postgres://${process.env.POSTGRE_DB_USER}:${process.env.POSTGRE_DB_PASSWORD}@${process.env.POSTGRE_DB_HOST}:${process.env.POSTGRE_DB_PORT}/${process.env.POSTGRE_DB_DATABASE}`
});

pool.on('connect', () => {
    console.log('db connected');
    // pool.query(`CREATE TABLE IF NOT EXISTS emp
    // (id SERIAL PRIMARY KEY,
    // employee_name VARCHAR(100) NOT NULL,
    // email VARCHAR(100) NOT NULL,
    // phone_number VARCHAR(100) NOT NULL)`);
});
pool.on('error', (err) => {
    console.log(err); 
});
pool.on('remove', () => {
    console.log('db disconnected');
})

module.exports = pool;