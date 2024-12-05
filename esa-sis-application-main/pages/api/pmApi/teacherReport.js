const { connect, disconnect } = require("../../../utilities/db");
const { teacherReport } = require("../controller/queries");
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req, res) {
  try {
    const connection = await connect();
    const { teacher_id, pmMajor, majorId } = req.body
    const session = await getServerSession(req, res, authOptions);
    const { user } = session;
    // console.log('user' , user)
    // console.log(major_id)

    if (user.hasMultiMajor === 'false') {
      const response = await teacherReport(connection, teacher_id, pmMajor);


      await disconnect(connection);  
      if (response.rows.length > 0) {
        return res.status(200).json({
          success: true,
          code: 200,
          data: response.rows,
        });
      } else {
        return res.status(201).json({
          success: true,
          code: 201,
          message: `NO data Found`,
          data: response.rows
        });
      }
    }else{
      const response = await teacherReport(connection, teacher_id, pmMajor , majorId);


      await disconnect(connection);
  
  
  
      if (response.rows.length > 0) {
        return res.status(200).json({
          success: true,
          code: 200,
          data: response.rows,
        });
      } else {
        return res.status(201).json({
          success: true,
          code: 201,
          message: `NO data Found`,
          data: response.rows
        });
      }
  
  
    }
   

  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
    });
  }
}
export default handler;
