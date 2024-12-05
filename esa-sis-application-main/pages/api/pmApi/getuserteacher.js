const { connect, disconnect } = require("../../../utilities/db");
const { getUserTeacher } = require("../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    const { pmID } = req.body;
    const data = await getUserTeacher(connection, pmID);
    await disconnect(connection);
    return res.status("200").send(data);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status("500").send(error);
    // return error;
  }
}
export default handler;
// module.exports = handler;
