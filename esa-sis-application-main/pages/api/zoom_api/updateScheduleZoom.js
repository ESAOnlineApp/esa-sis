const { connect, disconnect } = require("../../../utilities/db");
const { updateZoomInfo } = require('../controller/queries');

async function handler(req, res) {
    
  try {
       const { tmpscheduleIds, meetingIds, zoomUrls } = req.body;
       
    const connection = await connect();
    
 

    const response = await updateZoomInfo(connection, 
      tmpscheduleIds,
      meetingIds,
      zoomUrls);

    await disconnect(connection);

    if (response.rowCount > 0) {
      return res.status(201).json({
        success: true,
        code: 201,
        message: 'Zoom info updated successfully',
      });
    } else {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'Error updating Zoom info',
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
