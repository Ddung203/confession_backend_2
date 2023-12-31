import mysql from "mysql2";

var myDB = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB_NAME,
});

// var myDB = mysql.createPool({
//   host: process.env.MYSQL_ADDON_HOST,
//   user: process.env.MYSQL_ADDON_USER,
//   password: process.env.MYSQL_ADDON_PASSWORD,
//   database: process.env.MYSQL_ADDON_DB,
// });

const promisePool = myDB.promise();

async function query(query, args = []) {
  var [results] = await promisePool.query(query, args);
  return results;
}

export { query };
