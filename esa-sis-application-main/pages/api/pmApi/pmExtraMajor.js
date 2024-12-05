// getStudentsAndPims

const { connect, disconnect } = require("../../../utilities/db");

const { pmExtraMajor } = require("../controller/queries");
// const { default: assignedExist } = require('./exist/getTeachersCourse');

async function handler(req, res) {
  try {
    const connection = await connect();
    const {pmID} = req.body;
    console.log("extra major id :", pmID)
    // let major_id = 8
    // let extra_major = null

     const response = await pmExtraMajor(connection, pmID)
    await disconnect(connection);
    return res.status(200).json({
      success: true,
      code: 200,
      data: response.rows
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
    });
  }
}
// module.exports = handler;
export default handler;