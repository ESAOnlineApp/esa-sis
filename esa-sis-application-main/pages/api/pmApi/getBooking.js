const { connect, disconnect } = require("../../../utilities/db");
const { SearchBooking } = require("../controller/queries");

async function handler(req, res) {
  try {
    const connection = await connect();
    const { space , date , FromTime , ToTime } = req.body;
    const response = await SearchBooking(connection,space , date , FromTime , ToTime);
   
    await disconnect(connection);
    // console.log(response.data)
    if (response.rows.length === 0) {
        return res.status(200).json({
            success: false,
            code: 200,
            message:'No Booking Found'
          });
    }else{
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
