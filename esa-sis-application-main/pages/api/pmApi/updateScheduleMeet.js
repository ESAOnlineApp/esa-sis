const { connect , disconnect} = require("../../../utilities/db");
const { updateOnlineSchedule } = require("../controller/queries");


async function handler(req, res) {
  try {
    const connection = await connect();
    
    const { 
        zoom_id,
        zoom_url,
        attendance_id
     
    } =
      req.body;
      console.log('zoom' , zoom_id , zoom_url)
     await updateOnlineSchedule(connection , zoom_id , zoom_url , attendance_id)
     
 
  
    await disconnect(connection)   
      return res.status(201).json({
        success: true,
        code: 201,
        message: "schedule updated successfully",
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
