const Pool = require("pg").Pool;

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_name = process.env.DB_NAME;

const pool = new Pool({
  user: db_user,
  password: db_pass,
  host: "localhost",
  port: 5432,
  database: db_name,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
