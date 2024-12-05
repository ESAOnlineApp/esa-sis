const { ExistElective } = require("../../controller/queries");

const assignExistElective = async( connection ,course_id ,student_id)=>{
    try {
    const exist = await ExistElective(connection , course_id , student_id)
    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
    } catch (error) {
          console.log('in the existElective.js in exist in pmApi: ',error)  
    }
}
export default assignExistElective;