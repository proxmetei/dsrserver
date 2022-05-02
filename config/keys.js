const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    post: 5433,
    database: "postgres"
})