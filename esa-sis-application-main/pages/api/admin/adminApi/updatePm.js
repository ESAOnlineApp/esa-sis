const { connect , disconnect} = require("../../../../utilities/db");
const { updateStatusPM } = require("../../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    // filterStudent(connection, id, firstname, lastname, major, promotion, status);
    const { pm_id, pm_status, note } = req.body;
    // console.log(note)
    const data = await updateStatusPM(connection, pm_id, pm_status, note);
    // console.log('this data')
    await disconnect(connection);
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
