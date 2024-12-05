

import emailing_data from '../../../utilities/emailing/emailing_data';
import createTransporter from '../../../utilities/emailing/smtp';
import dotenv from "dotenv";



dotenv.config("../env");
const transporter = createTransporter();

const SendEmail = async (           
 certificateName,
  recipientEmail,
  recipientFirstName,
  recipientLastName) => {
  try {
   
    
    const fromEmail = emailing_data.fromEmail;
   
    // const bccEmail = emailing_data.bccEmail;
    const subject = `Student Grades`;

    const emailBody =
      '<!DOCTYPE html>' +
      '<html><head><title>Grades</title>' +
      '</head><body><div>' +
      `<div style="text-align: center;">
         </div>` +
      `</br>` +
      `<p>Dear <span style="font-weight: bold">${recipientFirstName} ${recipientLastName}</span>,</p>` +
      `<p>We trust this email finds you well.</p> ` +
      `<p>We would like to inform you that your most recent grade for <span style="font-weight: bold"> ${certificateName}</span> has been updated on the Student Information System <span style="font-weight: bold"> (SIS)</span>. </p>` +
      // `<p> Please login using the below credentials:</p>` +
      // `<p>Your username: <span style="font-weight: bold">${email}</span>.</p>` +
      // `<p>Your password: <span style="font-weight: bold">${defaultpassword}</span>.</p>` +

      `<p>To review the details of this update, please log in to the SIS portal using your credentials and navigate to the <span style="font-weight: bold">"Grades" </span> section.</p>` +
      `<p>
      Should you have any inquiries or require further clarification regarding the updated grade, do not hesitate to contact your program manager.</p>` +
      `<p>Best regards,</p> ` +
      `<p>ESA Business School</p> ` +

      '</div></body></html>';

    const mailOptions = {
      from: fromEmail,
      to: recipientEmail,
    //   cc: '',
    //   bcc: bccEmail,
      subject: subject,
      html: emailBody,
    //   attachments: attachments,
      purpose: 'Grades',
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};



export default SendEmail;
