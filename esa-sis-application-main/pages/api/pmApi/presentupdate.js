const { connect , disconnect} = require("../../../utilities/db");
const {updatePresent} = require("../controller/queries");

async function handler(req , res){
    try {

        // if (req.method !== 'PUT') {
        //     return res.status(400).send({ message: `${req.method} not supported` });
        //   }
        
        //   const session = await getServerSession(req, res, authOptions);
        
        //   if (!session) {
        //     return res.status(401).send({ message: 'Signin Required To Update' });
        //   }
        
        //   const { user } = session;
        
        //   if (user.role === '1') {
        //     return res.status(401).send({ message: 'You are Unauthorized' });
        //   }
          const connection = await connect();
          const{
            present ,
            attendance_id,
            student_id
          }=req.body

          const response = await updatePresent(connection , present , student_id , attendance_id)
          await disconnect(connection);
        
          if(response){
               return res.status(201).json({
                success:true,
                code:201,
                message: `Attendance Updated Successfully`

               })
          }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            code:500,
            message: error.message
        })
    }
}
export default handler;