// /*
//  * Created By: Moetassem Chebbo 
//  * Project: SIS Application
//  * File: pages\api\admin\updateListUsers.js
//  * École Supérieure des Affaires (ESA)
//  * Copyright (c) 2023 ESA
//  */

// import db from '../../../utilities/connectToDb'; 
// import UserProfile from '../../../models/user/ProfileModel';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../auth/[...nextauth]';



// async function handler(req, res) {

    
// // const id=req.query.id;
// // if(req.method==='GET'){
// // const data =await UserProfile.findById(id)
// // res.status(200).send(data)


// // }
//     if (req.method !== 'PUT') {
//         return res.status(400).send({ message: `${req.method} not supported` });
//     }
// //   const session = await getServerSession(req, res, authOptions);

// //     if (!session) {
// //     return res.status(401).send({ message: 'Signin Required'});
// //   }


// //      const { user } = session;

// //      if(user.role !== '0'){
// //         return res.status(401).send({ message: 'You are Unauthorized' });
// //     }

//         // const{fname,lname,status,ID,major}=req.body;
//     //     if (!fname || !lname || !status || !ID || !major) {
//     //     return res.status(400).send({ message: 'Missing required fields' });
//     // }
//         try{
//         await db.connect();
     
//         // const toUpdateUserList = await UserProfile.findById(user._id);
//         const id=req.query.listiuserId;

//       const toUpdateUserList = await UserProfile.findByIdAndUpdate(id,req.body,{
//         new:true
//       });
//        if (!toUpdateUserList) {
//             return res.status(404).send({ message: 'User not found' });
//         }
//     //  toUpdateUserList.fname = fname ;
//     //  toUpdateUserList.lname = lname ;
//     //  toUpdateUserList.status = status ;
//     //  toUpdateUserList.ID = ID ;
//     //  toUpdateUserList.major = major ;
     
//     //  toUpdateUserList.save()
      
//         await db.disconnect();
//         res.status(200).json({ message: 'User Successfully Updated',toUpdateUserList:toUpdateUserList });

//         }catch(error){
//            console.error(error);
//             res.status(500).send({message:'Failed to update user',error})
//         }
// }

// export default handler;