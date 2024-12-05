import axios from 'axios';

async function handler(req, res) {

  try {
 
    const { email , accessToken} = req.body;
   
   
    const response = await axios.get(`https://api.zoom.us/v2/users/${email}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
 
   
    if (response.data.length === 0) {
        return res.status(200).json({
            success: false,
            code: 200,
            message:'No Booking Found'
          });
    }else{
        return res.status(200).json({
            success: true,
            code: 200,
            data: response.data,
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