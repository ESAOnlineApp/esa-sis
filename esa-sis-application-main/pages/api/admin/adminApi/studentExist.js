const {   studentExist } = require("../../controller/queries");

const StudentExist = async( connection , Student_email,major_id)=>{
    try{
    const exist = await studentExist(connection ,Student_email ,major_id )
    // console.log('exist' , exist)
    if(exist.rowCount === 0){
        return false
    }else{
        return true
    }
    }catch(error){
        console.log('this is studentExist.js in adminApi in admin : ', error)
    }
}
export default StudentExist;