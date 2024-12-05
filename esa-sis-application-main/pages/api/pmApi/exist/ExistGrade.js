const { ExistGrades } = require("../../controller/queries");

const gradeExists = async( connection ,student_id , course_id ,task_name)=>{

    
    const exist = await ExistGrades(connection , student_id , course_id , task_name)
    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
}
export default gradeExists;