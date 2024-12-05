// import emailing_data from "../../../../utilities/emailing/emailing_data";
import createTransporter from "../../../../utilities/emailing/smtp";
import dotenv from "dotenv";

dotenv.config("../env");
const transporter = createTransporter();

const SendEmailTo = async (
  email,
  className,
  startdate,
  courseName,
  teacherName,
  from_time,
  to_time,
  room_name,
  building
) => {
  try {
    

    const emailBody =
      "<!DOCTYPE html>" +
      "<html><head><title>Class Reminder</title>" +
      "</head><body><div>" +
      `</br>` +
      `<p>Dear <span style="font-weight: bold">Student</span>,</p>` +
      `<p>We hope this email finds you well.</p>` +
      `<p>We would like to remind you about your upcoming class next week:</p>` +
      `<ul>
      <li>Class: ${className} : ${courseName} - ${teacherName}</li>
      <li>Start Date: ${startdate} at  ${from_time} till  ${to_time}</li>
      <li> Building: ${building} - Room: ${room_name}  </li>
      </ul>` +
      `<p>If you have any questions or require any further information, please do
      not hesitate to contact your program manager.</p>` +
      `<p>  We look forward to your active participation and engagement in the
      upcoming class.</p>` +
      `<p>Best regards,</p>` +
      `<p>ESA Business School</p>` +
      `</br>` +
      "</div></body></html>";
    const mailOptions = {
      from: "noreply@esa.edu.lb",
      to: email,
      cc: "",
      bcc: "",

      subject: "Class Reminder",
      html: emailBody,
      //   attachments: attachments,
      purpose: "Class Reminder",
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

export default SendEmailTo;
