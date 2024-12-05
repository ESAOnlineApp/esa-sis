const { connect, disconnect } = require("../../../utilities/db");

const { deleteBooking } = require("../controller/queries");

async function handler( req,res) {
  try {
    const connection = await connect();
   

   await deleteBooking(connection);

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
// module.exports = handler;
export default handler;
