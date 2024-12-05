import axios from 'axios';

async function handler(req, res) {
  try {
    const { accessToken, userId , requestBody} = req.body;

    // Define additional headers
    const headers = {
      Authorization: `Bearer ${accessToken}`,
     
    };

    // Define the request body
    // const requestBody = {
    //   topic: `${classId}`,
    //   type: 2,
    //   start_time: date,
    //   created_at:createAt,
    //   settings: {
    //     join_before_host: true,
    //     auto_recording: "local",
    //     mute_upon_entry: true,
    //     waiting_room: false,
    //     registrants_email_notification: true,
    //   },
    // };

    // Make the POST request with headers and body
    const response = await axios.post(`https://api.zoom.us/v2/users/${userId}/meetings`, requestBody, {
      headers: headers,
    });

    return res.status(201).json({
      success: true,
      code: 201,
      message: "Zoom Meeting Create Successfully!",
      data: response.data,
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