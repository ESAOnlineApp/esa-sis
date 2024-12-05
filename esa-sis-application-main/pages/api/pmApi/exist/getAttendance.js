const { getAttendanceByCTD } = require("../../controller/queries");

const attendanceExist = async( connection ,teacher_id , course_id , attendance_date)=>{
    console.log('wsllllllllllllll')
    try {

    const exist = await getAttendanceByCTD(connection ,teacher_id , course_id , attendance_date)
    
    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
            
} catch (error) {
    console.log('in the getAttendance.js in exist in pmApi: ',error)  
    return;
}
}
export default attendanceExist;