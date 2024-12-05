const { connect, disconnect } = require("../../../../utilities/db");
const { addStudentActivityToLogs } = require("../../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  const connection = await connect();
  try {
    // const connection = await connect();
    const { student_id, action, result, reason, done_by, date_time } = req.body;
    const data = await addStudentActivityToLogs(
      connection,
      student_id,
      action,
      result,
      reason,
      done_by,
      date_time
    );

    return res.status("200").send(data);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status("401").send(error);
    // return error;
  } finally {
    await disconnect(connection);
    // console.log("db Released");
  }
}
export default handler;
// module.exports = handler;
