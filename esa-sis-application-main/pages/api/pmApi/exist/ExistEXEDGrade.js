const { ExistGradesEXED } = require("../../controller/queries");

const gradeExistsEXED = async( connection ,student_id , course_id ,task_name)=>{

    
    const exist = await ExistGradesEXED(connection , student_id , course_id , task_name)
    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
}
export default gradeExistsEXED;