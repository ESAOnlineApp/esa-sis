import { google } from 'googleapis';


export default async function handler(req, res) {
  const { eventId, accessToken, newData } = req.body;

  try {
    if(accessToken.length > 0){
          // Continue with the loop to update the event with each access token
    for (let i = 0; i < accessToken.length; i++) {
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: accessToken[i].access_token });
    
      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
      try {
        const updatedEvent = await calendar.events.update({
          calendarId: 'primary',
          eventId: eventId.data.data[i].event_id,
          resource: newData,
        });
        console.log('updatedEvent', updatedEvent.data);
        return res.status(200).json({ success: true, event: updatedEvent.data });
      } catch (error) {
        // Log the error for debugging purposes
        console.error('Error updating event:', error.message);
        if (i === accessToken.length - 1) {
          return res.status(500).json({ success: false, code: 500, message: error.message });
        }
      }
    }

    }else{
      return res.status(400).json({
        success:false,
        code:400,
        message:`No AccessToken `
      })
    }

  } catch (error) {
    // Handle any unexpected errors
    console.error('Unexpected error:', error.message);
    return res.status(500).json({ success: false, code: 500, message: error.message });
  }
}


