// const { connect, disconnect } = require("../../../utilities/db");
//filterAttendanceStudent

import axios from "axios";

async function handler(req, res) {
    const code = req.query.code;
    try {
        console.log(code)
        const response = await axios.post('https://zoom.us/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: 'http://localhost:3001/api/zoom'
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`jcqVkacUTNaderIiAFk0Iw:rEPg51ObnYLH1gb5BTFMl15GUYkGnaze`).toString('base64')}`
            }
        });
        return res.send(response.data.access_token);

    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
        });
    }
}
export default handler;