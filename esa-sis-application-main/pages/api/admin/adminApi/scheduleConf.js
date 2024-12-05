// import emailing_data from "../../../../utilities/emailing/emailing_data";
import createTransporter from '../../../../utilities/emailing/smtp'

const transporter = createTransporter();

const SendEmailTo = async (emails, content) => {
  console.log('Transporter:', transporter);
  console.log('createTransporter:', createTransporter);

  try {
    const mailOptions = {
      from: "noreply@esa.edu.lb",
      to: "bcc@esa.edu.lb",
      cc: "",
      bcc: "",
      subject: "Class Reminder",
      html: content,
      // attachments: attachments,
      purpose: "Class Reminder",
    };

    await transporter.sendMail(mailOptions);
    return {
      success: true,
      code: 200,
      message: `send mail`,
      data: emails
    };
  } catch (error) {
    return {
      success: false,
      code: 500,
      message: "An error occurred while processing the request.",
      error: error.message,
    };
  }
};

export default SendEmailTo;
