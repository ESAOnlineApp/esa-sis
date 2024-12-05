const { connect , disconnect } = require("../../../utilities/db");
const { filterTeacher } = require("../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    // filterStudent(connection, id, firstname, lastname, major, promotion, status);
    const { id, firstname, lastname, email, courseid } = req.body;
    const data = await filterTeacher(
      connection,
      id,
      firstname,
      lastname,
      email,
      courseid
    );
    // console.log(data.rows)
    await disconnect(connection)
    return res.status("200").send(data.rows);
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status("401").send(error);
    // return error;
  }
}
export default handler;
// module.exports = handler;
