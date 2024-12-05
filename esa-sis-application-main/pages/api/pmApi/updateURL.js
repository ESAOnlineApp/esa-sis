const { connect, disconnect } = require("../../../utilities/db");
const { uploadFile } = require('../controller/queries')

async function handler(req , res) {
  try {
    const connection = await connect();
    const {
        url,
       attendance_id
    } = req.body;
    console.log('ws;lllllllllllllllllll')
   await uploadFile(connection ,url ,attendance_id);
    await disconnect(connection);
    return res.status(201).json({
      success: true,
      code: 201,
      message: `File Upload Successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
    });
  }
}
export default handler;
