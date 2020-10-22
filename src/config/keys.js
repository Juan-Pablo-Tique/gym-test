const keys = {};

keys.PORT = process.env.PORT || 3000;

keys.DBKEYS = {
  database: {
    connectionLimit: process.env.CONNECTION_LIMIT,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
  }
};

keys.SEED = process.env.SEED;
keys.EXPIRESIN = process.env.EXPIRESIN;

module.exports = keys;