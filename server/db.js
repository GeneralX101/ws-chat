const promise = require("bluebird");
const pgp = require("pg-promise")({
  promiseLib: promise,
});

const db = pgp(process.env.DATABASE_URL);

module.exports = db;
