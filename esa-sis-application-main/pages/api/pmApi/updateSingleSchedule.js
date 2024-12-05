const { connect , disconnect} = require("../../../utilities/db");
const { updateSchedule , getAllById} = require("../controller/queries");
import axios from "axios";
const dotenv = require("dotenv");


dotenv.config(); // Assuming the .env file is in the root of your project
import moment from 'moment-timezone';
// import SendEmail from "./emailUpdateScheduleContent";
const FormatTime = (timeWithTimeZone) => {
  const [time] = timeWithTimeZone.split('+'); // Remove the timezone offset
  const [hours, minutes] = time.split(':');
  const formattedHours = parseInt(hours) % 12 === 0 ? 12 : parseInt(hours) % 12;

  const period = parseInt(hours) < 12 ? 'AM' : 'PM';
  return `${formattedHours}:${minutes} ${period}`;
};

async function handler(req, res) {
 
  try {
    const connection = await connect();
    const {
       tmpscheduleID, classID, day, 
      fromTime, toTime, room_id, 
      pm_id , is_online , student , 
      building , room_name , teacher_id , 
      courseName,
      oldData } =
      req.body;
    
      const classFilter= oldData.filter((sched)=>sched.tmpschedule_id === tmpscheduleID)
      // console.log('----------------------classfilter---------------------------' , classFilter)
      const formattedDate = moment(day).format('DD-MM-YYYY');
      const formattedDateold = moment(classFilter[0].date).format('DD-MM-YYYY');
      const oldTeacher = classFilter[0].teacher
      const oldFromTime = FormatTime(classFilter[0].from)
      const oldToTime = FormatTime(classFilter[0].to)
      
      const oldDate = formattedDateold
      const oldIsOnline = classFilter[0].is_online
      const oldRoom = classFilter[0].room_name
      const oldBuilding = classFilter[0].room_building
      
    const table = 'teachers'
    const colName='teacher_id'
    const val=teacher_id
        const data = await getAllById(connection, table, colName, val);
        
    const response = await updateSchedule(
      connection,
      classID,
      day,
      fromTime,
      toTime,
      room_id,
      pm_id,
      tmpscheduleID,
      is_online
    );


    let formate;
    const fromTimeEmail = FormatTime(fromTime);
    const ToTimeEmail = FormatTime(toTime);
    
    if (is_online === 'true') {
      formate = 'online';
    } else if (is_online === 'false') {
      formate = 'onsite';
    } else if (!is_online) {
      formate = 'onsite';
    } else {
      formate = 'online';
    }
    console.log('new', is_online, formate);
    
    let oldFormate;
    if (oldIsOnline === 'true') {
      oldFormate = 'online';
    } else if (oldIsOnline === 'false') {
      oldFormate = 'onsite';
    } else if (!oldIsOnline) {
      oldFormate = 'onsite';
    } else {
      oldFormate = 'online';
    }
    console.log('old', oldIsOnline, oldFormate === 'false');
    
  
    await disconnect(connection)
    // console.log(response)

    if (response.rowCount > 0) {
      // student.map(async (students)=>{
      //   try {
          
      //    await SendEmail(
      //       students.email ,
      //       students.student_firstname ,
      //       students.student_lastname, 
      //       courseName , 
      //       oldDate ,
      //       oldFromTime,
      //       oldToTime , 
      //       oldIsOnline,
      //       oldRoom,
      //       oldBuilding,
      //       oldTeacher,
      //       formate,
      //       oldFormate,
      //       formattedDate,
      //       oldFromTime,
      //       ToTimeEmail,
      //       is_online,
      //       room_name,
      //       building,
      //       data.rows[0].teacher_firstname,
      //       data.rows[0].teacher_lastname
      //     )
          

      //     await axios.post(`${process.env.NEXTAUTH_URL}api/pmApi/addNotification`,{
      //       receiverIds:[students.student_id], 
      //       senderId:pm_id, 
            // content:'<!DOCTYPE html>' +
            //       '<html><head><title>Grades</title>' +
            //       '</head><body><div>' +
            //       `<div style="text-align: center;">
            //          </div>` +
            //       `</br>` +
            //       `<p>Dear <span style="font-weight: bold">${students.student_firstname} ${students.student_lastname}</span>,</p>` +
            //       `<p>We trust this email finds you well.</p> ` +
            //       `<p>We We would like to inform you of a necessary change to our ${courseName} schedule:</p>` +
            //       `<p>Previous Schedule:</p>` +
            //       `<p>
            //       <ul>
            //         <li>Date(s) and Time(s):${oldDate}/${oldFromTime} To ${oldToTime}</li>
            //         ${oldIsOnline ? ``:`<li>Location:${oldRoom}-${oldBuilding}</li>`}
            //         <li>Professor:${oldTeacher}</li>
            //         <li>Formate:${oldFormate}</li>
            //       </ul>
            //       </p>`+
  
            //       `<p>Update Schedule:</p>` +
            //       `<p>
            
            //       <ul>
            //         <li>Date(s) and Time(s):${formattedDate}/${fromTimeEmail} To ${ToTimeEmail}</li>
            //         ${is_online ? ``:`<li>Location:${room_name}-${building}</li>`}
                    
            //         <li>Professor:${data.rows[0].teacher_firstname} ${data.rows[0].teacher_lastname}</li>
            //         <li>Formate:${formate}</li>
            //       </ul>
            //       </p>`+
            //       `<p>
            //       If you have any questions or concerns regarding these changes, please don't hesitate to contact your program manager.</p>` +
            //       `<p>Best regards,</p> ` +
            //       `<p>ESA Business School</p> ` +
            
            //       '</div></body></html>',
      //        subject:'Update Schedule'
      //     })
      //   } catch (error) {
      //     return error
      //   }
       
      // })

      for (const students of student) {
        try {
          // await SendEmail(
          //   students.email,
          //   students.student_firstname,
          //   students.student_lastname,
          //   courseName,
          //   oldDate,
          //   oldFromTime,
          //   oldToTime,
          //   oldIsOnline,
          //   oldRoom,
          //   oldBuilding,
          //   oldTeacher,
          //   formate,
          //   oldFormate,
          //   formattedDate,
          //   oldFromTime,
          //   ToTimeEmail,
          //   is_online,
          //   room_name,
          //   building,
          //   data.rows[0].teacher_firstname,
          //   data.rows[0].teacher_lastname
          // );
      
          await axios.post(`${process.env.NEXTAUTH_URL}api/pmApi/addNotification`, {
            receiverIds: [students.student_id],
            senderId: pm_id,
            content: `<!DOCTYPE html><html><head><title>Grades</title></head><body><div><div style="text-align: center;"></div></br><p>Dear <span style="font-weight: bold">${students.student_firstname} ${students.student_lastname}</span>,</p><p>We trust this email finds you well.</p> <p>We We would like to inform you of a necessary change to our ${courseName} schedule:</p><p>Previous Schedule:</p><p><ul><li>Date(s) and Time(s):${oldDate}/${oldFromTime} To ${oldToTime}</li>${oldIsOnline ? `` : `<li>Location:${oldRoom}-${oldBuilding}</li>`}<li>Professor:${oldTeacher}</li><li>Formate:${oldFormate}</li></ul></p><p>Update Schedule:</p><p><ul><li>Date(s) and Time(s):${formattedDate}/${fromTimeEmail} To ${ToTimeEmail}</li>${is_online ? `` : `<li>Location:${room_name}-${building}</li>`}<li>Professor:${data.rows[0].teacher_firstname} ${data.rows[0].teacher_lastname}</li><li>Formate:${formate}</li></ul></p><p>If you have any questions or concerns regarding these changes, please don't hesitate to contact your program manager.</p><p>Best regards,</p> <p>ESA Business School</p> '</div></body></html>`,
            subject: 'Update Schedule',
          });
        } catch (error) {
          console.error('Error sending email:', error);
        }
      }
      
      return res.status(201).json({
        success: true,
        code: 201,
        message: "Single Schedule updated successfully",
      });
    }else{
      return res.status(400).json({
        success: true,
        code: 400,
        message: "Single Schedule did not updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
    });
  }
}
export default handler;
