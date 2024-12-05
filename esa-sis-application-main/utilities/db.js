
const { Pool } = require("pg");
const dotenv = require("dotenv");


dotenv.config(); // Assuming the .env file is in the root of your project

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.PORTS,
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Error with database pool', err);
  process.exit(-1); // Exit the process on a database error
});

async function connect() {
  try {
    const client = await pool.connect();
    console.log('Connection to database pool established');
    return client;
  } catch (err) {
    console.error(`Error establishing connection: ${err.message}`);
    return {
      success: false,
      message: `Error establishing connection: ${err.message}`,
    };
  }
}

async function disconnect(client) {
  console.log('the client ending : ',client._ending)
  try {
    if (!client || client._ending===undefined || client._ending) {
      console.log('No active connection to release');
      return;
    }
    await client.release();
    console.log('Connection to database pool released');
  } catch (err) {
    console.error(`Error releasing connection: ${err.message}`);
    return { message: `Error releasing connection: ${err.message}` };
  }
}

// executing query
const executeQuery = (client, query, arraParms) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await client.query(query, arraParms);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  })
}

module.exports = { executeQuery, connect, disconnect };
