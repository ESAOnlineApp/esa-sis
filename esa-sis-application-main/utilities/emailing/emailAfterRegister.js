/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: utilities\emailing\emailAfterRegister.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import emailing_data from "../emailing_data";
import axios from "axios";
import encrypt from "../encrypt_decrypt/encryptText";
//import selection_data from '../selection_data';
import decrypt from "../encrypt_decrypt/decryptText";

// import { useSelector } from 'react-redux';

async function EmailAfterRegister({
  emailToken,
  password,
  lname,
  fname,
  ID,
  email,
  router,
}) {
  // FIXME: After verification signin and go to home or filling application

  // Encrypt the query parameters before adding them to the URL
  // end-to-end encryption for query parameters
  const encryptedQuery = encodeURIComponent(
    encrypt(
      JSON.stringify({
        emailToken: `${emailToken}`,
        email: `${email}`,
        password: `${password}`,
      })
    )
  );
  const apiUrl = "/api/controller/settingdata";
  const response = await fetch(apiUrl);
  const data = await response.json();
  const decryptedData = JSON.parse(decrypt(data.data));
  const esa_logo = decryptedData.setting[0].esa_logo;
  const link = `${window.location.origin}/api/user/verifyemail?query=${encryptedQuery}`;

  // const link = `${window.location.origin}/api/user/verifyemail?token=${emailToken}&email=${email}&password=${password}`;

  const itServiceDeskEmail = emailing_data.itServiceDeskEmail;
  const fromEmail = emailing_data.fromEmail;
  const ccEmail = emailing_data.ccEmail;
  const bccEmail = emailing_data.bccEamil;
  const subject = `New mail from ${fromEmail}`;
  // const appState = useSelector(
  //   (state) => state.persistedReducer.app_state.appState
  // );
  const attachments = [
    {
      path: `${esa_logo}`,
      cid: "esalogo",
    },
  ];
  const emailBody =
    "<!DOCTYPE html>" +
    "<html><head><title>Appointment</title>" +
    "</head><body><div>" +
    `<div style="text-align: center;">
        <img src="cid:esalogo" alt="" width = "120">
        </div>` +
    `</p>Dear <span style="font-weight: bold">${lname} ${fname}</span>,</p>` +
    `<p>Thank you for your interest in ESA Business School Programs.</p>` +
    `<p>Your application ID: <span style="font-weight: bold">${ID}</span> to our school has been saved.</p>` +
    `<p>Please click on the below link to activate your account and proceed with filling in your application:</p>` +
    `<div style="text-align: center;"> 
        <a href=${link} target="_blank" style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #0c0c0c;text-decoration: none;font-weight:bold;display: inline-block;">
        Verify Your Email             
        </a>
        </div>` +
    `</br>` +
    `</br>` +
    `<p>When you are ready to complete your application, please login using the below credentials:</p>` +
    `<p>Your username: <span style="font-weight: bold"> ${email} </span></p>` +
    `<p>Your password: <span style="font-weight: bold">${password}</span></p>` +
    `</br>` +
    `<p>For further assistance, you may contact us on the following email: ${itServiceDeskEmail}.</p> ` +
    `</br>` +
    `<p>Best regards,</p> ` +
    `<p>The Admissions Department </p> ` +
    `<p> +961 3 394 584 | WhatsApp or Phone Call </p> ` +
    "</div></body></html>";
  const payload = JSON.stringify({
    from: fromEmail,
    to: email,
    cc: ccEmail,
    bcc: bccEmail,
    subject: subject,
    emailBody: emailBody,
    attachments: attachments,
    purpose: "verification",
  });
  // Encrypt the data before sending in the body
  // end-to-end encryption for query parameters
  const encryptedBody = JSON.stringify({ data: encrypt(payload) });
  await fetch("/api/emailing/sendEmail", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: encryptedBody,
    // body: JSON.stringify({
    //   from: fromEmail,
    //   to: email,
    //   cc: ccEmail,
    //   bcc: bccEmail,
    //   subject: subject,
    //   emailBody: emailBody,
    //   attachments: attachments,
    // }),
  }).then(async (res) => {
    // // console.log('Fetch= ', res);
    // let resp;
    let title = "Sending Verification Email Failed";
    let message = "Emailing Service Not Available!";
    let instructions = "Please contact us on the following email:";
    let emailservice = "itservicedesk@esa.edu.lb";

    // // console.log(res.status);
    // return res.status;
    // TODO: route to a send email success
    // FIXME: get error on live server (Vercel)
    // // console.log(`${window.location.origin}/user/validation`);

    res.status === 200
      ? router.push("/user/message/validation")
      : (await axios.post("/api/CRUD_Op/deleteByID", {
          data: encrypt(JSON.stringify(ID)),
        }),
        // // console.log(resp.data.message),
        // FIXME: if (resp.status!==200) I Suggest To send an message to the admin content the ID to Delete from the dashboed the data
        router.push(
          `/user/message/messageEmailingService?title=${title}&message=${message}&instructions=${instructions}&email=${emailservice}`
        ));
  });
  // End send email
}

export default EmailAfterRegister;
