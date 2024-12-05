/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: utilities\emailing\emailAfterSubmission.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import emailing_data from "../emailing_data";
import * as dateFn from "date-fns";
//import selection_data from '../selection_data';
import axios from "axios";
import encrypt from "../encrypt_decrypt/encryptText";
import decrypt from "../encrypt_decrypt/decryptText";
// import { useSelector } from 'react-redux';

async function EmailAfterSubmission({
  lname,
  fname,
  ID,
  email,
  router,
  reportURL,
  major,
  emergencycontact_medicalhealth,
}) {
  // FIXME: After verification signin and go to home or filling application
  const name = fname + " " + lname;
  const fromEmail = emailing_data.fromEmail;
  const ccEmail = emailing_data.ccEmail;
  const bccEmail = emailing_data.bccEamil;
  const subject = `Your application was submitted successfully`;
  const admissionsDepartmentEmail = emailing_data.admissionsDepartmentEmail;
  const reportName = `${fname}_${lname}-${ID}-Application-${dateFn.format(
    Date.now(),
    "dd-MM-Y"
  )}.pdf`;

  // const appState = useSelector(
  //   (state) => state.persistedReducer.app_state.appState
  // );
  const apiUrl = "/api/controller/settingdata";
  const response = await fetch(apiUrl);
  const data = await response.json();
  const decryptedData = JSON.parse(decrypt(data.data));
  const esa_logo = decryptedData.setting[0].esa_logo;
  const MBA_recommendation_letter =
    decryptedData.setting[0].MBA_recommendation_letter;
  const EMBA_recommendation_letter =
    decryptedData.setting[0].EMBA_recommendation_letter;
  let requiredDocument;
  let attachments;
  let emailBody;
  if (major === "BBA (Bachelor in Business Administration)") {
    requiredDocument = `<p>
    <ul>
      <li>Copie de votre pièce d’identité.</li>
      <li>Une photo type passeport (avec votre nom écrit à l’arrière)</li>
      <li>Copie des relevés de notes des classes suivantes : 2nde, 1ère et celui de la Terminale du 1er trimestre et/ou du 2ème semestre (si disponible)</li>
      <li>Deux lettres de recommandation (de la part de vos professeurs ou d’un professionnel)</li>
      <li>Copie du résultat de l’épreuve anticipée du baccalauréat</li>
      <li>Copie de votre CV</li>
      <li>Résultat du S.A.T1. (Code de l’Université sur Collegeboard : 6921)</li>
      <li> Copie certifiée du diplôme du baccalauréat dès qu’elle sera disponible</li>
    </ul>
    </p>`;
  } else if (major === "MEMS (Master Executif en Management de la Santé)") {
    requiredDocument = `<p>

    <ul>
      <li>Copie de votre pièce d’identité.</li>
      <li>Une photo type passeport</li>
      <li>Copie des relevés de notes des classes suivantes : 
             • Universitaire <br>
             •	Copie du baccalauréat libanais ou de l’équivalence signée par le ministère de l’Enseignement libanais 
             </li>
      <li>Copie des relevés de notes </li>
      <li>Copie du CV (rempli suivant le format de L’ESA)</li>
      <li>Lettre de motivation</li>
      <li>Lettre de recommandation</li>
    </ul>
    </p>`;
  } else if (major === "MIM (International Masters In Management)") {
    requiredDocument = `<p>

      <ul>
        <li>Copie de votre pièce d’identité.</li>
        <li>Une photo type passeport</li>
        <li>Copie des relevés de notes des classes suivantes : <br>
               • Universitaire <br>
               • Copie du baccalauréat libanais ou de l’équivalence signée par le ministère de l’Enseignement libanais 
               </li>
        <li>Copie des relevés de notes </li>
        <li>Copie du CV  </li>
        <li>Lettre de motivation</li>
        <li>Lettre de recommandation</li>
      </ul>
      </p>`;
  } else if (
    major === "MIAD (Master in International Affairs and Diplomacy)" ||
    major === "MENT (Masters in Entrepreneurship)" ||
    major === "MSM (Mastère de Spécialisation en Marketing et Communication)" ||
    major === "EMFM (Executive Master in Financial Management)"
  ) {
    requiredDocument = `<p>

              <ul>
                <li>Passport-size photo</li>
                <li>Copy of passport</li>
                <li>Certified copy of the Baccalaureate diploma</li>
                <li>Certified copy of the bachelor’s degree</li>
                <li>Official transcript</li>
                <li>Letter of motivation</li>
                <li>Letter of recommendation</li>
                <li>CV</li>
              </ul>
              </p>`;
  } else if (major === "EMBA (Executive Masters in Business Administration)") {
    requiredDocument = `<p>

      <ul>
        <li>Passport-size photo</li>
        <li>Copy of passport</li>
        <li>Certified copy of the Baccalaureate diploma</li>
        <li>Certified copy of the bachelor’s degree</li>
        <li>Official transcript</li>
        <li>English test score – IELTS, TOEIC or Internet-Based TOEFL (IBT)</li>
        <li>Two letters of recommendation (Mandatory use of Attached ESA template)</li>
        <li>CV</li>
      </ul>
      </p>`;
  } else if (major === "MBA (Master in Business Administration)") {
    requiredDocument = `<p>

      <ul>
        <li>Passport-size photo</li>
        <li>Copy of passport</li>
        <li>Certified copy of the Baccalaureate diploma</li>
        <li>Certified copy of the bachelor’s degree</li>
        <li>Official transcript</li>
        <li>Letter of employment</li>
        <li>GMAT if available</li>
        <li>Two letters of recommendation (Mandatory use of Attached ESA template)</li>
        <li>CV</li>
      </ul>
      </p>`;
  } else if (major === "DBA (Doctorate in Business Administration)") {
    requiredDocument = `<p>

      <ul>
        <li>Passport-size photo</li>
        <li>Copy of passport</li>
        <li>Certified copy of the Baccalaureate diploma</li>
        <li>Certified copy of the bachelor’s degree</li>
        <li>Certified copy of the master’s degree</li>
        <li>Official transcript</li>
        <li>Motivation letter</li>
        <li>English Proficiency test results (IELTS, TOEFL)</li>
        <li>Research proposal </li>
      </ul>
      </p>`;
  }
  if (
    major === "BBA (Bachelor in Business Administration)" ||
    major === "MEMS (Master Executif en Management de la Santé)" ||
    major === "MIM (International Masters In Management)" ||
    major === "MIAD (Master in International Affairs and Diplomacy)" ||
    major === "MENT (Masters in Entrepreneurship)" ||
    major === "MSM (Mastère de Spécialisation en Marketing et Communication)" ||
    major === "EMFM (Executive Master in Financial Management)" ||
    major === "DBA (Doctorate in Business Administration)"
  ) {
    attachments = [
      // Report returned as cloudainary url from convertFormToPdf
      {
        filename: reportName,
        path: reportURL,
        cid: "PDF Report",
      },
      {
        path: `${esa_logo}`,
        cid: "esalogo",
      },
    ];
    if (emergencycontact_medicalhealth === "Yes") {
      emailBody =
        "<!DOCTYPE html>" +
        "<html><head><title>Appointment</title>" +
        "</head><body><div>" +
        // FIXME: Commented to deploy on VERCEL
        `<div style="text-align: center;">

        <img src="cid:esalogo" alt="" width = "120">
        </div>` +
        `</p>Dear <span style="font-weight: bold">${name}</span>,</p>` +
        `<p>Your application ID: <span style="font-weight: bold">${ID}</span></p>` +
        `<p>Hope this email finds you well and thank you for completing your application to ESA Business School.</p>` +
        `<p>You will find attached your application in PDF format.</p>` +
        `<p>You are kindly asked to print it out and submit it along with the uploaded documents, a passport-size photo, and the fees (20 USD) to the ESA campus this 
    <span style="font-weight: bold">Tuesday, Wednesday, or Thursday between 9h00 and 15h00.</span></p>` +
        `</br>` +
        `<p>Please note that the following documents are required to be submitted along with your application:</p>` +
        `${requiredDocument}` +
        `<p>Please present a copy of your medical report.</p>` +
        `<p>I remain at your disposal for any further inquiries,</p>` +
        `<p>Best regards,</p>` +
        `</br>` +
        `<p><span style="font-weight: italic">The Admissions Department </span></p> ` +
        `<p><span style="font-weight: italic"> ${admissionsDepartmentEmail} </span></p>` +
        `<p><span style="font-weight: italic"> +961 3 394 584 | WhatsApp or Phone Call </span></p>` +
        "</div></body></html>";
    } else {
      emailBody =
        "<!DOCTYPE html>" +
        "<html><head><title>Appointment</title>" +
        "</head><body><div>" +
        // FIXME: Commented to deploy on VERCEL
        `<div style="text-align: center;">
        <img src="cid:esalogo" alt="" width = "120">
        </div>` +
        `</p>Dear <span style="font-weight: bold">${name}</span>,</p>` +
        `<p>Your application ID: <span style="font-weight: bold">${ID}</span></p>` +
        `<p>Hope this email finds you well and thank you for completing your application to ESA Business School.</p>` +
        `<p>You will find attached your application in PDF format.</p>` +
        `<p>You are kindly asked to print it out and submit it along with the uploaded documents, a passport-size photo, and the fees (20 USD) to the ESA campus this 
    <span style="font-weight: bold">Tuesday, Wednesday, or Thursday between 9h00 and 15h00.</span></p>` +
        `</br>` +
        `<p>Please note that the following documents are required to be submitted along with your application:</p>` +
        `${requiredDocument}` +
        `<p>I remain at your disposal for any further inquiries,</p>` +
        `<p>Best regards,</p>` +
        `</br>` +
        `<p><span style="font-weight: italic">The Admissions Department </span></p> ` +
        `<p><span style="font-weight: italic"> ${admissionsDepartmentEmail} </span></p>` +
        `<p><span style="font-weight: italic"> +961 3 394 584 | WhatsApp or Phone Call </span></p>` +
        "</div></body></html>";
    }
  } else if (major === "MBA (Master in Business Administration)") {
    attachments = [
      // Report returned as cloudainary url from convertFormToPdf
      {
        filename: reportName,
        path: reportURL,
        cid: "PDF Report",
      },
      {
        path: `${esa_logo}`,
        cid: "esalogo",
      },
      (attachments = {
        path: `${MBA_recommendation_letter}`,
        cid: "MBALetter",
      }),
    ];
    if (emergencycontact_medicalhealth === "Yes") {
      emailBody =
        "<!DOCTYPE html>" +
        "<html><head><title>Appointment</title>" +
        "</head><body><div>" +
        // FIXME: Commented to deploy on VERCEL
        `<div style="text-align: center;">
          <img src="cid:esalogo" alt="" width = "120">
          </div>` +
        `</p>Dear <span style="font-weight: bold">${name}</span>,</p>` +
        `<p>Your application ID: <span style="font-weight: bold">${ID}</span></p>` +
        `<p>Hope this email finds you well and thank you for completing your application to ESA Business School.</p>` +
        `<p>You will find attached your application in PDF format.</p>` +
        `<p>You are kindly asked to print it out and submit it along with the uploaded documents, a passport-size photo, and the fees (20 USD) to the ESA campus this 
      <span style="font-weight: bold">Tuesday, Wednesday, or Thursday between 9h00 and 15h00.</span></p>` +
        `</br>` +
        `<p>Please note that the following documents are required to be submitted along with your application:</p>` +
        `${requiredDocument}` +
        `<p>Please present a copy of your medical report.</p>` +
        `<p>I remain at your disposal for any further inquiries,</p>` +
        `</br>` +
        `<p><span style="font-weight: italic">The Admissions Department </span></p> ` +
        `<p><span style="font-weight: italic"> ${admissionsDepartmentEmail} </span></p>` +
        `<p><span style="font-weight: italic"> +961 3 394 584 | WhatsApp or Phone Call </span></p>` +
        '<a href="cid:MBALetter"></a>' +
        "</div></body></html>";
    } else {
      emailBody =
        "<!DOCTYPE html>" +
        "<html><head><title>Appointment</title>" +
        "</head><body><div>" +
        // FIXME: Commented to deploy on VERCEL
        `<div style="text-align: center;">
          <img src="cid:esalogo" alt="" width = "120">
          </div>` +
        `</p>Dear <span style="font-weight: bold">${name}</span>,</p>` +
        `<p>Your application ID: <span style="font-weight: bold">${ID}</span></p>` +
        `<p>Hope this email finds you well and thank you for completing your application to ESA Business School.</p>` +
        `<p>You will find attached your application in PDF format.</p>` +
        `<p>You are kindly asked to print it out and submit it along with the uploaded documents, a passport-size photo, and the fees (20 USD) to the ESA campus this 
      <span style="font-weight: bold">Tuesday, Wednesday, or Thursday between 9h00 and 15h00.</span></p>` +
        `</br>` +
        `<p>Please note that the following documents are required to be submitted along with your application:</p>` +
        `${requiredDocument}` +
        `<p>I remain at your disposal for any further inquiries,</p>` +
        `<p>Best regards,</p>` +
        `</br>` +
        `<p><span style="font-weight: italic">The Admissions Department </span></p> ` +
        `<p><span style="font-weight: italic"> ${admissionsDepartmentEmail} </span></p>` +
        `<p><span style="font-weight: italic"> +961 3 394 584 | WhatsApp or Phone Call </span></p>` +
        '<a href="cid:MBALetter"></a>' +
        "</div></body></html>";
    }
  } else if (major === "EMBA (Executive Masters in Business Administration)") {
    attachments = [
      // Report returned as cloudainary url from convertFormToPdf
      {
        filename: reportName,
        path: reportURL,
        cid: "PDF Report",
      },
      {
        path: `${esa_logo}`,
        cid: "esalogo",
      },
      (attachments = {
        path: `${EMBA_recommendation_letter}`,
        cid: "EMBALetter",
      }),
    ];
    if (emergencycontact_medicalhealth === "Yes") {
      emailBody =
        "<!DOCTYPE html>" +
        "<html><head><title>Appointment</title>" +
        "</head><body><div>" +
        // FIXME: Commented to deploy on VERCEL
        `<div style="text-align: center;">
         <img src="cid:esalogo" alt="" width = "120">
         </div>` +
        `</p>Dear <span style="font-weight: bold">${name}</span>,</p>` +
        `<p>Your application ID: <span style="font-weight: bold">${ID}</span></p>` +
        `<p>Hope this email finds you well and thank you for completing your application to ESA Business School.</p>` +
        `<p>You will find attached your application in PDF format.</p>` +
        `<p>You are kindly asked to print it out and submit it along with the uploaded documents, a passport-size photo, and the fees (20 USD) to the ESA campus this 
     <span style="font-weight: bold">Tuesday, Wednesday, or Thursday between 9h00 and 15h00.</span></p>` +
        `</br>` +
        `<p>Please note that the following documents are required to be submitted along with your application:</p>` +
        `${requiredDocument}` +
        `<p>Please present a copy of your medical report.</p>` +
        `<p>I remain at your disposal for any further inquiries,</p>` +
        `<p>Best regards,</p>` +
        `</br>` +
        `<p><span style="font-weight: italic">The Admissions Department </span></p> ` +
        `<p><span style="font-weight: italic"> ${admissionsDepartmentEmail} </span></p>` +
        `<p><span style="font-weight: italic"> +961 3 394 584 | WhatsApp or Phone Call </span></p>` +
        '<a href="cid:EMBALetter"></a>' +
        "</div></body></html>";
    } else {
      emailBody =
        "<!DOCTYPE html>" +
        "<html><head><title>Appointment</title>" +
        "</head><body><div>" +
        // FIXME: Commented to deploy on VERCEL
        `<div style="text-align: center;">
         <img src="cid:esalogo" alt="" width = "120">
         </div>` +
        `</p>Dear <span style="font-weight: bold">${name}</span>,</p>` +
        `<p>Your application ID: <span style="font-weight: bold">${ID}</span></p>` +
        `<p>Hope this email finds you well and thank you for completing your application to ESA Business School.</p>` +
        `<p>You will find attached your application in PDF format.</p>` +
        `<p>You are kindly asked to print it out and submit it along with the uploaded documents, a passport-size photo, and the fees (20 USD) to the ESA campus this 
     <span style="font-weight: bold">Tuesday, Wednesday, or Thursday between 9h00 and 15h00.</span></p>` +
        `</br>` +
        `<p>Please note that the following documents are required to be submitted along with your application:</p>` +
        `${requiredDocument}` +
        `<p>I remain at your disposal for any further inquiries,</p>` +
        `<p>Best regards,</p>` +
        `</br>` +
        `<p><span style="font-weight: italic">The Admissions Department </span></p> ` +
        `<p><span style="font-weight: italic"> ${admissionsDepartmentEmail} </span></p>` +
        `<p><span style="font-weight: italic"> +961 3 394 584 | WhatsApp or Phone Call </span></p>` +
        '<a href="cid:EMBALetter"></a>' +
        "</div></body></html>";
    }
  }
  const payload = JSON.stringify({
    from: fromEmail,
    to: email,
    cc: ccEmail,
    bcc: bccEmail,
    subject: subject,
    emailBody: emailBody,
    attachments: attachments,
    purpose: "submission",
  });
  // Encrypt the data before sending in the body
  // end-to-end encryption for query parameters
  const encryptedBody = JSON.stringify({ data: encrypt(payload) });
  const emailresp = await fetch("/api/emailing/sendEmail", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: encryptedBody,
  });
  let status = "incomplete";
  // let resp;
  let title = "Sending Submission Email Failed";
  let message = "Emailing Service Not Available!";
  let instructions =
    "Please try to submit the Application later, If the attempt fails, contact us on the following email:";
  let itservicedeskemail = "itservicedesk@esa.edu.lb";
  let clarification =
    "Your Application has been saved, you just have to log into your account and go to Student Application from the Menu, and try to submit the Application again";
  emailresp.status === 200
    ? router.push("/user/message/submissionEmail")
    : (await axios.put("/api/CRUD_Op/changeStatusByID", {
        data: encrypt(JSON.stringify({ ID, status })),
      }),
      // // console.log(resp.data.message),
      router.push(
        `/user/message/messageEmailingService?title=${title}&message=${message}&instructions=${instructions}&email=${itservicedeskemail}&clarification=${clarification}`
      ));
  return emailresp.status;

  // End send email
}

export default EmailAfterSubmission;
