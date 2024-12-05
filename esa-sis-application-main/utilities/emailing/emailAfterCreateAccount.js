/*
 * Created By: Moetassem Chebbo
 * Project: SIS Application
 * File: utilities\emailing\emailAfterCreateAccount.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import emailing_data from '../emailing_data';
import selection_data from '../selection_data';
import encrypt from '../encrypt_decrypt/encryptText';
import decrypt from '../encrypt_decrypt/decryptText';
// import { useSelector } from 'react-redux';

async function EmailAfterCreateAccount({ lname, fname, ID, email, password }) {
  const link = `${window.location.origin}/user/login`;
  const itServiceDeskEmail = emailing_data.itServiceDeskEmail;
  const name = fname + ' ' + lname;
  const fromEmail = emailing_data.fromEmail;
  const ccEmail = emailing_data.ccEmail;
  const bccEmail = emailing_data.bccEmail;
  const subject = `Your account has been created`;
  // const appState = useSelector(
  //   (state) => state.persistedReducer.app_state.appState
  // );
  const apiUrl = '/api/controller/settingdata'; 
  const response = await fetch(apiUrl);
  const data = await response.json();
  const decryptedData = JSON.parse(decrypt(data.data));
  const esa_logo = decryptedData.setting[0].esa_logo
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
    `</p>Dear <span style="font-weight: bold">${name}</span>,</p>` +
    `<p>Your account has been created.</p>` +
    `<p>Your ID is: <span style="font-weight: bold">${ID}</span>.</p>` +
    `<br>` +
    `<p> Please login using the below credentials:</p>` +
    `<p>Your username: <span style="font-weight: bold">${email}</span>.</p>` +
    `<p>Your password: <span style="font-weight: bold">${password}</span>.</p>` +
    `<p>Click on the below link to sign in to your account:</p>` +
    `<div style="text-align: center;"> 
        <a href=${link} target="_blank" style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #0c0c0c;text-decoration: none;font-weight:bold;display: inline-block;">
        Sign In           
        </a>
        </div>` +
    `</br>` +
    `</br>` +
    `<p>For further assistance, you may contact us on the following email: ${itServiceDeskEmail}.</p> ` +
    `</br>` +
    `<p>Best regards,</p> ` +
    `<p>The Admissions Department </p> ` +
    `<p> +961 3 394 584 | WhatsApp or Phone Call </p> ` +
    '</div></body></html>';

  const payload = JSON.stringify({
    from: fromEmail,
    to: email,
    cc: ccEmail,
    bcc: bccEmail,
    subject: subject,
    emailBody: emailBody,
    attachments: attachments,
    purpose: 'submission',
  });

  const encryptedBody = JSON.stringify({ data: encrypt(payload) });

  await fetch('/api/emailing/sendEmail', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: encryptedBody,
  });
}

export default EmailAfterCreateAccount;
