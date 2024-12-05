// /*
//  * Created By: Moetassem Chebbo
//  * Project: SIS Application
//  * File: pages\api\admin\updateListUsers.js
//  * École Supérieure des Affaires (ESA)
//  * Copyright (c) 2023 ESA
//  */

// import db from '../../../../utilities/connectToDb';
// import UserProfile from '../../../../models/user/ProfileModel';

// async function handler(req, res) {
//   if (req.method !== 'PUT') {
//     return res.status(400).send({ message: `${req.method} not supported` });
//   }

//   const { status } = req.body;
//   const { major } = req.body;

//   try {
//     await db.connect();

//     // const toUpdateUserList = await UserProfile.findById(user._id);
//     const ID = req.query.id;

//     const existingUserID = await UserProfile.findOne({ ID });

//     if (!existingUserID) {
//       return res.status(404).send({ message: 'User not found' });
//     }

//     if (status) {
//       existingUserID.status = status;
//       await existingUserID.save();
//       res.status(200).json({
//         message: `Account Status was Changed in the database to:${status}`,
//       });
//     }

//     if (major) {
//       existingUserID.major = major;
//       await existingUserID.save();
//       res.status(200).json({
//         message: `Account major was Changed in the database to:${major}`,
//       });
//     }

//     await db.disconnect();
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Failed to update user', error });
//   }
// }

// export default handler;
