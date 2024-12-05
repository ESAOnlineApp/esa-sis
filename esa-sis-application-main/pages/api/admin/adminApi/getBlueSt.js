const { connect, disconnect } = require("../../../../utilities/db");
const { getStudentFromBlueForLogs } = require("../../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  const connection = await connect();
  try {
    const { student_id } = req.body;
    const data = await getStudentFromBlueForLogs(connection, student_id);

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
