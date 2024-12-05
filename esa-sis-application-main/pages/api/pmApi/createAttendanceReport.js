const { connect, disconnect } = require("../../../utilities/db");
const { createAttendance } = require("../controller/queries");
const { default: attendanceExist } = require("./exist/getAttendance");
const { default: OccupiedRoom } = require("./exist/roomOccupied");
const { default: OccupiedTeacher } = require("./exist/teacherOccupied");
import  moment from 'moment-timezone'

async function handler(req, res) {

  try {
    const connection = await connect();   
    const { teacher_id, course_id, major_id, attendance_date  ,fromTime,
      toTime,
      room  } = req.body;

    if (teacher_id === "" || course_id === "") {
      return res.status(200).json({
        code: 200,
        success: true,
        message: `Fields is required`,
      });
    }
   
    let date;

    if (attendance_date.split('T')[1] === '22:00:00.000Z') {
      // If the time is '22:00:00.000Z', add one day and set time to '00:00:00.000Z'
      date = moment(attendance_date).startOf('day').set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    } else {
      date = moment(attendance_date).startOf('day');
    }

    // Format the date in the desired format
    date = date.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    // const getTeacher = await getCourse(connection, 'tmpclass', 'tmpclass_id', classId)

    // const teacherId = getTeacher.rows[0].teacher_id
    // Convert fromTime to include AM/PM without time zone
    const fromTimeParts = fromTime.split(':');
    const fromHour = parseInt(fromTimeParts[0]);
    const fromMinute = fromTimeParts[1];
    const from_time = fromHour >= 12 ? `${fromHour - 12}:${fromMinute} PM` : `${fromHour}:${fromMinute} AM`;
    
    // Convert toTime to include AM/PM without time zone
    const toTimeParts = toTime.split(':');
    const toHour = parseInt(toTimeParts[0]);
    const toMinute = toTimeParts[1];
    const to_time = toHour >= 12 ? `${toHour - 12}:${toMinute} PM` : `${toHour}:${toMinute} AM`;
    
    const date_time = moment(attendance_date).format('DD/MM/YYYY');
    

    const teacherOccupied = await OccupiedTeacher(connection, attendance_date, teacher_id, fromTime, toTime)
    await disconnect(connection);
    if (teacherOccupied) {
      return res.status(200).json({
          success: false,
          code: 200,
          message: `Teacher Not Available ${date_time} from ${from_time} to ${to_time} `
      })
  }
    if(room !==''){
      const roomOccupied = await OccupiedRoom(connection, attendance_date,
        fromTime,
        toTime,
        room)
        console.log('roomOccupied' , roomOccupied)
        await disconnect(connection);
        if (roomOccupied) {
          return res.status(200).json({
              success: false,
              code: 200,
              message: `Room Not Available ${date_time} from ${from_time} to ${to_time} `
          })
    }


        
 
    }

    const exist = await attendanceExist(
      connection,
      teacher_id,
      course_id,
      date
    );

    const date_exist = date.split('T')[0]

    if (exist) {
      console.log('exist' , exist)
      return res.status(200).json({
        code: 200,
        success: false,
        message: `Scheduled Already Exist ${date_exist}!`,
      });
    }
    const response = await createAttendance(
      connection,
      teacher_id,
      course_id,
      major_id,
      date
    );
  
    await disconnect(connection);

    return res.status(201).json({
      success: true,
      code: 201,
      message: "Attendance Sheet Created Successfully !",
      data: response.rows[0].attendance_id,
    });
  } catch (error) {
  
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
    });
  }
}
// module.exports = handler;
export default handler;
