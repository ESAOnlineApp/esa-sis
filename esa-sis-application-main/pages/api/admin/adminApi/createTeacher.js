const { connect , disconnect} = require("../../../../utilities/db");
const { createTeacher } = require("../../controller/queries");
const { default: teacherExist } = require("./ExistTeacher");



async function handler(req, res) {
  try {
    const connection = await connect();

    const { 
        teacher_id,
        teacher_firstname ,
        teacher_mail,
        teacher_lastname,
        teacher_mobile
     } = req.body;
     if(teacher_firstname === '' || teacher_mail === '' || teacher_lastname === '' || teacher_mobile === ''){
      return res.status(400).json({
        success:false,
        code:400,
        message:`Field is required!`
      })
     }
     const exist = await teacherExist(connection , teacher_mail)
     if(exist){
       return res.status(200).json({
        success:true,
        code:200,
        message:'Teacher Already Exist!'
       })
     }
   const response= await createTeacher(
      connection,
      teacher_id,
      teacher_firstname ,
        teacher_mail,
        teacher_lastname,
        teacher_mobile
    );
    await disconnect(connection)
    return res.status(201).json({
        success:true,
        code:201,
        message:"Teacher Created Successfully !",
        data: response
    })
  } catch (error) {
    return res.status(500).json({
        success:false,
        code:500,
        message: error.message
    })
  }
}

// module.exports = handler;
export default handler;
