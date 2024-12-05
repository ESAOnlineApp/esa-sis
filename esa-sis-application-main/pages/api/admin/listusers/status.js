// /*
//  * Created By: Moetassem Chebbo
//  * Project: SIS Application
//  * File: pages\api\admin\listusers\status.js
//  * École Supérieure des Affaires (ESA)
//  * Copyright (c) 2023 ESA
//  */

// import db from '../../../../utilities/connectToDb';
// import UserProfile from '../../../../models/user/ProfileModel';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../../auth/[...nextauth]';
// import decrypt from '../../../../utilities/encrypt_decrypt/decryptText';
// import { connect, disconnect } from '../../../../utilities/db';
// import selection_data from '../../../../utilities/selection_data';
// import {
//   findData,
//   UpdateData,
//   ReadData,
//   InsertDataByID,
// } from '../../controller/queries';
// import xss from 'xss-filters';
// import sis_app_logger from '../../../api/logger';
// import useragent from 'useragent';
// // import fs from 'fs';
// // import path from 'path';
// // import * as dateFn from 'date-fns';

// async function handler(req, res) {
//   if (req.method !== 'PUT') {
//     return res.status(400).send({ message: `${req.method} not supported` });
//   }

//   const session = await getServerSession(req, res, authOptions);

//   if (!session) {
//     return res.status(401).send({ message: 'Signin Required To Update' });
//   }

//   const { user } = session;

//   if (user.role === '1') {
//     return res.status(401).send({ message: 'You are Unauthorized' });
//   }
//   const userAgent = req.headers['user-agent'];
//   const userAgentinfo = useragent.parse(userAgent);

//   const incomingData = JSON.parse(decrypt(req.body.data));

//   const ID = xss.inHTMLData(incomingData.ID);

//   const status = xss.inHTMLData(incomingData.status);

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
//     try {
//       await db.connect();

//       const existingUserID = await UserProfile.findOne({ ID });

//       if (!existingUserID) {
//         return res.status(404).send({ message: 'User not found' });
//       }

//       existingUserID.status = status;

//       sis_app_logger.info(
//         `${new Date()}=${user.role}=change student status=${user.email}=${
//           userAgentinfo.os.family
//         }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
//           userAgentinfo.source
//         }=${userAgentinfo.device.family}`
//       );
//       res.status(200).json({
//         message: `Account Status was Changed in the database to:${status}`,
//       });

//       await existingUserID.save();

//       // await existingUserID.save();
//       await db.disconnect();
//     } catch (error) {
//       sis_app_logger.error(
//         `${new Date()}=change student status error=${user.role}=${user.email}=${
//           error.message
//         }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
//           userAgentinfo.family
//         }=${userAgentinfo.source}=${userAgentinfo.device.family}`
//       );
//       console.error(error);
//       res.status(500).send({ message: 'Failed to update user', error });
//     }
//   } else {
//     try {
//       const connection = await connect();

//       const existingUserID = await findData(
//         connection,
//         'user_id',
//         'user_profile',
//         ID
//       );
//       if (!existingUserID.result) {
//         return res.status(404).send({ message: 'User not found' });
//       }
//       const userprofile = await ReadData(connection, 'user_profile', ID);
//       if (userprofile.status === 'submitted' && status === 'incomplete') {
//         const user_doc = await ReadData(connection, 'user_document', ID);
//         const old_report = await ReadData(connection, 'old_report', ID);

//         //Checks if reportURL is not empty
//         if (!user_doc.reportURL == '') {
//           //Checing if there is no previous report
//           if (!old_report) {
//             //adding user ID to old report ID with his previous report
//             await InsertDataByID(connection, ['old_report'], ID);
//             await UpdateData(connection, 'old_report', ID, [
//               'old_report',
//               user_doc.reportURL,
//             ]);
//             //emptying the old report in document table
//             await UpdateData(connection, ['user_document'], ID, [
//               'reportURL',
//               '',
//             ]);
//             //  const oldReportPath =
//             //   'C:/'+
//             //   path.join(
//             //   'Files',
//             //   'Archive',
//             //    user.ID.toString(),
//             //   'old_report');
//             // if (!fs.existsSync(oldReportPath)) {
//             //   fs.mkdirSync(oldReportPath, { recursive: true });
//             // }
//             //   const reportFilePath=path.join(oldReportPath,`${user.name}_${user.ID}_${
//             //   user.promotion
//             //   }_Application_${dateFn.format(Date.now(), 'dd-MM-yyyy')}.pdf`)

//             //   fs.writeFileSync(reportFilePath,old_report);
//             //   // console.log("user_doc.reportURL",old_report)
//           }
//           //if there exists an old report Update it
//           else {
//             await UpdateData(connection, 'old_report', ID, [
//               'old_report',
//               user_doc.reportURL,
//             ]);
//             //emptying the old report in document table
//             await UpdateData(connection, ['user_document'], ID, [
//               'reportURL',
//               '',
//             ]);
//           }
//         }
//       }
//       //Updating status
//       await UpdateData(connection, 'user_profile', ID, ['status', status]);

//       sis_app_logger.info(
//         `${new Date()}=${user.role}=change student status=${user.email}=${
//           userAgentinfo.os.family
//         }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
//           userAgentinfo.source
//         }=${userAgentinfo.device.family}`
//       );

//       res.status(200).json({
//         message: `Account Status was Changed in the database to:${status}`,
//       });

//       await disconnect(connection);
//     } catch (error) {
//       sis_app_logger.error(
//         `${new Date()}=change student status error=${user.role}=${user.email}=${
//           error.message
//         }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
//           userAgentinfo.family
//         }=${userAgentinfo.source}=${userAgentinfo.device.family}`
//       );
//       console.error(error);
//       res.status(500).send({ message: 'Failed to update user', error });
//     }
//   }
// }
// export default handler;
