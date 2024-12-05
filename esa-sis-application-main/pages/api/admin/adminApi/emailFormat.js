import emailing_data from '../../../../utilities/emailing/emailing_data';
import createTransporter from '../../../../utilities/emailing/smtp';
import dotenv from "dotenv";



dotenv.config("../env");
const transporter = createTransporter();

const SendEmail = async (name, email, password, studentId, esa_logo) => {
  // console.log('wsll email' , password)
  try {
  //  console.log('pass' , password)
    const itServiceDeskEmail = emailing_data.itServiceDeskEmail;
    const fromEmail = emailing_data.fromEmail;
    const link = `${process.env.NEXTAUTHLOGIN_URL}`
    const bccEmail = emailing_data.bccEmail;
    const subject = `Your Student Information System (SIS) Access`;

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
      `<p>Congratulations on your successful enrollment at ESA Business School ! As part of your academic journey with us, we've set up your access to the Student Information System (SIS). </p>` +
      // `<p> Please login using the below credentials:</p>` +
      // `<p>Your username: <span style="font-weight: bold">${email}</span>.</p>` +
      // `<p>Your password: <span style="font-weight: bold">${defaultpassword}</span>.</p>` +

      `<p> Here are your credentials:
        <ul>
        • Your Username: <span style="font-weight: bold">${studentId}</span> <br>
        • Your Password: <span style="font-weight: bold">${password}</span>
        </ul>
        </p>
        ` +
      `<p> Please click on the below link to sign in to the SIS :</p>` +
      `<div style="text-align: center;"> 
            <a href='${link}' target="_blank" style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #0c0c0c;text-decoration: none;font-weight:bold;display: inline-block;">
            Sign In            
            </a>
            </div>` +
      `</br>` +
      `</br>` +
      `<p>For further assistance, you may contact us on the following email: ${itServiceDeskEmail}.</p> ` +
      `</br>` +
      `<p>Best regards,</p> ` +
      `<p>ESA Business School</p> ` +

      '</div></body></html>';

    const mailOptions = {
      from: fromEmail,
      to: email,
      cc: '',
      bcc: bccEmail,
      subject: subject,
      html: emailBody,
      attachments: attachments,
      purpose: 'New Active Student',
    };

    await transporter.sendMail(mailOptions);

  } catch (error) {
    return error;
  }
};



export default SendEmail;
