const { connect, disconnect } = require("../../../utilities/db");
const { roleStudent } = require("../controller/queries");
//filterAttendanceStudent

async function handler(req, res) {
    try {
        const connection = await connect();
        const {
            majorId
        } = req.body;
        // // console.log(major_id)
       
      const response =   await roleStudent(
            connection,
            majorId
        );
     
        await disconnect(connection);
        if (response.rows.length === 0) {
            return res.status(404).json({
                success: false,
                code: 404,
                message: `No Certificates Found !`
           
            });

        }else{
            return res.status(200).json({
                success: true,
                code: 200,
                data : response
           
            });
        }

  
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