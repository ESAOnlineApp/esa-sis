import dotenv from 'dotenv';
import createTransporter from '../../../utilities/emailing/smtp';

dotenv.config('../env');
const transporter = createTransporter();
const SendEmailTo = async (emails, emailContent, subjectContent, selectedSignature) => {

  // const apiUrl = '/api/controller/settingdata'; 
  // const response = await fetch(apiUrl);
  // const data = await response.json();
  // const decryptedData = JSON.parse(decrypt(data.data));
  // const esa_logo = decryptedData.setting[0].esa_logo;
  // const attachments = [
  //   {
  //     path: `${esa_logo}`,
  //     cid: 'esalogo',
  //   },
  // ];
  try {
    // const attachments = [
    //   {
    //     path: `http://80.77.180.245:3000/file/setting/public/esa.png`,
    //     cid: 'esalogo',
    //   },
    // ];
    let emailBody;
    {selectedSignature ? 
    emailBody =
      '<!DOCTYPE html>' +
      '<html><head><title>From Program manager</title>' +
      '</head><body><div>' +
      `<p>Dear <span style="font-weight: bold">Student</span>,</p>` +
      `<pre style="font-family: inherit; font-size: inherit; line-height: inherit; margin: 0; padding: 0;">${emailContent}</pre>` +
      `</br>` +
      `<p>Thank you.</p> ` +
      `</br>` +
      `<p>Best Regards,</p> ` +
// <<<<<<< HEAD
//       '</div></body></html>';
//     // const emailTo = emails.join(', ');
//     const mailOptions = {
//       from: 'noreply@esa.edu.lb',
//       to: 'Bcc@esa.edu.lb',
// =======
      `<!-- Adding Signature -->
      <div style="margin-top:20px;">
          <strong>${selectedSignature.name ? selectedSignature.name : ''}</strong><br>
          Senior Program Manager, Responsable de Programmes<br>
          <br>
          <div width="100" style="font-size: 10px; padding: 20px;">
          École Supérieure des Affaires<br>
          Campus de l’ESA, 289 rue Clemenceau<br>
          Beyrouth, Liban, B.P. 113-7318<br><br>
          T <a href=${selectedSignature.phone} style="text-decoration:none;color:black;">${selectedSignature.phone}</a><br>

          ${selectedSignature.tel_phone ? `F <a href=${selectedSignature.tel_phone} style="text-decoration:none;color:black;">${selectedSignature.tel_phone}</a><br>` : ''}
          E <a href=${selectedSignature.email} style="text-decoration:none;color:black;">${selectedSignature.email}</a><br>
          <a href="http://www.esa.edu.lb" style="text-decoration:none;color:black;">www.esa.edu.lb</a>
          </div>
      </div>` +
      '</div></body></html>'
      :
      emailBody =
      '<!DOCTYPE html>' +
      '<html><head><title>From Program manager</title>' +
      '</head><body><div>' +
      `<p>Dear <span style="font-weight: bold">Student</span>,</p>` +
      `<pre style="font-family: inherit; font-size: inherit; line-height: inherit; margin: 0; padding: 0;">${emailContent}</pre>` +
      `</br>` +
      `<p>Thank you.</p> ` +
      `</br>` +
      `<p>Best Regards,</p> ` +
      '</div></body></html>'
    }
    // const emailTo = emails.join(', ');
    const mailOptions = {
      from: 'noreply@esa.edu.lb',
      to: emails,
      cc: '',
      bcc: '',
      subject: subjectContent,
      html: emailBody,
      // attachments: attachments,
      purpose: 'Certificate purpose',
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('this error is in email in pmApi : ', error)
    return error;
  }
};

export default SendEmailTo;
