import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config("../env");
// console.log('email',process.env.OFFICE365_EMAIL)
// console.log('password',process.env.OFFICE365_PASSWORD)
const createTransporter = () => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    
    port: "587",
    auth: {
      // TODO:will be changed to read from admin dashbord setting ()
      user: process.env.OFFICE365_EMAIL,
      pass: process.env.OFFICE365_PASSWORD,
    },
   
    secureConnection: false,
    tls: { ciphers: "SSLv3" ,
   
      rejectUnauthorized: false
  },
    debug: false, // show debug output
    logger: false, // log information in console
  });

  return transporter;
};

export default createTransporter;
