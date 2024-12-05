const { connect, disconnect } = require("../../../utilities/db");

const { deleteSharepointId } = require("../controller/queries");

async function handler( req,res) {
  try {
    const connection = await connect();
    const {attendance_id}=req.body
   

  await deleteSharepointId(connection  , attendance_id);
    await disconnect(connection);

    return res.status(203).json({
      success: true,
      code: 203,
     
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
