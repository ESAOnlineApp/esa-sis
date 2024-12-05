import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { access_token, eventId } = req.body;
  
  // if (!eventId || !eventId.data || !eventId.data[0] || !eventId.data[0].event_id) {
  //   return res.status(400).json({ error: 'Invalid eventId structure' });
  // }

 

  if (access_token.length > 0) {
    for (let i = 0; i < access_token.length; i++) {
      // Replace 'primary' with the appropriate calendar ID
      const calendarId = 'primary'; // or the calendar ID you want to delete the event from
      const token = access_token[i].access_token;
  
      
      // Create OAuth2 client with access token
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: token });

      // Create Calendar API instance
      const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

      try {
        // Delete event
        await calendar.events.delete({
          calendarId: calendarId,
          eventId:eventId.data.data[i].event_id,
        });

        // Return success message
        return res.status(200).json({ message: 'Event deleted successfully' });
      } catch (error) {
        console.error('Error deleting event:', error);
        return res.status(500).json({ error: 'Failed to delete event' });
      }
    }
  } else {
    return res.status(400).json({ message: 'No access tokens provided' });
  }
}
