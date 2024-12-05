import { google } from 'googleapis';
import axios from 'axios';
import { env } from "process";

export default async function handler(req, res) {
  console.log('body' , req.body)
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { access_Token, event, attendance_id } = req.body;

  if (access_Token.length > 0) {
    try {
      let success = false; // Flag to track overall success

      for (let i = 0; i < access_Token.length; i++) {
        const oauth2Client = new google.auth.OAuth2({
          clientId: '488510538109-36i4ol70jivfrtcu31upbmld812klgr7.apps.googleusercontent.com',
          clientSecret: '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',
          redirectUri: 'https://esasis.esa.edu.lb/student/schedule/',
          scopes: ['https://www.googleapis.com/auth/calendar'],
        });
        const access_token = access_Token[i].access_token;

        oauth2Client.setCredentials({ access_token });
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        try {
          const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
          });

          await axios.post(`${env.NEXTAUTH_URL}api/pmApi/fillgoogleCalender`, {
            student_id: access_Token[i].student_id,
            event_id: response.data.id, 
            attendance_id: attendance_id
          });
          success = true; // Mark this iteration as successful
        } catch (error) {
          console.error('Error inserting event:', error);
          // Handle the error but continue with next iteration
          continue;
        }
      }

      if (success) {
        // At least one iteration was successful
        return res.status(201).json({
          success: true, 
          code: 201,
          message: 'Schedule created successfully'
        });
      } else {
        // All iterations failed
        return res.status(500).json({
          success: false,
          code: 500,
          message: 'Failed to insert event for any access token',
        });
      }

    } catch (error) {
      console.error('Error setting up OAuth2 client:', error);
      return res.status(500).json({
        success: false,
        code: 500,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({ message: 'No access tokens provided' });
  }
}
