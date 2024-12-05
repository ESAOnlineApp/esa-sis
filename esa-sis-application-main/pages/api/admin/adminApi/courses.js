const { connect , disconnect} = require("../../../../utilities/db");
const { getCourseMajor } = require("../../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();

    const data = await getCourseMajor(connection);
    await disconnect(connection);
    return res.status("200").send(data);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status("401").send(error);
    // return error;
  }
}
export default handler;

