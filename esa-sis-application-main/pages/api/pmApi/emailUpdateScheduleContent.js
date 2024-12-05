

import emailing_data from '../../../utilities/emailing/emailing_data';
import createTransporter from '../../../utilities/emailing/smtp';
import dotenv from "dotenv";



dotenv.config("../env");
const transporter = createTransporter();

const SendEmail = async (           
 
    email ,
    student_firstname ,
    student_lastname, 
   course_id , 
    oldDate ,
    oldFromTime,
    oldToTime , 
    oldIsOnline,
    oldRoom,
    oldBuilding,
    oldTeacher,
    formate,
    oldFormate,
    formattedDate,
    fromTimeEmail,
    ToTimeEmail,
    is_online,
    room_name,
    building,
    teacher_firstname,
     teacher_lastname

) => {
  try {
    console.log('old' , oldIsOnline , oldBuilding , oldRoom , oldFormate)
    console.log('new' , is_online , building , room_name , formate)
    const fromEmail = emailing_data.fromEmail;
   
    // const bccEmail = emailing_data.bccEmail;
    const subject = `Update Schedule`;

    const emailBody =
    '<!DOCTYPE html>' +
    '<html><head><title>Grades</title>' +
    '</head><body><div>' +
    `<div style="text-align: center;">
       </div>` +
    `</br>` +
    `<p>Dear <span style="font-weight: bold">${student_firstname} ${student_lastname}</span>,</p>` +
    `<p>We trust this email finds you well.</p> ` +
    `<p>We We would like to inform you of a necessary change to our ${course_id} schedule:</p>` +
    `<p><span style="font-weight: bold">Previous Schedule:</span></p>` +
    `<p>
    <ul>
      <li>Date(s) and Time(s):${oldDate}/${oldFromTime} To ${oldToTime}</li>
      ${oldIsOnline ? ``:`<li>Location:${oldRoom}-${oldBuilding}</li>`}
      <li>Professor:${oldTeacher}</li>
      <li>Formate:${oldFormate}</li>
    </ul>
    </p>`+

    `<p><span style="font-weight: bold">Update Schedule:</span></p>` +
    `<p>

    <ul>
      <li>Date(s) and Time(s):${formattedDate}/${fromTimeEmail} To ${ToTimeEmail}</li>
      ${is_online === 'true' || is_online === true? ``:`<li>Location:${room_name}-${building}</li>`}
      
      <li>Professor:${teacher_firstname} ${teacher_lastname}</li>
      <li>Formate:${formate}</li>
    </ul>
    </p>`+
    `<p>
    If you have any questions or concerns regarding these changes, please don't hesitate to contact your program manager.</p>` +
    `<p>Best regards,</p> ` +
    `<p>ESA Business School</p> ` +

    '</div></body></html>';

    const mailOptions = {
      from: fromEmail,
      to: email,
    //   cc: '',
    //   bcc: bccEmail,
      subject: subject,
      html: emailBody,
    //   attachments: attachments,
      purpose: 'Update Schedule',
    };


    await transporter.sendMail(mailOptions);

  } catch (error) {
    return error;
  }
};



export default SendEmail;
