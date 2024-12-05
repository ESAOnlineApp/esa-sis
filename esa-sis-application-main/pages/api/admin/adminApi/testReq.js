// import emailing_data from "../../../../utilities/emailing/emailing_data";
import createTransporter from "../../../../utilities/emailing/smtp";
import dotenv from "dotenv";

dotenv.config("../env");
const transporter = createTransporter();

const SendEmailTo = async (
  semester,
  academicYear,
  reason,
  student_id,
  major,
  student_name,
  student_email,
  gpa,
  pm_firstName,
  pm_lastname,
  pm_email,
  promotion
) => {
 
  try {
    // console.log(
    //   semester,
    //   academicYear,
    //   reason,
    //   student_id,
    //   major,
    //   student_name,
    //   student_email,
    //   gpa,
    //   pm_firstName,
    //   pm_lastname,
    //   pm_email
    // );
    // const itServiceDeskEmail = emailing_data.itServiceDeskEmail;
    // const fromEmail = emailing_data.fromEmail;
    // const link = `${process.env.NEXTAUTH_URL}`;
    // const bccEmail = emailing_data.bccEmail;
    // const subject = `Your ${role} Information System (SIS) Access`;

    // const attachments = [
    //   {
    //     path: `${esa_logo}`,
    //     cid: "esalogo",
    //   },
    // ];

    const emailBody =
      "<!DOCTYPE html>" +
      "<html><head><title>Student Request</title>" +
      "</head><body><div>" +
      // FIXME: Commented to deploy on VERCEL
      `<div style="text-align: center;">
        <img src="cid:esalogo" alt="" width = "120">
        </div>` +
      `<p>Dear <span style="font-weight: bold"> ${pm_firstName} ${pm_lastname}</span>,</p>` +
      `</br>` +
      `<p>We have received a request for an academic transcript for ${student_name}, who is enrolled in the ${major} program. The details are provided below:</p>
      ${!major.includes('EXED') ? `  
       <ul>
      <li>Student ID: ${student_id}</li>
      <li>Email Address: ${student_email}</li>
      <li>GPA: ${gpa}</li>

      
      <li>Promotion: ${promotion} </li>
      <li>Reason for Request: ${reason}</li>
      </ul>`:
        ` 
        <ul>
       <li>Student ID: ${student_id}</li>
       <li>Email Address: ${student_email}</li> 
       <li>Promotion: ${promotion} </li>
       <li>Reason for Request: ${reason}</li>
       </ul>`
    
    
    }
    ` +
      `<p>Thank you.</p> ` +
      `</br>` +
      `<p>Best Regards,</p> ` +
      "</div></body></html>";
    const emailBodyBBA =
      "<!DOCTYPE html>" +
      "<html><head><title>Student Request</title>" +
      "</head><body><div>" +
      // FIXME: Commented to deploy on VERCEL
      `<div style="text-align: center;">
        <img src="cid:esalogo" alt="" width = "120">
        </div>` +
      `<p>Dear <span style="font-weight: bold"> ${pm_firstName} ${pm_lastname}</span>,</p>` +
      `</br>` +
      `<p>We have received a request for an academic transcript for ${student_name}, who is enrolled in the ${major} program. The details are provided below:</p>
       <ul>
       <li>Student ID: ${student_id}</li>
       <li>Email Address: ${student_email}</li>
       <li>Requested Period: ${semester}  </li>
       <li>GPA : ${gpa}</li>
       <li>Promotion: ${promotion} </li>
       <li>Reason for Request: ${reason}</li>
       </ul>` +
      `<p>Thank you.</p> ` +
      `</br>` +
      `<p>Best Regards,</p> ` +
      "</div></body></html>";
    const mailOptions = {
      from: "noreply@esa.edu.lb",
      to: pm_email,
      cc: "",
      bcc: "",
      subject: "Request Transcript",
      html: semester ? emailBodyBBA : emailBody,
      //   attachments: attachments,
      purpose: "Request Transcript",
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};

export default SendEmailTo;
