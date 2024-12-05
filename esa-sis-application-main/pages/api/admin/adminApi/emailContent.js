import emailing_data from '../../../../utilities/emailing/emailing_data';
import createTransporter from '../../../../utilities/emailing/smtp';
import dotenv from "dotenv";



dotenv.config("../env");
const transporter = createTransporter();

const SendEmailTo = async (name, email, password, ID , esa_logo , role) => {
  try {
    
    // const itServiceDeskEmail = emailing_data.itServiceDeskEmail;
    const fromEmail = emailing_data.fromEmail;
    const link = `${process.env.NEXTAUTH_URL}`
    const bccEmail = emailing_data.bccEmail;
    const subject = `Your ${role} Information System (SIS) Access`;

    const attachments = [
      {
        path: `${esa_logo}`,
        cid: 'esalogo',
      },
    ];

    const emailBody =
      '<!DOCTYPE html>' +
      '<html><head><title>Appointment</title>' +
      '</head><body><div>' +
      `<div style="text-align: center;">
      <img src="cid:esalogo" alt="" width = "120">
         </div>` +
      `</br>` +
      `<p>Dear <span style="font-weight: bold">${name}</span>,</p>` +
      `<p>Hope this email finds you well.</p> ` +
      `<p></p>` +
      // `<p> Please login using the below credentials:</p>` +
      // `<p>Your username: <span style="font-weight: bold">${email}</span>.</p>` +
      // `<p>Your password: <span style="font-weight: bold">${defaultpassword}</span>.</p>` +

      `<p> Please use the provided credentials below to log in and access the new SIS(Student Information System):
        <ul>
        • Your Username: <span style="font-weight: bold">${ID}</span> <br>
        • Your Password: <span style="font-weight: bold">${password}</span> <br>
        • ${link} 

        </ul>
        </p>
        ` +
    //   `<p> Here are your credentials:</p>` +
    //   `<div style="text-align: center;"> 
    //         <a href='${link}' target="_blank" style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #0c0c0c;text-decoration: none;font-weight:bold;display: inline-block;">
    //         Sign In            
    //         </a>
    //         </div>` +
      `</br>` +
      `</br>` +
      `<p>Feel free to reach out to Latifa or Zeina if you have any questions or need support.` +
      `</br>` +
      `<p>Best regards,</p> ` +
      `<p>IT Department</p> ` +

      '</div></body></html>';

    const mailOptions = {
      from: fromEmail,
      to: email,
      cc: '',
      bcc: bccEmail,
      subject: subject,
      html: emailBody,
      attachments: attachments,
      purpose: 'New Active Program manager Assistant',
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    return error;
  }
};



export default SendEmailTo;
