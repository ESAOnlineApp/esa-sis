const { connect, disconnect } = require("../../../utilities/db");
const { getCourse } = require('../controller/queries')

async function handler(req, res) {
    let connection;
    try {
        connection = await connect();
        const {
            table,
            Where,
            id
        } = req.body;
        const response = await getCourse(connection, table, Where, id);
        await disconnect(connection)
        if (response.rows.length === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: "Course Not found"
            })
        } else {
            return res.status(201).json({
                success: true,
                code: 201,
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
    // module.exports = handler;
export default handler;