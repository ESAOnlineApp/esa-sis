// pages/api/insertEvent.js
import { google } from 'googleapis';
require('dotenv').config();

async function handler(req, res) {
 
    try {
        // const CLIENT_ID = '748431984812-251tnvfcugl1c3uns4h751pr3119oktc.apps.googleusercontent.com';
        // const CLIENT_SECRET = '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';
        const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

        const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);

        const { accessToken, event } = req.body; // Assuming you send these in the request body

      oauth2Client.setCredentials({
            access_token: accessToken,
        });

        
        const calendar = google.calendar('v3');

        try {
            // List events that match the criteria (same summary, date, and time)
            const existingEvents = await calendar.events.list({
                auth: oauth2Client,
                calendarId: 'primary',
                q: `summary:"${event.summary}"`,
            });
            
            if (existingEvents.data.items.length > 0) {
                // If events with the same criteria are found, update the first one
                const existingEventId = existingEvents.data.items[0].id;

                const updatedEvent = await calendar.events.update({
                    auth: oauth2Client,
                    calendarId: 'primary',
                    eventId: existingEventId,
                    resource: event,
                });

                const eventHtmlLink = updatedEvent.data.htmlLink;
                res.status(200).json({
                    success: true,
                    code: 200,
                    data: updatedEvent.data,
                    redirectUrl: eventHtmlLink, // Include the Google Calendar event link
                });
            } else {
                // If no events are found, insert a new event
                const response = await calendar.events.insert({
                    auth: oauth2Client,
                    calendarId: 'primary',
                    resource: event,
                });

                const eventHtmlLink = response.data.htmlLink;
                res.status(201).json({
                    success: true,
                    code: 201,
                    data: response.data,
                    redirectUrl: eventHtmlLink, // Include the Google Calendar event link
                });
            }
        } catch (error) {
            // console.error('Error creating/updating event:', error);
            return res.status(500).json({
                success: false,
                code: 500,
                message: error.message,
            });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
        });
    }
}

export default handler;
