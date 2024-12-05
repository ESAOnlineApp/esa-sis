const { ExistGradesStudent } = require("../../controller/queries");

const gradeExistsStudent = async( connection ,student_id , course_id ,task_name)=>{

    
    const exist = await ExistGradesStudent(connection , student_id , course_id , task_name)
    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
}
export default gradeExistsStudent;