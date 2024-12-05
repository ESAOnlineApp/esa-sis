const { connect, disconnect } = require("../../../utilities/db");
const { addRequestForPm } = require("../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();

    const { pm_id, student_id, student_email, major_id, promotion, gpa } =
      req.body;
    const data = await addRequestForPm(
      connection,
      pm_id,
      student_id,
      student_email,
      major_id,
      promotion,
      gpa
    );
    await disconnect(connection);

    // console.log(data.rows);
    return res.status("200").send(data);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status("401").send(error);
    // return error;
  }
}
export default handler;
// module.exports = handler;
