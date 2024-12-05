const { getAllCourses } = require("../../controller/queries");

const CourseExist = async( connection , course_id , major_id)=>{
    try{
    const exist = await getAllCourses(connection  , course_id ,major_id)
    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
    } catch (error) {
        console.log('in the getCourses.js in exist in pmApi: ',error)  
    }
}
export default CourseExist;