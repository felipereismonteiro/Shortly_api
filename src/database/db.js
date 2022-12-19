import pkg from "pg";

const { Pool } = pkg;

export const connectionDB = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'felipe1210',
    database: 'shortly_api'
});