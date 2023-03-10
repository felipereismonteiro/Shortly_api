import pkg from "pg";

const { Pool } = pkg;

export const connectionDB = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
