const { connect, disconnect } = require("../../../../utilities/db");
const { getAllMajors } = require("../../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  const connection = await connect();
  try {
    const data = await getAllMajors(connection);

    return res.status("200").send(data);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status("401").send(error);
    // return error;
  } finally {
    await disconnect(connection);
  }
}
export default handler;
// module.exports = handler;
