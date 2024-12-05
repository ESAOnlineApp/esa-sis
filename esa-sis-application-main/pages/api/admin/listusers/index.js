// /*
//  * Created By: Moetassem Chebbo
//  * Project: SIS Application
//  * File: pages\api\admin\listuser.js
//  * École Supérieure des Affaires (ESA)
//  * Copyright (c) 2023 ESA
//  */

// import db from '../../../../utilities/connectToDb';
// import UserProfile from '../../../../models/user/ProfileModel';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../../auth/[...nextauth]';
// import UserInfo from '../../../../models/user/InfoModel';
// import major_code from '../../../../utilities/major_code';
// import selection_data from '../../../../utilities/selection_data';
// import encrypt from '../../../../utilities/encrypt_decrypt/encryptText';
// import { connect, disconnect } from '../../../../utilities/db';
// import { FilterData, findmajor_id } from '../../controller/queries';
// import { findextramajor, findemajor_user } from '../../controller/accountquery';
// import sis_app_logger from '../../../api/logger';
// import useragent from 'useragent';

// async function handler(req, res) {
//   if (req.method !== 'GET') {
//     return res.status(400).send({ message: `${req.method} not supported` });
//   }

//   const session = await getServerSession(req, res, authOptions);
//   if (!session) {
//     return res.status(401).send({ message: 'Signin Required' });
//   }

//   const { user } = session;
//   // const major = user.major;
//   // console.log(req.query);
//   // //// console.log('userRole=>', user.role);
//   // ADI: i changed it to cover the tow types of admin user (0 and 2)
//   if (user.role === '1') {
//     return res.status(401).send({ message: 'You are Unauthorized' });
//   }
//   const userAgent = req.headers['user-agent'];
//   const userAgentinfo = useragent.parse(userAgent);

//   if (selection_data.isMongoDb) {
//     const connection = await db.connect();
//     if (connection && !connection.success) {
//       return res.status(500).send({ message: connection.message });
//     }

//     /* Setting the default values for the query parameters. */
//     const page = req.query.page || 1;
//     const limit = selection_data.search_limit;
//     // const limit = 20;
//     let startDate;
//     let endDate;

//     /* Creating a filter object that will be used to filter the results of the query. */
//     const filter = {};

//     if (req.query.Fname) {
//       filter.fname = { $regex: req.query.Fname, $options: 'i' };
//     }
//     if (req.query.Lname) {
//       filter.lname = { $regex: req.query.Lname, $options: 'i' };
//     }

//     // if (req.query.Name) {
//     //   const splitName = req.query.Name.split(' ');
//     //   filter.fname = { $regex: splitName[0], $options: 'i' };
//     //   filter.lname = { $regex: splitName[1], $options: 'i' };
//     // }

//     if (req.query.status) {
//       filter.status = req.query.status;
//     }

//     if (req.query.ID) {
//       filter.ID = req.query.ID;
//     }

//     if (req.query.major) {
//       filter.major = req.query.major;
//     }

//     if (req.query.promotion) {
//       filter.promotion = req.query.promotion;
//     }

//     /* Filtering the results based on the date range. */
//     if (req.query.from && req.query.to) {
//       startDate = new Date(req.query.from);
//       endDate = new Date(req.query.to);
//       filter.$and = [
//         {
//           status: {
//             $in: ['submitted', 'complete', 'qualified', 'accepted', 'obsolete'],
//           },
//         },
//         { updatedAt: { $gte: startDate, $lte: endDate } },
//       ];
//     }

//     /* Filtering out the current user from the results. */
//     filter._id = { $ne: user._id };
//     filter.role = { $nin: ['0', '2'] };
//     filter.isVerified = { $nin: false };

//     // filter.$and = [
//     //   {
//     //     role: { $ne: '0' },
//     //   },
//     //   {
//     //     role: { $ne: '2' },
//     //   },
//     // ];
//     /* Getting the users from the database and sending them to the client. */
//     try {
//       // const profileCount = await UserProfile.countDocuments(filter);
//       const users = await UserProfile.find(filter)
//         .skip((page - 1) * limit)
//         .limit(limit);

