const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',         // Your PostgreSQL username
    host: 'localhost',         // Database host (usually localhost)
    database: 'sports', // Your database name
    password: 'upee', // Your PostgreSQL password
    port: 5432,                // Default PostgreSQL port
});

module.exports = pool;
