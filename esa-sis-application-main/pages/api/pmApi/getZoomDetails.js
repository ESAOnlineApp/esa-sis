
import axios from 'axios';
const dotenv = require("dotenv");

dotenv.config("../env");

export default async function handler(req, res) {

    try {
        let {apiUrl, token} = req.query;

        const {data} = await axios.get(`https://api.zoom.us/v2/${apiUrl}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        res.json({ data: data });
        
    } catch (error) {
        res.status(500).json({ error: `Error obtaining data : ${error.message}` });
    }
}
