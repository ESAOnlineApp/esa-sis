// Modify the server endpoint to return both access token and refresh token
import { google } from 'googleapis';

export default async function handler(req, res) {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests are allowed' });
    }

    const { code } = req.body;

    try {
        const oauth2Client = new google.auth.OAuth2({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectUri: 'https://esasis.esa.edu.lb',
        });

        const { tokens } = await oauth2Client.getToken(code);

        // Return both access token and refresh token in the response
        return res.status(200).json({ 
            success: true, 
            message: 'Tokens exchanged successfully',
            data: {
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
            },
        });
    } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        return res.status(400).json({ success: false, error: 'Failed to exchange code for tokens', message: error.message });
    }
}