//       const response = await Promise.all(
//         users.map(async (user) => {
//           const userInfo = await UserInfo.findOne({
//             user_id: user._id,
//           });

//           const targetPromotion = major_code.find(
//             (major) => major.major === user.major
//           )?.promotion;

//           if (user.status === 'incomplete') {
//             return {
//               ID: user.ID,
//               fname: user.fname,
//               lname: user.lname,
//               email: user.email,
//               mobileNumber: user.mobileNumber,
//               major: user.major,
//               promotion: targetPromotion,
//               status: user.status,
//               createdAt: user.createdAt,
//               updatedAt: user.updatedAt,
//             };
//           }

//           return {
//             ID: user.ID,
//             fname: user.fname,
//             lname: user.lname,
//             email: user.email,
//             mobileNumber: user.mobileNumber,
//             major: user.major,
//             promotion: targetPromotion,
//             status: user.status,
//             createdAt: user.createdAt,
//             updatedAt: user.updatedAt,
//             reportURL: userInfo ? userInfo.reportURL : null,
//           };
//         })
//       );

//       const encryptedResponse = encrypt(JSON.stringify(response));
//       // sis_app_logger.info(
//       //   `${new Date()}:${user.role}:lists-students-data:${user.email}:${
//       //     userAgentinfo.os.family
//       //   }:${userAgentinfo.os.major}:${userAgentinfo.family}:${
//       //     userAgentinfo.source
//       //   }:${userAgentinfo.device.family}`
//       // );
//       res.status(200).send({ data: encryptedResponse });
//     } catch (error) {
//       sis_app_logger.error(
//         `${new Date()}=lists students data error=${user.role}=${user.email}=${
//           error.message
//         }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
//           userAgentinfo.family
//         }=${userAgentinfo.source}=${userAgentinfo.device.family}`
//       );
//       res.status(500).send({ message: 'Failed to get users', error });
//     }
//     await db.disconnect();
//   } else {
//     const connection = await connect();
//     if (connection && !connection.success) {
//       return res.status(500).send({ message: connection.message });
//     }
//     /* Setting the default values for the query parameters. */
//     const page = req.query.page || 1;
//     const limit = selection_data.search_limit;
//     // const limit = 20;
//     let startDate;
//     let endDate;

//     /* Creating a filter String that will be used to filter the results of the query. */
//     let filter2 = '';
//     if (req.query.Fname) {
//       if (filter2 === '')
//         filter2 += ` WHERE firstname like '%${req.query.Fname}%'`;
//       else filter2 += ` AND firstname like '%${req.query.Fname}%'`;
//     }

//     if (req.query.Lname) {
//       if (filter2 === '')
//         filter2 += ` WHERE lastname like '%${req.query.Lname}%'`;
//       else filter2 += ` AND lastname like '%${req.query.Lname}%'`;
//     }

//     if (req.query.status) {
//       if (filter2 === '') filter2 += ` WHERE status = '${req.query.status}'`;
//       else filter2 += ` AND status = '${req.query.status}'`;
//     }

//     if (req.query.ID) {
//       if (filter2 === '') filter2 += ` WHERE UserProfileID = '${req.query.ID}'`;
//       else filter2 += ` AND UserProfileID = '${req.query.ID}'`;
//     }

//     if (req.query.major) {
//       const major_id = await findmajor_id(connection, req.query.major);
//       if (filter2 === '') filter2 += ` WHERE major = '${major_id.major_id}'`;
//       else filter2 += ` AND major = '${major_id.major_id}'`;
//     }

//     if (req.query.promotion) {
//       if (filter2 === '')
//         filter2 += ` WHERE promotion = '${req.query.promotion}'`;
//       else filter2 += ` AND promotion = '${req.query.promotion}'`;
//     }

