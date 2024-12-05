const { connect ,disconnect} = require("../../../utilities/db");
const { AttendanceView } = require('../controller/queries')

async function handler(req, res) {

    try {
        const connection = await connect();
        const {
            attendance_id
        } = req.body;
        const response = await AttendanceView(connection, attendance_id);
        await disconnect(connection);

        if (response.rows.length === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "attendance Not found"
            })
        } else {
            return res.status(200).json({
                success: true,
                code: 200,
                data: response.rows
            })

        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: error.message
        })
    }
}
// <<<<<<< HEAD
// =======
// // module.exports = handler;
// >>>>>>> 049f7915655ca52c8086eba51b82a86c3f6592df
export default handler;