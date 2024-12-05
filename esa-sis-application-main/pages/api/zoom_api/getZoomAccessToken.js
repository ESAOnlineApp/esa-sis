
import axios from 'axios';
const dotenv = require("dotenv");

dotenv.config("../env");

export default async function handler(req, res) {

    try {
        const encodeFormData = (data) => {
            return Object.keys(data)
                .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                .join('&');
        };
        
        try {
           
            const tokenEndpoint = `https://zoom.us/oauth/token`;
            const data = {
                grant_type: 'account_credentials',
                account_id: process.env.ZOOM_ACCOUNT_ID,
                client_id: process.env.ZOOM_CLIENT_ID ,
                client_secret: process.env.ZOOM_SECRET
                
            };
        
            const response = await axios.post(
                tokenEndpoint,
                encodeFormData(data),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
        
            if (!response.data.access_token) {
                throw new Error('Access token not obtained');
            }
            return res.json({ access_token: response.data.access_token });
        } catch (error) {
            return res.status(500).json({ error: `Error obtaining access token: ${error.message}` });
        }
        
    } catch (error) {
        return res.status(500).json({ error: `Error obtaining access token: ${error.message}` });
    }
}
