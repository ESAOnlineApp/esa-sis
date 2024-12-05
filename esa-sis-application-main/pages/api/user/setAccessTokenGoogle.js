const { connect, disconnect } = require("../../../utilities/db");
const { updateUsers } = require("../controller/queries");


async function handler(req, res) {
    try {
        const connection = await connect();
        const {
            accessToken , 
            user_id
        } = req.body;
        // // console.log(major_id)
       
         await updateUsers(
            connection,
            accessToken , 
            user_id
        );
       
        await disconnect(connection);

        return res.status(203).json({
            success: true,
            code: 203,
            message: `accessToken Update Successfully`
       
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