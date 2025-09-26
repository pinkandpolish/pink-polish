const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME,
  options: {
    trustServerCertificate: true,
    encrypt: false,
  },
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 1433,
};

let poolPromise;
async function getPool() {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config)
      .connect()
      .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
      })
      .catch(err => {
        console.error('Database connection failed:', err.message);
        poolPromise = undefined; // allow retry on next call
        throw err;
      });
  }
  return poolPromise;
}

module.exports = { sql, getPool };
