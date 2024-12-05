import axios from 'axios';

async function handler( req,res) {
  try {

    const {  accessToken , zoomId} = req.body;

    // Define additional headers
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      
    };
   

   await axios.delete(`https://api.zoom.us/v2/meetings/${zoomId}`, {
        headers: headers,
      });
   

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
export default handler