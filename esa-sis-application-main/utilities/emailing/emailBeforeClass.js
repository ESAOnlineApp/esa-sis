import axios from "axios";
import dateFormatter from "../dateFormatter";
import timeFormatter from "../timeFormatter";
import dateSeperator from "../dateSeperator";
import getSevenDaysBefore from "../dateBeforeSeven";

const sendMailClass = async (class_id, fromTime, toTime, location) => {
  console.log(class_id);
  console.log(fromTime);
  console.log(toTime);

  const classInfo = await axios.post(
    `https://esasis.esa.edu.lb/api/pmApi/getClassInfoForEmail`,
    {
      class_id: class_id,
    }
  );

  // console.log("this is classInfo", classInfo.data.rows[0]);

  const locationInfo = await axios.post(
    `https://esasis.esa.edu.lb/api/pmApi/getLocationInfo`,
    { room_id: location }
  );
  // console.log("this is locationInfo", locationInfo.data.rows[0]);

  const studentsEmails = await axios.post(
    `https://esasis.esa.edu.lb/api/pmApi/getStudentEmailsForEmailClass`,
    { promo: classInfo.data.rows[0].promotion }
  );
  let stEmails = [];
  let stIds = [];
  for (let i = 0; i < studentsEmails.data.rows.length; i++) {
    stEmails.push(studentsEmails.data.rows[i].email);
    stIds.push(studentsEmails.data.rows[i].student_id);
  }
  // console.log("student emails", stEmails);
  // console.log("student emails", stIds);
  const emailBody =
    "<!DOCTYPE html>" +
    "<html><head><title>Class Reminder</title>" +
    "</head><body><div>" +
    `</br>` +
    `<p>Dear <span style="font-weight: bold">Student</span>,</p>` +
    `<p>We hope this email finds you well.</p>` +
    `<p>We would like to remind you about your upcoming class next week:</p>` +
    `<ul>
      <li>Class: ${classInfo.data.rows[0].course_id} : ${classInfo.data.rows[0].course_name
    } - ${classInfo.data.rows[0].teacher_firstname} ${classInfo.data.rows[0].teacher_lastname
    } </li>
      <li>Start Date: ${dateFormatter(
      classInfo.data.rows[0].startdate
    )} at  ${timeFormatter(fromTime)} till  ${timeFormatter(toTime)}   </li>
        <li> Building: ${locationInfo.data.rows[0].room_building} - Room: ${locationInfo.data.rows[0].room_name
    }</li>
      </ul>` +
    `<p>If you have any questions or require any further information, please do
      not hesitate to contact your program manager.</p>` +
    `<p>  We look forward to your active participation and engagement in the
      upcoming class.</p>` +
    `<p>Best regards,</p>` +
    `<p>ESA Business School</p>` +
    `</br>` +
    "</div></body></html>";

  console.log("=====s=====ss=======ss=====s=====ss====");
  const beforeSeven = getSevenDaysBefore(classInfo.data.rows[0].startdate);
  console.log(beforeSeven);
  const seperateDate = dateSeperator(beforeSeven);
  console.log("===============================");
  console.log(seperateDate);

  let sendMailData = {
    emails: stEmails,
    content: emailBody,
    day: seperateDate.day,
    month: seperateDate.month,
  };
  const res = await axios.post(
    `https://esasis.esa.edu.lb/api/admin/adminApi/schedulemail`,
    sendMailData
  );
  console.log(res);

  let data = {
    receiverIds: stIds,
    senderId: null,
    content: emailBody,
    subject: "Class Reminder",
  };
  const sendToNotification = await axios.post(
    `https://esasis.esa.edu.lb/api/pmApi/addNotification`,
    data
  );
  console.log(sendToNotification);
};

export default sendMailClass;