//     /* Filtering the results based on the date range. */
//     if (req.query.from && req.query.to) {
//       startDate = new Date(req.query.from).toISOString().split('T')[0];
//       endDate = new Date(req.query.to).toISOString().split('T')[0];
//       //// console.log(startDate);
//       //// console.log(endDate);
//       if (startDate && endDate) {
//         if (filter2 === '')
//           filter2 += ` WHERE DATE_FORMAT(create_time, '%Y-%m-%d') between '${startDate}' and '${endDate}'`;
//         else
//           filter2 += ` and DATE_FORMAT(create_time, '%Y-%m-%d') between '${startDate}' and '${endDate}'`;
//       }
//     }
//     /* Filtering out the current user from the results. */

//     // console.log('user', user);
//     if (user.role === '2') {
//       const extra_major = await findextramajor(connection, user._id);
//       // console.log('extra', extra_major);
//       const user_major = await findemajor_user(connection, user._id);
//       // // console.log("user_major",user_major)

//       const majorIds = [
//         ...extra_major.map((item) => item.major_id),
//         user_major.major,
//       ].join(',');

//       // console.log('majorIds', majorIds);

//       if (filter2 === '') {
//         filter2 += `WHERE UserProfileID !='${user._id}' AND role !='0' AND role !='2' AND role!='3' AND isVerified !=0  AND major IN (${majorIds})`;
//       } else {
//         filter2 += ` and UserProfileID !='${user._id}' AND role !='0' AND role !='2' AND role!='3' AND isVerified !=0  AND major IN (${majorIds})`;
//       }
//     } else {
//       if (filter2 === '') {
//         filter2 += `WHERE UserProfileID !='${user._id}' AND role !='0' AND role !='2' AND role!='3' AND isVerified !=0`;
//       } else {
//         filter2 += ` and UserProfileID !='${user._id}' AND role !='0' AND role !='2' AND role!='3' AND isVerified !=0`;
//       }
//     }

//     ///filter._id = { $ne: user._id };
//     ///filter.role = { $nin: ['0', '2'] };

//     // filter.$and = [
//     //   {
//     //     role: { $ne: '0' },
//     //   },
//     //   {
//     //     role: { $ne: '2' },
//     //   },
//     // ];
//     /* Getting the users from the database and sending them to the client. */
//     try {
//       // const profileCount = await UserProfile.countDocuments(filter);
//       const data = await FilterData(
//         connection,
//         'userinfo',
//         filter2,
//         limit,
//         (page - 1) * limit
//       );
//       ////// console.log(data);
//       // console.log(filter2);
//       const response = await Promise.all(
//         data.map(async (user) => {
//           if (user.status === 'incomplete') {
//             return {
//               ID: user.UserProfileID,
//               fname: user.firstname,
//               lname: user.lastname,
//               email: user.email,
//               mobileNumber: user.mobile_number,
//               major: user.program,
//               promotion: user.promotion,
//               status: user.status,
//               createdAt: user.create_time,
//               updatedAt: user.update_time,
//             };
//           }

//           return {
//             ID: user.UserProfileID,
//             fname: user.firstname,
//             lname: user.lastname,
//             email: user.email,
//             mobileNumber: user.mobile_number,
//             major: user.program,
//             promotion: user.promotion,
//             status: user.status,
//             createdAt: user.create_time,
//             updatedAt: user.update_time,
//             reportURL: user ? user.reportURL : null,
//           };
//         })
//       );

//       const encryptedResponse = encrypt(JSON.stringify(response));
//       // sis_app_logger.info(
//       //   `${new Date()}:${user.role}:list-user-data:${user.email}:${
//       //     userAgentinfo.os.family
//       //   }:${userAgentinfo.os.major}:${userAgentinfo.family}:${
//       //     userAgentinfo.source
//       //   }:${userAgentinfo.device.family}`
//       // );
//       res.status(200).send({ data: encryptedResponse });
//     } catch (error) {
//       sis_app_logger.error(
//         `${new Date()}=list user data error=${user.role}=${user.email}=${
//           error.message
//         }=${userAgentinfo.os.family}=${userAgentinfo.os.major}=${
//           userAgentinfo.family
//         }=${userAgentinfo.source}=${userAgentinfo.device.family}`
//       );
//       res.status(500).send({ message: 'Failed to get users', error });
//     }
//     await disconnect(connection);
//   }
// }
// export default handler;
