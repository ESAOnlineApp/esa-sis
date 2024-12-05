// /*
//  * Created By: KANSO Adi
//  * Project: SIS Application
//  * File: pages\api\user\generateID.js
//  * École Supérieure des Affaires (ESA)
//  * Copyright (c) 2023 ESA
//  */

// /* Importing the required modules. */
// import decrypt from '../../../utilities/encrypt_decrypt/decryptText';
// import encrypt from '../../../utilities/encrypt_decrypt/encryptText';
// import major_code from '../../../utilities/major_code';
// /**
//  * It takes a major as input and returns a random ID
//  * @param req - The request object.
//  * @param res - The response object.
//  * @returns The ID is being returned.
//  */
// async function handler(req, res) {
//   const major = JSON.parse(decrypt(req.body.data));
//   /* Generating a random number. */
//   const randomFixedInteger = function (length) {
//     return Math.floor(
//       Math.pow(10, length - 1) +
//         Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
//     );
//   };

//   const date = new Date().getFullYear().toString().slice(-2);
//   if (!major) {
//     res.status(422).json({
//       message: 'Provide major',
//     });
//     return;
//   } else {
//     const index = major_code.findIndex(
//       (loopVariable) => loopVariable.major === major
//     );
//     // // console.log(`The index of ${major} is`, index);
//     // // console.log(
//     //   'ID=',
//     //   `${date}${major_code[index].code}${randomFixedInteger(4)}`
//     // );

//     const payload = {
//       message: 'User ID Created!',
//       ID: `${date}${major_code[index].code}${randomFixedInteger(4)}`,
//     };
//     // // console.log('payload=', payload);
//     const response = encrypt(JSON.stringify(payload));

//     res.status(200).json({ data: response });
//     return;
//   }
// }

// export default handler;
