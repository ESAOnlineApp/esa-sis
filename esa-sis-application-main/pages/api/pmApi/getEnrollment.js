const { connect, disconnect } = require("../../../utilities/db");
const { Certificate } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();
    const {major_id} =  req.body
  
    // console.log(major_id)
    const response = await Certificate(connection ,major_id);
  
    await disconnect(connection);
    if (response.rows.length === 0) {
      return res.status(200).json({
        success: true,
        code: 200,
        message: "enrollment Not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        code: 200,
        data: response.rows,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
    });
  }
}
export default handler;
