const { connect , disconnect} = require("../../../utilities/db");
const { updateGradesRTF } = require("../controller/queries");


async function handler(req, res) {
  try {
    const connection = await connect();
    
    const { 
        table ,
        grade_over_20 ,
        grade_over_30 , 
        student_id , 
        course_id , 
        task_name
     
    } =
      req.body;

 await updateGradesRTF(
      connection,
      table ,
      grade_over_20 ,
      grade_over_30 , 
      student_id , 
      course_id ,
      task_name
   
    );
 
  
    await disconnect(connection)   
      return res.status(201).json({
        success: true,
        code: 201,
        message: "Grade updated successfully",
      });
 
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
    });
  }
}
export default handler;
