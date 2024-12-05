const { connect, disconnect } = require("../../../../utilities/db");
const { filterStudentAdmin } = require("../../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  const connection = await connect();
  try {
    const {
      student_id,
      status,
      promotion,
      student_firstname,
      student_lastname,
    } = req.body;
    const data = await filterStudentAdmin(
      connection,
      student_id,
      status,
      promotion,
      student_firstname,
      student_lastname
    );
    // console.log("========");
    // console.log(status);
    // console.log("========");
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
