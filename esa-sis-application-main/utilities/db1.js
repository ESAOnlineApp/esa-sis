// // import { Pool } from 'pg'

// import { Client } from "pg";

// // import { Client } from "pg"
// const { Client } = require('pg');

// const pool = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: '0000',
//   port: 5432,
// })
// let ne = pool.connect();
// // console.log(ne)
// // export default pool

const { Client } = require("pg");

// const client = new Client({
//   user: env.user,
//   host: env.host,
//   database: env.database,
//   password: env.password,
//   port: env.port,
// });

// const client = new Client({
//   user: env.user,
//   host: env.host,
//   database: env.database,
//   password: env.password,
//   port: env.port,
// });
let connected = false;
async function connect() {
  try {
    const connection = new Client({
      user: process.env.user,
      host: process.env.host,
      database: process.env.database,
      password: process.env.password,
      port: process.env.port,
    });

    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          // console.error(`Error establishing connection: ${err.message}`);
          reject(err);
        } else {
          resolve();
        }
      });
    });
    // console.log('Connection To DB Established');
    connection._connected = true;
    connected = true;
    connection.message = "Connection To DB Established";
    return connection;
  } catch (err) {
    //console.error(`Error establishing connection: ${err.message}`);
    let result;
    switch (err.code) {
      case "ECONNREFUSED":
        console.error(`Connection refused`);
        result = "Connection refused";
        break;
      case "ENOTFOUND":
        console.error(`Host not found`);
        result = "Host not found";
        break;
      case "ENETUNREACH":
        console.error(`No Internet connection`);
        result = "No Internet connection";
        break;
      case "ER_ACCESS_DENIED_ERROR":
        console.error(`Access denied, check username and password`);
        result = "Access denied, check username and password";
        break;
      case "ER_BAD_DB_ERROR":
        console.error(`Database not found`);
        result = "Error: Database not found";
        break;
      default:
        console.error(`Uncaught error: ${err.message}`);
        result = err.message;
    }

    return {
      success: false,
      message: `Error establishing connection: ${result}`,
    };

    //=======
    //    console.error(`Error Establishing Connection To DB: ${err.message}`);
    //    return { success: false, message: `Error Establishing Connection To DB: ${err.message}` };

    //>>>>>>> master
  }
}

async function disconnect(connection) {
  try {
    if (connected) {
      await connection.end();
      // console.log('Connection To DB Released');
    } else {
      console.error(`No connection was established to release`);
      return { message: `No connection was established to release` };
    }
  } catch (err) {
    console.error(`Error releasing connection: ${err.message}`);
    return { message: `Error releasing connection: ${err.message}` };
    //=======
    //      console.error(`Error Releasing Connection To DB: ${err.message}`);
    //    }
    //  } catch (err) {
    //    console.error(`Error Releasing Connection To DB: ${err.message}`);
    //
    //>>>>>>> master
  }
}
// client.connect();

// module.exports = {
//   default: client,
// };

module.exports = { connect, disconnect };
