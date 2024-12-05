// const axios = require('axios')
// // import https from 'https';

import axios from "axios";
// import { getServerSession } from "next-auth";
import { parseString } from 'xml2js';
// import { authOptions } from "../auth/[...nextauth]";


// async function handler(req, res) {
//     try {
//         const credentialsXml = '<CREDENTIALS><USERNAME>API</USERNAME><PASSWORD>123</PASSWORD></CREDENTIALS>';

//         let token = await axios.post('http://192.168.10.36:8075/login', credentialsXml, {
//             headers: {
//               'Content-Type': 'application/xml'
//             }
//           })
//           // console.log(token)
//         if(token){
//             // recieve financial data
//             let {data} = await axios.get(`http://192.168.10.36:8075/statement?token=${token.data}&auxiliary=ST00000001&curr=EUR&fromdate=01/01/2023`);

//             // console.log(data)
//             res.status('200').send(data)

//         }else{
//             // console.log({message: "No token recieved."})
//             return res.status('401').send({message: "No token recieved."})
//         }

//     } catch (error) {
//         // console.log('the error is: ', error)
//         return res.status('401').send(error)
//         // return error;
//     }

// }
// // export default handler;
// module.exports = handler;

// const axios = require("axios");
// // import https from 'https';

// async function handler(req, res) {
//   try {
//     const credentialsXml =
//       "<CREDENTIALS><USERNAME>API</USERNAME><PASSWORD>123</PASSWORD></CREDENTIALS>";

//     let token = await axios.post(
//       "http://192.168.10.36:8075/login",
//       credentialsXml,
//       {
//         headers: {
//           "Content-Type": "application/xml",
//         },
//       }
//     );
//     // console.log(token.data)
//     //   res.status('200').send(token)
//     if (token) {
//       // recieve financial data
//       let total = await axios.get(
//         `http://192.168.10.36:8075/statement?token=${token.data}&auxiliary=ST00000001&curr=EUR&fromdate=01/01/2023`
//       );

//       if (total) {
//         // console.log('Statement=',total.data)
//         // res.status('200').send(total.data)

//         let balance = await axios.get(
//           `http://192.168.10.36:8075/EPL?cmd=PIMS(AUX,BAL,ST00000001)&token=${token.data}`
//         );
//         if (balance) {
//           // console.log('Balance=',balance.data)
//           res.status("200").send(`Balance= ${balance.data}`);
//         } else {
//           // console.log({message: "No open account recieved"})
//           res.status("401").send({ message: "No open account recieved" });
//         }

//         let balance_of_bill = await axios.get(
//           `http://192.168.10.36:8075/EPL?cmd=PIMS(AUX,BAL,ST00000001.BILL)&token=${token.data}`
//         );
//         if (balance_of_bill) {
//           // console.log('Balance of Bill=',balance_of_bill.data)
//           // res.status('200').send(`Balance of Bill= ${balance_of_bill.data}`)
//         } else {
//           // console.log({message: "No open account recieved"})
//           res.status("401").send({ message: "No open account recieved" });
//         }
//         let balance_of_open = await axios.get(
//           `http://192.168.10.36:8075/EPL?cmd=PIMS(AUX,BAL,ST00000001.OPEN)&token=${token.data}`
//         );
//         if (balance_of_open) {
//           // console.log('Balance of OPEN=',balance_of_open.data)
//           // res.status('200').send(`Balance of OPEN= ${balance_of_open.data}`)
//           // return ;
//         } else {
//           // console.log({message: "No open account recieved"})
//           res.status("401").send({ message: "No open account recieved" });
//         }
//       } else {
//         // console.log({message: "No data recieved"})
//         res.status("401").send({ message: "No data recieved" });
//       }
//     } else {
//       // console.log({message: "No token recieved."})
//       return res.status("401").send({ message: "No token recieved." });
//     }
//   } catch (error) {
//     // console.log('the error is: ', error)
//     return res.status("401").send(error);
//     // return error;
//   }
// }
// // export default handler;
// module.exports = handler;

  // Sample XML data

export default async function handler(req, res) {
  const pims_ip = process.env.PMIS_IP

  try {
    let {pimsID} = req.body;
        const credentialsXml = 
        `<CREDENTIALS>
        <USERNAME>TEST</USERNAME>
        <PASSWORD>TEST</PASSWORD>
        </CREDENTIALS>`;
        const axiosConfig = {
          headers: {
            'Content-Type': 'application/xml'
          },
          timeout: 10000 // Set timeout to 10 seconds (adjust as needed)
        };
        let token = await axios.post(`${pims_ip}/login`, credentialsXml, axiosConfig)
          console.log("token  :  ",token)
        if(token.status === 200){
            // recieve financial data
            let {data} = await axios.get(`${pims_ip}/statement?token=${token.data}&auxiliary=${pimsID}&curr=<ALL>`);
            // console.log('the data is : ', data)
            parseString(data, (err, result) => {
              if (err) {
                // console.error('Error parsing XML:', err);
                // res.status(500).json({ error: 'Error parsing XML' });
                res.status(200).json({code: 500, error: 'Error parsing XML' });
                return;
              }
          
              // Now `result` contains the JavaScript object representation of the XML
              const statements = result.STATEMENTS;
          
              // Respond with the parsed data
              res.status(200).json({code: 200, statements });
            });

        }else{
            // console.log({message: "No token recieved."})
            // return res.status('401').send({message: "No token recieved ."})
            return res.status(200).send({code: 401,message: "No token recieved ."})
        }
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.status;
// <<<<<<< HEAD
//       // console.log('the status code in pims : ', errorMessage)
// =======
// >>>>>>> 8770ee1c09f559de30b58ec6e847ade5fc85091a
      if (errorMessage === 400){
    // return res.status(500).send({ error: "Your pims Id is not existing in Pims database" });
    return res.status(200).send({code: 500, error: "Your pims Id is not existing in Pims database" });
      }
      // You can handle the error message here as needed
    } else {
      // Handle other types of errors
      console.error('An unexpected error occurred:', error);
    }
    // return res.status(500).send({ error: 'The pims server is shutdown.' });
    return res.status(200).send({code: 500, error: 'The pims server is shutdown.' });
  }

//   try{
//   let {data} = await axios.get(`http://localhost:8075/statement?token={4680C9DA-73A0-44FE-B20E-5134291FE5F4}&auxiliary=A001&curr=<ALL>`);
//   console.log('the data is : ', data)
//   parseString(data, (err, result) => {
//     if (err) {
//       console.error('Error parsing XML:', err);
//       res.status(500).json({ error: 'Error parsing XML' });
//       return;
//     }

//     // Now `result` contains the JavaScript object representation of the XML
//     const statements = result.STATEMENTS;

//     // Respond with the parsed data
//     res.status(200).json({ statements });
//   });
// }catch(error){
//   console.log('the error is : ', error)
//   return;
// }
}
