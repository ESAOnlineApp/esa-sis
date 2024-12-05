const { ExistGradesDT } = require("../../controller/queries");

const gradeExistsDT = async( connection ,student_id , course_id ,task_name)=>{

    
    const exist = await ExistGradesDT(connection , student_id , course_id , task_name)
    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
}
export default gradeExistsDT;