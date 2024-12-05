const { connect } = require("../../../../utilities/db");
const { updateStatusAssistance } = require("../../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    // filterStudent(connection, id, firstname, lastname, major, promotion, status);
    const { pm_ass_id, pm_ass_status } = req.body;
    const data = await updateStatusAssistance(
      connection,
      pm_ass_id,
      pm_ass_status
    );
    // console.log('this data')
    // console.log(data)
    return res.status("200").send(data);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status("401").send(error);
    // return error;
  }
}
export default handler;
// module.exports = handler;
