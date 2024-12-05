const { connect , disconnect} = require("../utilities/db");

const { exec } = require('child_process');

// Function to restart the server
function restartServer() {
  console.log('Restarting the server...');
  exec('pm2 restart all', (error, stdout, stderr) => { // Replace with your server restart command
    if (error) {
      console.error(`Error restarting server: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });
}

// Function to check the connection
async function checkConnection() {
  const client = await connect();
  if (client.success === false) {
    restartServer();
  } else {
    console.log('Database connection is healthy');
    await disconnect(client);
  }
}

// Run the check immediately and then every 5 minutes
checkConnection();
setInterval(checkConnection, 300000); // 300000 ms = 5 minutes
