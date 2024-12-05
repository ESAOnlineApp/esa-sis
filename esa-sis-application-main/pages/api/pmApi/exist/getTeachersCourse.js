const { getTeachersCourses } = require("../../controller/queries");

const assignedExist = async (connection, teacher_id, course_id, major_id) => {
  try{
  const exist = await getTeachersCourses(
    connection,
    teacher_id,
    course_id,
    major_id
  );
  // console.log('existt' , exist)
  if (exist.rowCount === 0) {
    return false;
  } else {
    return true;
  }
} catch (error) {
  console.log('in the getTeachersCourse.js in exist in pmApi: ',error)  
}
};
export default assignedExist;
