const { connect , disconnect} = require("../../../utilities/db");
const { updateGrades } = require("../controller/queries");
const { default: gpaToGrades } = require("./gpa");

async function handler(req, res) {
  try {
    const connection = await connect();
    
    const { 
        grade,
        student_id,
        course_id,
        taskName
    } =
      req.body;
      const data = await gpaToGrades(grade)
      const GPA = data.gpa
      const Rank = data.rank
  await updateGrades(
      connection,
      grade,
      GPA,
      Rank,
      student_id,
      course_id,
      taskName
    );
  
    await disconnect(connection)   
      return res.status(201).json({
        success: true,
        code: 201,
        message: "Grade updated successfully",
        data:{Rank , GPA}
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
