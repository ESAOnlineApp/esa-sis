// /*
//  * Created By: KANSO Adi/Mohammad Yassine
//  * Project: SIS Application
//  * File: pages\api\CRUD_Op\deleteByID.js
//  * École Supérieure des Affaires (ESA)
//  * Copyright (c) 2023 ESA
//  */

// import UserInfo from '../../../models/user/InfoModel';
// import UserProfile from '../../../models/user/ProfileModel';
// import db from '../../../utilities/connectToDb';
// import decrypt from '../../../utilities/encrypt_decrypt/decryptText';
// import xss from 'xss-filters';
// import selection_data from '../../../utilities/selection_data';
// import { connect } from '../../../utilities/db';
// import { findData, DeleteTableBYID } from '../controller/queries';

// async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res
//       .status(500)
//       .json({ message: 'HTTP method not valid only POST Accepted' });
//   }
//   const incomingID = JSON.parse(decrypt(req.body.data));
//   // sanitizing request body data
//   const ID = xss.inHTMLData(incomingID);
//   // // console.log('incomingID=', ID);
//   if (!ID) {
//     res.status(422).json({
//       message: 'ID Empty!!',
//     });
//     return;
//   }

//   if (selection_data.isMongoDb) {
//     await db.connect();
//     const existingUserID = await UserProfile.findOne({ ID });
//     if (existingUserID) {
//       const user_id = existingUserID._id;
//       const existingUserInfo = await UserInfo.findOne({
//         user_id,
//       });
//       await UserProfile.deleteOne({ ID: ID });
//       if (existingUserInfo) {
//         await UserInfo.deleteOne({ user_id: user_id });
//       }
//       res.status(200).json({
//         message: 'Account deleted from database',
//       });
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
//     if (existingUserID.result) {
//       await DeleteTableBYID(ID, 'user_profile', connection);
//       res.status(200).json({
//         message: 'Account deleted from database',
//       });
//       return;
//     } else return;
//   }
// }
// export default handler;
