
import axios from 'axios';
const dotenv = require("dotenv");

dotenv.config("../env");

export default async function handler(req, res) {
    // const { clientId, clientSecret, tenantId, resource } = req.body;

    try {
        const encodeFormData = (data) => {
            return Object.keys(data)
                .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                .join('&');
        };
        
        try {
            const URL = process.env.TENANTID
            const tokenEndpoint = `https://accounts.accesscontrol.windows.net/${URL}/tokens/OAuth/2`;
            const data = {
                grant_type: 'client_credentials',
                client_id: process.env.SHAREPOINT_CLIENTID ,
                client_secret: process.env.SHAREPOINT_SECRET,
                resource: process.env.SHAREPOINT_SOURCES
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
