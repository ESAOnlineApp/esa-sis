const { connect, disconnect } = require("../../../utilities/db");
const { profileStudent } = require("../controller/queries");
//filterAttendanceStudent

async function handler(req, res) {
    try {
        const connection = await connect();
        const {
            user_id
        } = req.body;
        // // console.log(major_id)
        const response = await profileStudent(
            connection,
            user_id
        );
      
        await disconnect(connection);
        if (response.rows.length === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: `student Not Found`,
            });
        }
        return res.status(200).json({
            success: true,
            code: 200,
            data: response.rows,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 500,
            message: error.message,
        });
    }
}
// module.exports = handler;
export default handler;