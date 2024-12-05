const { getExistCourse } = require("../../controller/queries");

const courseExist = async (connection, course_id, teacher_id, major_id) => {
  try {
  const exist = await getExistCourse(
    connection,
    course_id,
    teacher_id,
    major_id
  );
  // console.log('exist' , exist)
  if (exist.rowCount === 0) {
    return false;
  } else {
    return true;
  }
} catch (error) {
    console.log('in the existCourse.js in exist in pmApi: ',error)
}
};
export default courseExist;
