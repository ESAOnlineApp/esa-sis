const { connect, disconnect } = require("../../../utilities/db");
const { getClassDetails } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();
    const { tmpclass_id } = req.body;
    const response = await getClassDetails(connection, tmpclass_id);
    // console.log(response)
    await disconnect(connection);
    if (response.rows.length === 0) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "class Not found",
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
// module.exports = handler;
export default handler;
