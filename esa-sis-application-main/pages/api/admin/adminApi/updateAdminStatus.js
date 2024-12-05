const { connect  , disconnect} = require("../../../../utilities/db");
const { UpdateAdminStatus } = require("../../controller/queries");

// const axios = require('axios')
// import https from 'https';

async function handler(req, res) {
  try {
    const connection = await connect();
    // filterStudent(connection, id, firstname, lastname, major, promotion, status);
    const { adminid, admin_status } = req.body;
     await UpdateAdminStatus(
      connection,
      admin_status,
      adminid
    );
    disconnect(connection)
    return res.status(201).json({
        code:201,
        message : `update Successfully`,
        success:true
    })
  } catch (error) {
    // console.log('the error is: ', error)
    return res.status("401").send(error);
    // return error;
  }
}
export default handler;
// module.exports = handler;
