// /*
//  * Created By: KANSO Adi/Mohammad Yassine
//  * Project: SIS Application
//  * File: pages\api\CRUD_Op\changeStatusByID.js
//  * École Supérieure des Affaires (ESA)
//  * Copyright (c) 2023 ESA
//  */
// // import UserInfo from '../../../models/user/InfoModel';
// import UserProfile from '../../../models/user/ProfileModel';
// import db from '../../../utilities/connectToDb';
// import decrypt from '../../../utilities/encrypt_decrypt/decryptText';
// import xss from 'xss-filters';
// import { findData, UpdateData } from '../controller/queries';
// import { connect, disconnect } from '../../../utilities/db';
// import selection_data from '../../../utilities/selection_data';

// /**
//  * It takes a user ID, checks if it exists in the database, if it does, it deletes the user's profile
//  * and info from the database, if it doesn't, it returns an error message.
//  * @param req - The request object.
//  * @param res - The response object.
//  * @returns Nothing
//  */
// async function handler(req, res) {
//   if (req.method !== 'PUT') {
//     return res
//       .status(500)
//       .json({ message: 'HTTP method not valid only POST Accepted' });
//   }
//   const incomingData = JSON.parse(decrypt(req.body.data));
//   // // console.log('incomingData=', incomingData);
//   // sanitizing request body data
//   const ID = xss.inHTMLData(incomingData.ID);
//   const status = xss.inHTMLData(incomingData.status);

//   // const { ID, status } = req.body;
//   if (!ID) {
//     res.status(422).json({
//       message: 'ID Empty!!',
//     });
//     return;
//   }
//   if (!status) {
//     res.status(422).json({
//       message: 'status Empty!!',
//     });
//     return;
//   }
//   if (selection_data.isMongoDb) {
//     await db.connect();
//     const existingUserID = await UserProfile.findOne({ ID });
//     if (existingUserID) {
//       existingUserID.status = status;
//       res.status(200).json({
//         message: `Account Status was Changed in the database to:${status}`,
//       });
//       // // console.log('existingUserID=', existingUserID);
//       await existingUserID.save();
//       await db.disconnect();
//       return;
//     } else await db.disconnect();
//     return;
//   } else {
//     // MySQL Code

//     const connection = await connect();

//     const existingUserID = await findData(
//       connection,
//       'user_id',
//       'user_profile',
//       ID
//     );
//     // // console.log('existingUserID=', existingUserID);
//     if (existingUserID.result) {
//       await UpdateData(connection, 'user_profile', ID, ['status', status]);
//       res.status(200).json({
//         message: `Account Status was Changed in the database to:${status}`,
//       });
//       // // console.log('existingUserID==>', existingUserID);

//       await disconnect(connection);
//       return;
//     }
//     await disconnect(connection);
//     return;
//   }
// }

// export default handler;
