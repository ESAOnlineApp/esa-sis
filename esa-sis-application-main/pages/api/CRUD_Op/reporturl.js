// /*
//  * Created By: Moetassem Chebbo
//  * Project: SIS Application
//  * File: pages\api\CRUD_Op\reporturl.js
//  * École Supérieure des Affaires (ESA)
//  * Copyright (c) 2023 ESA
//  */
// import db from '../../../utilities/connectToDb';
// import UserInfo from '../../../models/user/InfoModel';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../auth/[...nextauth]';
// import decrypt from '../../../utilities/encrypt_decrypt/decryptText';
// import selection_data from '../../../utilities/selection_data';
// import { connect, disconnect } from '../../../utilities/db';
// import { findData, UpdateData } from '../controller/queries';
// import xss from 'xss-filters';
// import online_app_logger from '../logger';
// import useragent from 'useragent';

// async function handler(req, res) {
//   if (req.method !== 'PUT') {
//     return res.status(400).send({ message: `${req.method} not supported` });
//   }

//   const session = await getServerSession(req, res, authOptions);

//   if (!session) {
//     return res.status(401).send({ message: 'Signin Required To Save Data' });
//   }

//   const { user } = session;
//   const userAgent = req.headers['user-agent'];
//   const userAgentinfo = useragent.parse(userAgent);

//   const incomingData = JSON.parse(decrypt(req.body.data));

//   const reportURL = xss.inHTMLData(incomingData.reportURL);
//   // // console.log('reportURLInSend', reportURL);

//   if (!reportURL) {
//     res.status(422).json({
//       message: 'reportURL Empty!!',
//     });
//     return;
//   }
//   if (selection_data.isMongoDb) {
//     try {
//       await db.connect();

//       const toUpdateUserReport = await UserInfo.findOne({ user_id: user._id });
//       if (!toUpdateUserReport) {
//         return res.status(404).send({ message: 'User not found' });
//       }
//       toUpdateUserReport.reportURL = reportURL;
//       online_app_logger.info(
//         `${new Date()}=${user.role}=add reprotURl=${user.email}=${
//           userAgentinfo.os.family
//         }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
//           userAgentinfo.source
//         }=${userAgentinfo.device.family}`
//       );

//       res.status(200).json({
//         message: 'Report URL was saved in the database',
//       });
//       await toUpdateUserReport.save();
//       await db.disconnect();
//     } catch (error) {
//       online_app_logger.error(
//         `${new Date()}=add reprotURl error=${user.role}=${user.email}=${
//           error.message
//         }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
//           userAgentinfo.family
//         }=${userAgentinfo.source}=${userAgentinfo.device.family}`
//       );
//       res.status(500).json({
//         message: 'Something went wrong',
//       });
//     }
//   } else {
//     const connection = await connect();
//     try {
//       const toUpdateUserReport = await findData(
//         connection,
//         'user_id',
//         'user_profile',
//         user._id
//       );
//       if (!toUpdateUserReport.result) {
//         return res.status(404).send({ message: 'User not found' });
//       }
//       await UpdateData(connection, 'user_document', user._id, [
//         'reportURL',
//         reportURL,
//       ]);
//       online_app_logger.info(
//         `${new Date()}=${user.role}=add reportURl=${user.email}=${
//           userAgentinfo.os.family
//         }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
//           userAgentinfo.source
//         }=${userAgentinfo.device.family}`
//       );
//       res.status(200).json({
//         message: 'Report URL was saved in the database',
//       });
//     } catch (error) {
//       online_app_logger.error(
//         `${new Date()}=add reportURl error=${user.role}=${user.email}=${
//           error.message
//         }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
//           userAgentinfo.family
//         }=${userAgentinfo.source}=${userAgentinfo.device.family}`
//       );
//       res.status(500).json({
//         message: 'Something went wrong',
//       });
//     } finally {
//       await disconnect(connection);
//     }
//   }
// }
// export default handler;
