// /*
//  * Created By: Moetassem Chebbo/MohammadYassine
//  * Project: SIS Application
//  * File: pages\api\admin\listusers\major.js
//  * École Supérieure des Affaires (ESA)
//  * Copyright (c) 2023 ESA
//  */

// import db from '../../../../utilities/connectToDb';
// import UserProfile from '../../../../models/user/ProfileModel';
// import major_code from '../../../../utilities/major_code';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../../auth/[...nextauth]';
// import decrypt from '../../../../utilities/encrypt_decrypt/decryptText';
// import { connect, disconnect } from '../../../../utilities/db';
// import selection_data from '../../../../utilities/selection_data';
// import {
//   findmajor_id,
//   UpdateData,
//   DeletefromDropdown,
//   current_applicant_promotion,
//   findData,
//   ReadData,
//   UpdateSource,
//   InsertDataByID,
//   NewUser,
//   findmajor_name,
// } from '../../controller/queries';
// import xss from 'xss-filters';
// import sis_app_logger from '../../../api/logger';
// import useragent from 'useragent';
// // import { Update } from '@mui/icons-material';
// async function generateID(major) {
//   /* Generating a random number. */
//   const randomFixedInteger = function (length) {
//     return Math.floor(
//       Math.pow(10, length - 1) +
//         Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
//     );
//   };

//   const date = new Date().getFullYear().toString().slice(-2);
//   if (!major) {
//     throw new Error('Provide major');
//   } else {
//     const index = major_code.findIndex(
//       (loopVariable) => loopVariable.major === major
//     );
//     const ID = `${date}${major_code[index].code}${randomFixedInteger(4)}`;

//     return ID;
//   }
// }

// async function handler(req, res) {
//   if (req.method !== 'PUT') {
//     return res.status(400).send({ message: `${req.method} not supported` });
//   }

//   const session = await getServerSession(req, res, authOptions);
//   const defaultpassword = 'Mido123@';
//   if (!session) {
//     return res.status(401).send({ message: 'Signin Required To Update' });
//   }

//   const { user } = session;

//   if (user.role !== '0') {
//     return res.status(401).send({ message: 'You are Unauthorized' });
//   }
//   const userAgent = req.headers['user-agent'];
//   const userAgentinfo = useragent.parse(userAgent);

//   const incomingData = JSON.parse(decrypt(req.body.data));
//   const ID = xss.inHTMLData(incomingData.ID);
//   const major = xss.inHTMLData(incomingData.major);

//   if (!ID) {
//     res.status(422).json({
//       message: 'ID Empty!!',
//     });
//     return;
//   }

//   if (!major) {
//     res.status(422).json({
//       message: 'major Empty!!',
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
//       const targetPromotion = major_code.find(
//         (major) => major.major === user.major
//       ).promotion;

//       existingUserID.major = major;
//       existingUserID.status = 'incomplete';
//       existingUserID.promotion = targetPromotion;
//       sis_app_logger.info(
//         `${new Date()}=${user.role}=change student major=${user.email}=${
//           userAgentinfo.os.family
//         }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
//           userAgentinfo.source
//         }=${userAgentinfo.device.family}`
//       );
//       res.status(200).json({
//         message: `Account major was Changed in the database to:${major}`,
//         promotion: targetPromotion,
//       });

//       // await existingUserID.save();
//       await db.disconnect();
//     } catch (error) {
//       sis_app_logger.error(
//         `${new Date()}=change student major error=${user.role}=${user.email}=${
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

//       const major_id = await findmajor_id(connection, major);
//       //collecting old data
//       const userprofile = await ReadData(connection, 'user_profile', ID);
//       // console.log(userprofile);
//       const user_personal_info = await ReadData(
//         connection,
//         'user_personal_info',
//         ID
//       );
//       // console.log(user_personal_info);
//       const user_address_info = await ReadData(
//         connection,
//         'user_address_info',
//         ID
//       );
//       // console.log(user_address_info);
//       const user_contact_info = await ReadData(
//         connection,
//         'user_contact_info',
//         ID
//       );
//       // console.log(user_contact_info);
//       const user_education_info = await ReadData(
//         connection,
//         'user_education_info',
//         ID
//       );
//       // console.log(user_education_info);
//       const user_source = await ReadData(connection, 'user_source', ID);
//       // console.log(user_source);
//       const emergency_contact_info = await ReadData(
//         connection,
//         'emergency_contact_info',
//         ID
//       );
//       // console.log(emergency_contact_info);
//       const user_languages_sat = await ReadData(
//         connection,
//         'user_languages_sat',
//         ID
//       );
//       // console.log(user_languages_sat);
//       const user_past_experience = await ReadData(
//         connection,
//         'user_past_experience',
//         ID
//       );
//       //// console.log(user_past_experience)
//       // eslint-disable-next-line no-unused-vars
//       const user_study_grade = await ReadData(
//         connection,
//         'user_study_grade',
//         ID
//       );
//       // console.log();
//       const user_company_experience = await ReadData(
//         connection,
//         'user_company_experience',
//         ID
//       );
//       const user_payment = await ReadData(connection, 'user_payment', ID);
//       const user_questions = await ReadData(connection, 'user_questions', ID);
//       const user_doc = await ReadData(connection, 'user_document', ID);
//       //New generated ID
//       const NewID = await generateID(major);
//       const Oldmajorame = await findmajor_name(connection, ID);
//       //for info only
//       // console.log('thats the old major.....', userprofile.major);
//       // console.log('thats the old major name.....', Oldmajorame);
//       // console.log('thats the new major.....', major_id.major_id);
//       // console.log('thats the old ID.....', ID);
//       // console.log('thats the New ID.....', NewID);

//       if (!user_doc.reportURL == '') {
//         // console.log('Adding old report URL');
//         await InsertDataByID(connection, ['old_report'], ID);
//         // console.log(
//           await UpdateData(
//             connection,
//             'old_report',
//             ID,
//             ['old_report', user_doc.reportURL],
//             ['current_id', NewID]
//           )
//         );
//       }

//       //Deleting the old id after copying all the data
//       const deleteOldID = await DeletefromDropdown(
//         'user_profile',
//         'user_id',
//         ID,
//         connection
//       );
//       // console.log(deleteOldID);
//       //Changing major BBA conditions
//       if (
//         userprofile.major == 10 &&
//         (major_id.major_id == 11 ||
//           major_id.major_id == 14 ||
//           major_id.major_id == 16 ||
//           major_id.major_id == 17 ||
//           major_id.major_id == 18 ||
//           major_id.major_id == 19 ||
//           major_id.major_id == 20)
//       ) {
//         // console.log('I am changing from BBA TO OTHERS');
//         //// console.log(user_past_experience);
//         //// console.log(user_payment);
//         //Creating a new ID for old user
//         // eslint-disable-next-line no-unused-vars
//         const NewUserProfile = await NewUser(
//           connection,
//           NewID,
//           userprofile.email,
//           'Mido123@',
//           major_id.major_id,
//           user_personal_info.firstname,
//           user_personal_info.lastname,
//           user_contact_info.mobile_number,
//           userprofile.application_Language
//         );
//         //reassigning old data to the new ID
//         const UpdateProfile = await UpdateData(
//           connection,
//           'user_profile',
//           NewID,
//           ['isVerified', '1'],
//           ['emailToken', null],
//           ['appisSaved', '1'],
//           ['create_time', userprofile.create_time],
//           ['isreset', userprofile.isreset]
//         );
//         // console.log(UpdateProfile);
//         const UpdatePersonal = await UpdateData(
//           connection,
//           'user_personal_info',
//           NewID,
//           ['title', user_personal_info.title],
//           ['fathername', user_personal_info.fathername],
//           ['maidename', user_personal_info.maidename],
//           ['mothername', user_personal_info.mothername],
//           ['gender', user_personal_info.gender],
//           ['dateofbirth', user_personal_info.dateofbirth],
//           ['countryofbirth', user_personal_info.countryofbirth],
//           ['placeofbirth', user_personal_info.placeofbirth],
//           ['registrationnumber', user_personal_info.registrationnumber],
//           ['maritalstatus', user_personal_info.maritalstatus],
//           ['firstnationality', user_personal_info.firstnationality],
//           ['secondnationality', user_personal_info.secondnationality]
//         );
//         // console.log(UpdatePersonal);
//         const UpdateLanguage = await UpdateData(
//           connection,
//           'user_languages_sat',
//           NewID,
//           ['french_proficiency', user_languages_sat.french_proficiency],
//           ['english_proficiency', user_languages_sat.english_proficiency],
//           ['arabic_proficiency', user_languages_sat.arabic_proficiency],
//           ['other_language', user_languages_sat.other_language],
//           [
//             'other_language_proficiency',
//             user_languages_sat.other_language_proficiency,
//           ]
//         );

//         // console.log(UpdateLanguage);
//         const UpdateContact = await UpdateData(
//           connection,
//           'user_contact_info',
//           NewID,
//           ['email_two', user_contact_info.email_two],
//           ['landline_number', user_contact_info.landline_number]
//         );
//         // console.log(UpdateContact);
//         const otherSource = user_source.otherSource ?? '';
//         const UpdatSource = await UpdateSource(
//           connection,
//           user_source.source,
//           otherSource,
//           NewID
//         );
//         // console.log('here are the sources', user_source.source);
//         // console.log(UpdatSource);
//         const UpdateEmergency = await UpdateData(
//           connection,
//           'emergency_contact_info',
//           NewID,
//           ['prefix', emergency_contact_info.prefix],
//           ['firstname', emergency_contact_info.firstname],
//           ['middlename', emergency_contact_info.middlename],
//           ['lastname', emergency_contact_info.lastname],
//           ['relationship', emergency_contact_info.relationship],
//           ['phonenumber', emergency_contact_info.phonenumber],
//           ['medicalhealth', emergency_contact_info.medicalhealth],
//           ['diseasetype', emergency_contact_info.diseasetype]
//         );
//         // console.log(UpdateEmergency);
//         const UpdateAddress = await UpdateData(
//           connection,
//           'user_address_info',
//           NewID,
//           ['country', user_address_info.country],
//           ['region', user_address_info.region],
//           ['city', user_address_info.city],
//           ['street', user_address_info.street],
//           ['building', user_address_info.building],
//           ['floor', user_address_info.floor],
//           ['postal', user_address_info.postal]
//         );
//         // console.log(UpdateAddress);
//         const UpdateDocument = await UpdateData(
//           connection,
//           'user_document',
//           NewID,
//           ['docPassportUrl', user_doc.docPassportUrl],
//           ['docCvUrl', user_doc.docCvUrl],
//           ['profileUrl', user_doc.profileUrl],
//           ['docRecommandationLetterUrl', user_doc.docRecommandationLetterUrl],
//           ['docProofOfM1Url', user_doc.docProofOfM1Url],
//           ['docBACCertificateUrl', user_doc.docBACCertificateUrl],
//           ['docTranscriptUrl', user_doc.docTranscriptUrl],
//           ['docResearchUrl', user_doc.docResearchUrl]
//         );
//         // console.log(UpdateDocument);
//         const UpdateEducation = await UpdateData(
//           connection,
//           'user_education_info',
//           NewID,
//           ['degree_level', user_education_info.degree_level],
//           ['degreelevel_bba', user_education_info.degreelevel_bba],
//           ['field_study', user_education_info.field_study],
//           ['series', user_education_info.series],
//           ['obtain_date', user_education_info.obtain_date],
//           ['establishment', user_education_info.establishment],
//           ['other_establishment', user_education_info.other_establishment],
//           ['university', user_education_info.university],
//           ['degree_title', user_education_info.degree_title],
//           ['Other_field_study', user_education_info.Other_field_study]
//         );
//         // console.log(UpdateEducation);
//       } else if (
//         (userprofile.major == 11 ||
//           userprofile.major == 14 ||
//           userprofile.major == 16 ||
//           userprofile.major == 17 ||
//           userprofile.major == 18 ||
//           userprofile.major == 19 ||
//           userprofile.major == 20) &&
//         major_id.major_id == 10
//       ) {
//         //Creating a new ID for old user
//         const NewUserProfile = await NewUser(
//           connection,
//           NewID,
//           userprofile.email,
//           'Mido123@',
//           major_id.major_id,
//           user_personal_info.firstname,
//           user_personal_info.lastname,
//           user_contact_info.mobile_number,
//           userprofile.application_Language
//         );
//         // console.log(NewUserProfile);
//         //reassigning old data to the new ID
//         const UpdateProfile = await UpdateData(
//           connection,
//           'user_profile',
//           NewID,
//           ['isVerified', '1'],
//           ['emailToken', null],
//           ['appisSaved', '1'],
//           ['create_time', userprofile.create_time],
//           ['isreset', userprofile.isreset]
//         );
//         // console.log(UpdateProfile);
//         const UpdatePersonal = await UpdateData(
//           connection,
//           'user_personal_info',
//           NewID,
//           ['title', user_personal_info.title],
//           ['fathername', user_personal_info.fathername],
//           ['maidename', user_personal_info.maidename],
//           ['mothername', user_personal_info.mothername],
//           ['gender', user_personal_info.gender],
//           ['dateofbirth', user_personal_info.dateofbirth],
//           ['countryofbirth', user_personal_info.countryofbirth],
//           ['placeofbirth', user_personal_info.placeofbirth],
//           ['registrationnumber', user_personal_info.registrationnumber],
//           ['maritalstatus', user_personal_info.maritalstatus],
//           ['firstnationality', user_personal_info.firstnationality],
//           ['secondnationality', user_personal_info.secondnationality]
//         );
//         // console.log(UpdatePersonal);
//         const UpdateLanguage = await UpdateData(
//           connection,
//           'user_languages_sat',
//           NewID,
//           ['french_proficiency', user_languages_sat.french_proficiency],
//           ['english_proficiency', user_languages_sat.english_proficiency],
//           ['arabic_proficiency', user_languages_sat.arabic_proficiency],
//           ['other_language', user_languages_sat.other_language],
//           [
//             'other_language_proficiency',
//             user_languages_sat.other_language_proficiency,
//           ]
//         );

//         // console.log(UpdateLanguage);
//         const UpdateContact = await UpdateData(
//           connection,
//           'user_contact_info',
//           NewID,
//           ['email_two', user_contact_info.email_two],
//           ['landline_number', user_contact_info.landline_number]
//         );
//         // console.log(UpdateContact);
//         const otherSource = user_source.otherSource ?? '';
//         const UpdatSource = await UpdateSource(
//           connection,
//           user_source.source,
//           otherSource,
//           NewID
//         );

//         // console.log(UpdatSource);
//         const UpdateEmergency = await UpdateData(
//           connection,
//           'emergency_contact_info',
//           NewID,
//           ['prefix', emergency_contact_info.prefix],
//           ['firstname', emergency_contact_info.firstname],
//           ['middlename', emergency_contact_info.middlename],
//           ['lastname', emergency_contact_info.lastname],
//           ['relationship', emergency_contact_info.relationship],
//           ['phonenumber', emergency_contact_info.phonenumber],
//           ['medicalhealth', emergency_contact_info.medicalhealth],
//           ['diseasetype', emergency_contact_info.diseasetype]
//         );
//         // console.log(UpdateEmergency);
//         const UpdateAddress = await UpdateData(
//           connection,
//           'user_address_info',
//           NewID,
//           ['country', user_address_info.country],
//           ['region', user_address_info.region],
//           ['city', user_address_info.city],
//           ['street', user_address_info.street],
//           ['building', user_address_info.building],
//           ['floor', user_address_info.floor],
//           ['postal', user_address_info.postal]
//         );
//         // console.log(UpdateAddress);
//         const UpdateDocument = await UpdateData(
//           connection,
//           'user_document',
//           NewID,
//           ['docPassportUrl', user_doc.docPassportUrl],
//           ['docCvUrl', user_doc.docCvUrl],
//           ['profileUrl', user_doc.profileUrl],
//           ['docRecommandationLetterUrl', user_doc.docRecommandationLetterUrl],
//           ['docProofOfM1Url', user_doc.docProofOfM1Url],
//           ['docBACCertificateUrl', user_doc.docBACCertificateUrl],
//           ['docTranscriptUrl', user_doc.docTranscriptUrl],
//           ['docResearchUrl', user_doc.docResearchUrl]
//         );
//         // console.log(UpdateDocument);
//         const UpdateEducation = await UpdateData(
//           connection,
//           'user_education_info',
//           NewID,
//           ['degree_level', user_education_info.degree_level],
//           ['degreelevel_bba', user_education_info.degreelevel_bba],
//           ['field_study', user_education_info.field_study],
//           ['series', user_education_info.series],
//           ['obtain_date', user_education_info.obtain_date],
//           ['establishment', user_education_info.establishment],
//           ['other_establishment', user_education_info.other_establishment],
//           ['university', user_education_info.university],
//           ['degree_title', user_education_info.degree_title],
//           ['Other_field_study', user_education_info.Other_field_study]
//         );
//         // console.log(UpdateEducation);
//       } else if (
//         (userprofile.major == 13 || userprofile.major == 15) &&
//         major_id.major_id == 10
//       ) {
//         //Creating a new ID for old user
//         const NewUserProfile = await NewUser(
//           connection,
//           NewID,
//           userprofile.email,
//           'Mido123@',
//           major_id.major_id,
//           user_personal_info.firstname,
//           user_personal_info.lastname,
//           user_contact_info.mobile_number,
//           userprofile.application_Language
//         );
//         // console.log(NewUserProfile);
//         //reassigning old data to the new ID
//         const UpdateProfile = await UpdateData(
//           connection,
//           'user_profile',
//           NewID,
//           ['isVerified', '1'],
//           ['emailToken', null],
//           ['appisSaved', '1'],
//           ['create_time', userprofile.create_time],
//           ['isreset', userprofile.isreset]
//         );
//         // console.log(UpdateProfile);
//         const UpdatePersonal = await UpdateData(
//           connection,
//           'user_personal_info',
//           NewID,
//           ['title', user_personal_info.title],
//           ['fathername', user_personal_info.fathername],
//           ['maidename', user_personal_info.maidename],
//           ['mothername', user_personal_info.mothername],
//           ['gender', user_personal_info.gender],
//           ['dateofbirth', user_personal_info.dateofbirth],
//           ['countryofbirth', user_personal_info.countryofbirth],
//           ['placeofbirth', user_personal_info.placeofbirth],
//           ['registrationnumber', user_personal_info.registrationnumber],
//           ['maritalstatus', user_personal_info.maritalstatus],
//           ['firstnationality', user_personal_info.firstnationality],
//           ['secondnationality', user_personal_info.secondnationality]
//         );
//         // console.log(UpdatePersonal);
//         const UpdateLanguage = await UpdateData(
//           connection,
//           'user_languages_sat',
//           NewID,
//           ['french_proficiency', user_languages_sat.french_proficiency],
//           ['english_proficiency', user_languages_sat.english_proficiency],
//           ['arabic_proficiency', user_languages_sat.arabic_proficiency],
//           ['other_language', user_languages_sat.other_language],
//           [
//             'other_language_proficiency',
//             user_languages_sat.other_language_proficiency,
//           ]
//         );
//         // console.log(UpdateLanguage);

//         const UpdateContact = await UpdateData(
//           connection,
//           'user_contact_info',
//           NewID,
//           ['email_two', user_contact_info.email_two],
//           ['landline_number', user_contact_info.landline_number]
//         );
//         // console.log(UpdateContact);
//         const otherSource = user_source.otherSource ?? '';
//         const UpdatSource = await UpdateSource(
//           connection,
//           user_source.source,
//           otherSource,
//           NewID
//         );

//         // console.log(UpdatSource);

//         const UpdateEmergency = await UpdateData(
//           connection,
//           'emergency_contact_info',
//           NewID,
//           ['prefix', emergency_contact_info.prefix],
//           ['firstname', emergency_contact_info.firstname],
//           ['middlename', emergency_contact_info.middlename],
//           ['lastname', emergency_contact_info.lastname],
//           ['relationship', emergency_contact_info.relationship],
//           ['phonenumber', emergency_contact_info.phonenumber],
//           ['medicalhealth', emergency_contact_info.medicalhealth],
//           ['diseasetype', emergency_contact_info.diseasetype]
//         );
//         // console.log(UpdateEmergency);
//         const UpdateAddress = await UpdateData(
//           connection,
//           'user_address_info',
//           NewID,
//           ['country', user_address_info.country],
//           ['region', user_address_info.region],
//           ['city', user_address_info.city],
//           ['street', user_address_info.street],
//           ['building', user_address_info.building],
//           ['floor', user_address_info.floor],
//           ['postal', user_address_info.postal]
//         );
//         // console.log(UpdateAddress);
//         const UpdateDocument = await UpdateData(
//           connection,
//           'user_document',
//           NewID,
//           ['docPassportUrl', user_doc.docPassportUrl],
//           ['docCvUrl', user_doc.docCvUrl],
//           ['profileUrl', user_doc.profileUrl],
//           ['docRecommandationLetterUrl', user_doc.docRecommandationLetterUrl],
//           ['docProofOfM1Url', user_doc.docProofOfM1Url],
//           ['docBACCertificateUrl', user_doc.docBACCertificateUrl],
//           ['docTranscriptUrl', user_doc.docTranscriptUrl],
//           ['docResearchUrl', user_doc.docResearchUrl]
//         );
//         // console.log(UpdateDocument);
//         const UpdateEducation = await UpdateData(
//           connection,
//           'user_education_info',
//           NewID,
//           ['degree_level', user_education_info.degree_level],
//           ['degreelevel_bba', user_education_info.degreelevel_bba],
//           ['field_study', user_education_info.field_study],
//           ['series', user_education_info.series],
//           ['obtain_date', user_education_info.obtain_date],
//           ['establishment', user_education_info.establishment],
//           ['other_establishment', user_education_info.other_establishment],
//           ['university', user_education_info.university],
//           ['degree_title', user_education_info.degree_title],
//           ['Other_field_study', user_education_info.Other_field_study]
//         );
//         // console.log(UpdateEducation);
//       } else if (
//         (userprofile.major == 10 && major_id.major_id == 13) ||
//         major_id.major_id == 15
//       ) {
//         //Creating a new ID for old user
//         const NewUserProfile = await NewUser(
//           connection,
//           NewID,
//           userprofile.email,
//           'Mido123@',
//           major_id.major_id,
//           user_personal_info.firstname,
//           user_personal_info.lastname,
//           user_contact_info.mobile_number,
//           userprofile.application_Language
//         );
//         // console.log(NewUserProfile);
//         //reassigning old data to the new ID
//         const UpdateProfile = await UpdateData(
//           connection,
//           'user_profile',
//           NewID,
//           ['isVerified', '1'],
//           ['emailToken', null],
//           ['appisSaved', '1'],
//           ['create_time', userprofile.create_time],
//           ['isreset', userprofile.isreset]
//         );
//         // console.log(UpdateProfile);
//         const UpdatePersonal = await UpdateData(
//           connection,
//           'user_personal_info',
//           NewID,
//           ['title', user_personal_info.title],
//           ['fathername', user_personal_info.fathername],
//           ['maidename', user_personal_info.maidename],
//           ['mothername', user_personal_info.mothername],
//           ['gender', user_personal_info.gender],
//           ['dateofbirth', user_personal_info.dateofbirth],
//           ['countryofbirth', user_personal_info.countryofbirth],
//           ['placeofbirth', user_personal_info.placeofbirth],
//           ['registrationnumber', user_personal_info.registrationnumber],
//           ['maritalstatus', user_personal_info.maritalstatus],
//           ['firstnationality', user_personal_info.firstnationality],
//           ['secondnationality', user_personal_info.secondnationality]
//         );
//         // console.log(UpdatePersonal);
//         const UpdateLanguage = await UpdateData(
//           connection,
//           'user_languages_sat',
//           NewID,
//           ['french_proficiency', user_languages_sat.french_proficiency],
//           ['english_proficiency', user_languages_sat.english_proficiency],
//           ['arabic_proficiency', user_languages_sat.arabic_proficiency],
//           ['other_language', user_languages_sat.other_language],
//           [
//             'other_language_proficiency',
//             user_languages_sat.other_language_proficiency,
//           ]
//         );
//         // console.log(UpdateLanguage);

//         const UpdateContact = await UpdateData(
//           connection,
//           'user_contact_info',
//           NewID,
//           ['email_two', user_contact_info.email_two],
//           ['landline_number', user_contact_info.landline_number]
//         );
//         // console.log(UpdateContact);
//         const otherSource = user_source.otherSource ?? '';
//         const UpdatSource = await UpdateSource(
//           connection,
//           user_source.source,
//           otherSource,
//           NewID
//         );

//         // console.log(UpdatSource);

//         const UpdateEmergency = await UpdateData(
//           connection,
//           'emergency_contact_info',
//           NewID,
//           ['prefix', emergency_contact_info.prefix],
//           ['firstname', emergency_contact_info.firstname],
//           ['middlename', emergency_contact_info.middlename],
//           ['lastname', emergency_contact_info.lastname],
//           ['relationship', emergency_contact_info.relationship],
//           ['phonenumber', emergency_contact_info.phonenumber],
//           ['medicalhealth', emergency_contact_info.medicalhealth],
//           ['diseasetype', emergency_contact_info.diseasetype]
//         );
//         // console.log(UpdateEmergency);
//         const UpdateAddress = await UpdateData(
//           connection,
//           'user_address_info',
//           NewID,
//           ['country', user_address_info.country],
//           ['region', user_address_info.region],
//           ['city', user_address_info.city],
//           ['street', user_address_info.street],
//           ['building', user_address_info.building],
//           ['floor', user_address_info.floor],
//           ['postal', user_address_info.postal]
//         );
//         // console.log(UpdateAddress);
//         const UpdateDocument = await UpdateData(
//           connection,
//           'user_document',
//           NewID,
//           ['docPassportUrl', user_doc.docPassportUrl],
//           ['docCvUrl', user_doc.docCvUrl],
//           ['profileUrl', user_doc.profileUrl],
//           ['docRecommandationLetterUrl', user_doc.docRecommandationLetterUrl],
//           ['docProofOfM1Url', user_doc.docProofOfM1Url],
//           ['docBACCertificateUrl', user_doc.docBACCertificateUrl],
//           ['docTranscriptUrl', user_doc.docTranscriptUrl],
//           ['docResearchUrl', user_doc.docResearchUrl]
//         );
//         // console.log(UpdateDocument);
//         const UpdateEducation = await UpdateData(
//           connection,
//           'user_education_info',
//           NewID,
//           ['degree_level', user_education_info.degree_level],
//           ['degreelevel_bba', user_education_info.degreelevel_bba],
//           ['field_study', user_education_info.field_study],
//           ['series', user_education_info.series],
//           ['obtain_date', user_education_info.obtain_date],
//           ['establishment', user_education_info.establishment],
//           ['other_establishment', user_education_info.other_establishment],
//           ['university', user_education_info.university],
//           ['degree_title', user_education_info.degree_title],
//           ['Other_field_study', user_education_info.Other_field_study]
//         );
//         // console.log(UpdateEducation);
//       } else if (
//         (userprofile.major == 11 ||
//           userprofile.major == 14 ||
//           userprofile.major == 16 ||
//           userprofile.major == 17 ||
//           userprofile.major == 18 ||
//           userprofile.major == 19 ||
//           userprofile.major == 20) &&
//         (major_id.major_id == 13 || major_id.major_id == 15)
//       ) {
//         //Creating a new ID for old user
//         const NewUserProfile = await NewUser(
//           connection,
//           NewID,
//           userprofile.email,
//           'Mido123@',
//           major_id.major_id,
//           user_personal_info.firstname,
//           user_personal_info.lastname,
//           user_contact_info.mobile_number,
//           userprofile.application_Language
//         );
//         //reassigning old data to the new ID
//         // console.log(NewUserProfile);
//         const UpdateProfile = await UpdateData(
//           connection,
//           'user_profile',
//           NewID,
//           ['isVerified', '1'],
//           ['emailToken', null],
//           ['appisSaved', '1'],
//           ['create_time', userprofile.create_time],
//           ['isreset', userprofile.isreset]
//         );
//         // console.log(UpdateProfile);
//         const UpdatePersonal = await UpdateData(
//           connection,
//           'user_personal_info',
//           NewID,
//           ['title', user_personal_info.title],
//           ['fathername', user_personal_info.fathername],
//           ['maidename', user_personal_info.maidename],
//           ['mothername', user_personal_info.mothername],
//           ['gender', user_personal_info.gender],
//           ['dateofbirth', user_personal_info.dateofbirth],
//           ['countryofbirth', user_personal_info.countryofbirth],
//           ['placeofbirth', user_personal_info.placeofbirth],
//           ['registrationnumber', user_personal_info.registrationnumber],
//           ['maritalstatus', user_personal_info.maritalstatus],
//           ['firstnationality', user_personal_info.firstnationality],
//           ['secondnationality', user_personal_info.secondnationality]
//         );
//         // console.log(UpdatePersonal);
//         const UpdateLanguage = await UpdateData(
//           connection,
//           'user_languages_sat',
//           NewID,
//           ['french_proficiency', user_languages_sat.french_proficiency],
//           ['english_proficiency', user_languages_sat.english_proficiency],
//           ['arabic_proficiency', user_languages_sat.arabic_proficiency],
//           ['other_language', user_languages_sat.other_language],
//           [
//             'other_language_proficiency',
//             user_languages_sat.other_language_proficiency,
//           ]
//         );

//         // console.log(UpdateLanguage);
//         const UpdateContact = await UpdateData(
//           connection,
//           'user_contact_info',
//           NewID,
//           ['email_two', user_contact_info.email_two],
//           ['landline_number', user_contact_info.landline_number]
//         );
//         // console.log(UpdateContact);
//         const otherSource = user_source.otherSource ?? '';
//         const UpdatSource = await UpdateSource(
//           connection,
//           user_source.source,
//           otherSource,
//           NewID
//         );

//         // console.log(UpdatSource);

//         const UpdatePayment = await UpdateData(
//           connection,
//           'user_payment',
//           NewID,
//           ['payment_type', user_payment.payment_type],
//           ['otherpayment', user_payment.otherpayment]
//         );
//         // console.log(UpdatePayment);
//         const UpdateEmergency = await UpdateData(
//           connection,
//           'emergency_contact_info',
//           NewID,
//           ['prefix', emergency_contact_info.prefix],
//           ['firstname', emergency_contact_info.firstname],
//           ['middlename', emergency_contact_info.middlename],
//           ['lastname', emergency_contact_info.lastname],
//           ['relationship', emergency_contact_info.relationship],
//           ['phonenumber', emergency_contact_info.phonenumber],
//           ['medicalhealth', emergency_contact_info.medicalhealth],
//           ['diseasetype', emergency_contact_info.diseasetype]
//         );
//         // console.log(UpdateEmergency);
//         const UpdateAddress = await UpdateData(
//           connection,
//           'user_address_info',
//           NewID,
//           ['country', user_address_info.country],
//           ['region', user_address_info.region],
//           ['city', user_address_info.city],
//           ['street', user_address_info.street],
//           ['building', user_address_info.building],
//           ['floor', user_address_info.floor],
//           ['postal', user_address_info.postal]
//         );
//         // console.log(UpdateAddress);
//         const UpdateDocument = await UpdateData(
//           connection,
//           'user_document',
//           NewID,
//           ['docPassportUrl', user_doc.docPassportUrl],
//           ['docCvUrl', user_doc.docCvUrl],
//           ['profileUrl', user_doc.profileUrl],
//           ['docRecommandationLetterUrl', user_doc.docRecommandationLetterUrl],
//           ['docProofOfM1Url', user_doc.docProofOfM1Url],
//           ['docBACCertificateUrl', user_doc.docBACCertificateUrl],
//           ['docTranscriptUrl', user_doc.docTranscriptUrl],
//           ['docResearchUrl', user_doc.docResearchUrl]
//         );
//         // console.log(UpdateDocument);
//         const UpdateEducation = await UpdateData(
//           connection,
//           'user_education_info',
//           NewID,
//           ['degree_level', user_education_info.degree_level],
//           ['degreelevel_bba', user_education_info.degreelevel_bba],
//           ['field_study', user_education_info.field_study],
//           ['series', user_education_info.series],
//           ['obtain_date', user_education_info.obtain_date],
//           ['establishment', user_education_info.establishment],
//           ['other_establishment', user_education_info.other_establishment],
//           ['university', user_education_info.university],
//           ['degree_title', user_education_info.degree_title],
//           ['Other_field_study', user_education_info.Other_field_study]
//         );
//         // console.log(UpdateEducation);
//       } else if (
//         (userprofile.major == 13 || userprofile.major == 15) &&
//         (major_id.major_id == 11 ||
//           major_id.major_id == 14 ||
//           major_id.major_id == 16 ||
//           major_id.major_id == 17 ||
//           major_id.major_id == 18 ||
//           major_id.major_id == 19 ||
//           major_id.major_id == 20)
//       ) {
//         //Creating a new ID for old user
//         const NewUserProfile = await NewUser(
//           connection,
//           NewID,
//           userprofile.email,
//           'Mido123@',
//           major_id.major_id,
//           user_personal_info.firstname,
//           user_personal_info.lastname,
//           user_contact_info.mobile_number,
//           userprofile.application_Language
//         );
//         // console.log(NewUserProfile);
//         //reassigning old data to the new ID
//         const UpdateProfile = await UpdateData(
//           connection,
//           'user_profile',
//           NewID,
//           ['isVerified', '1'],
//           ['emailToken', null],
//           ['appisSaved', '1'],
//           ['create_time', userprofile.create_time],
//           ['isreset', userprofile.isreset]
//         );
//         // console.log(UpdateProfile);
//         const UpdatePersonal = await UpdateData(
//           connection,
//           'user_personal_info',
//           NewID,
//           ['title', user_personal_info.title],
//           ['fathername', user_personal_info.fathername],
//           ['maidename', user_personal_info.maidename],
//           ['mothername', user_personal_info.mothername],
//           ['gender', user_personal_info.gender],
//           ['dateofbirth', user_personal_info.dateofbirth],
//           ['countryofbirth', user_personal_info.countryofbirth],
//           ['placeofbirth', user_personal_info.placeofbirth],
//           ['registrationnumber', user_personal_info.registrationnumber],
//           ['maritalstatus', user_personal_info.maritalstatus],
//           ['firstnationality', user_personal_info.firstnationality],
//           ['secondnationality', user_personal_info.secondnationality]
//         );
//         // console.log(UpdatePersonal);
//         const UpdateLanguage = await UpdateData(
//           connection,
//           'user_languages_sat',
//           NewID,
//           ['french_proficiency', user_languages_sat.french_proficiency],
//           ['english_proficiency', user_languages_sat.english_proficiency],
//           ['arabic_proficiency', user_languages_sat.arabic_proficiency],
//           ['other_language', user_languages_sat.other_language],
//           [
//             'other_language_proficiency',
//             user_languages_sat.other_language_proficiency,
//           ]
//         );
//         // console.log(UpdateLanguage);

//         const UpdateContact = await UpdateData(
//           connection,
//           'user_contact_info',
//           NewID,
//           ['email_two', user_contact_info.email_two],
//           ['landline_number', user_contact_info.landline_number]
//         );
//         // console.log(UpdateContact);
//         const otherSource = user_source.otherSource ?? '';
//         const UpdatSource = await UpdateSource(
//           connection,
//           user_source.source,
//           otherSource,
//           NewID
//         );

//         // console.log(UpdatSource);

//         const UpdatePayment = await UpdateData(
//           connection,
//           'user_payment',
//           NewID,
//           ['payment_type', user_payment.payment_type],
//           ['otherpayment', user_payment.otherpayment]
//         );
//         // console.log(UpdatePayment);
//         const UpdateEmergency = await UpdateData(
//           connection,
//           'emergency_contact_info',
//           NewID,
//           ['prefix', emergency_contact_info.prefix],
//           ['firstname', emergency_contact_info.firstname],
//           ['middlename', emergency_contact_info.middlename],
//           ['lastname', emergency_contact_info.lastname],
//           ['relationship', emergency_contact_info.relationship],
//           ['phonenumber', emergency_contact_info.phonenumber],
//           ['medicalhealth', emergency_contact_info.medicalhealth],
//           ['diseasetype', emergency_contact_info.diseasetype]
//         );
//         // console.log(UpdateEmergency);
//         const UpdateAddress = await UpdateData(
//           connection,
//           'user_address_info',
//           NewID,
//           ['country', user_address_info.country],
//           ['region', user_address_info.region],
//           ['city', user_address_info.city],
//           ['street', user_address_info.street],
//           ['building', user_address_info.building],
//           ['floor', user_address_info.floor],
//           ['postal', user_address_info.postal]
//         );
//         // console.log(UpdateAddress);
//         const UpdateDocument = await UpdateData(
//           connection,
//           'user_document',
//           NewID,
//           ['docPassportUrl', user_doc.docPassportUrl],
//           ['docCvUrl', user_doc.docCvUrl],
//           ['profileUrl', user_doc.profileUrl],
//           ['docRecommandationLetterUrl', user_doc.docRecommandationLetterUrl],
//           ['docProofOfM1Url', user_doc.docProofOfM1Url],
//           ['docBACCertificateUrl', user_doc.docBACCertificateUrl],
//           ['docTranscriptUrl', user_doc.docTranscriptUrl],
//           ['docResearchUrl', user_doc.docResearchUrl]
//         );
//         // console.log(UpdateDocument);
//         const UpdateEducation = await UpdateData(
//           connection,
//           'user_education_info',
//           NewID,
//           ['degree_level', user_education_info.degree_level],
//           ['degreelevel_bba', user_education_info.degreelevel_bba],
//           ['field_study', user_education_info.field_study],
//           ['series', user_education_info.series],
//           ['obtain_date', user_education_info.obtain_date],
//           ['establishment', user_education_info.establishment],
//           ['other_establishment', user_education_info.other_establishment],
//           ['university', user_education_info.university],
//           ['degree_title', user_education_info.degree_title],
//           ['Other_field_study', user_education_info.Other_field_study]
//         );
//         // console.log(UpdateEducation);
//       } else if (
//         (userprofile.major == 11 ||
//           userprofile.major == 14 ||
//           userprofile.major == 16 ||
//           userprofile.major == 17 ||
//           userprofile.major == 18 ||
//           userprofile.major == 19 ||
//           userprofile.major == 20) &&
//         (major_id.major_id == 11 ||
//           major_id.major_id == 14 ||
//           major_id.major_id == 16 ||
//           major_id.major_id == 17 ||
//           major_id.major_id == 18 ||
//           major_id.major_id == 19 ||
//           major_id.major_id == 20)
//       ) {
//         //Creating a new ID for old user
//         const NewUserProfile = await NewUser(
//           connection,
//           NewID,
//           userprofile.email,
//           'Mido123@',
//           major_id.major_id,
//           user_personal_info.firstname,
//           user_personal_info.lastname,
//           user_contact_info.mobile_number,
//           userprofile.application_Language
//         );
//         //reassigning old data to the new ID
//         // console.log(NewUserProfile);
//         const UpdateProfile = await UpdateData(
//           connection,
//           'user_profile',
//           NewID,
//           ['isVerified', '1'],
//           ['emailToken', null],
//           ['appisSaved', '1'],
//           ['create_time', userprofile.create_time],
//           ['isreset', userprofile.isreset]
//         );
//         // console.log(UpdateProfile);
//         const UpdatePersonal = await UpdateData(
//           connection,
//           'user_personal_info',
//           NewID,
//           ['title', user_personal_info.title],
//           ['fathername', user_personal_info.fathername],
//           ['maidename', user_personal_info.maidename],
//           ['mothername', user_personal_info.mothername],
//           ['gender', user_personal_info.gender],
//           ['dateofbirth', user_personal_info.dateofbirth],
//           ['countryofbirth', user_personal_info.countryofbirth],
//           ['placeofbirth', user_personal_info.placeofbirth],
//           ['registrationnumber', user_personal_info.registrationnumber],
//           ['maritalstatus', user_personal_info.maritalstatus],
//           ['firstnationality', user_personal_info.firstnationality],
//           ['secondnationality', user_personal_info.secondnationality]
//         );
//         // console.log(UpdatePersonal);

//         const UpdateLanguage = await UpdateData(
//           connection,
//           'user_languages_sat',
//           NewID,
//           ['french_proficiency', user_languages_sat.french_proficiency],
//           ['english_proficiency', user_languages_sat.english_proficiency],
//           ['arabic_proficiency', user_languages_sat.arabic_proficiency],
//           ['other_language', user_languages_sat.other_language],
//           [
//             'other_language_proficiency',
//             user_languages_sat.other_language_proficiency,
//           ]
//         );
//         // console.log(UpdateLanguage);

//         const UpdateContact = await UpdateData(
//           connection,
//           'user_contact_info',
//           NewID,
//           ['email_two', user_contact_info.email_two],
//           ['landline_number', user_contact_info.landline_number]
//         );

//         // console.log(UpdateContact);
//         const otherSource = user_source.otherSource ?? '';
//         const UpdatSource = await UpdateSource(
//           connection,
//           user_source.source,
//           otherSource,
//           NewID
//         );

//         // console.log(UpdatSource);

//         const UpdatePayment = await UpdateData(
//           connection,
//           'user_payment',
//           NewID,
//           ['payment_type', user_payment.payment_type],
//           ['otherpayment', user_payment.otherpayment]
//         );
//         // console.log(UpdatePayment);
//         const UpdateEmergency = await UpdateData(
//           connection,
//           'emergency_contact_info',
//           NewID,
//           ['prefix', emergency_contact_info.prefix],
//           ['firstname', emergency_contact_info.firstname],
//           ['middlename', emergency_contact_info.middlename],
//           ['lastname', emergency_contact_info.lastname],
//           ['relationship', emergency_contact_info.relationship],
//           ['phonenumber', emergency_contact_info.phonenumber],
//           ['medicalhealth', emergency_contact_info.medicalhealth],
//           ['diseasetype', emergency_contact_info.diseasetype]
//         );
//         // console.log(UpdateEmergency);
//         const UpdateAddress = await UpdateData(
//           connection,
//           'user_address_info',
//           NewID,
//           ['country', user_address_info.country],
//           ['region', user_address_info.region],
//           ['city', user_address_info.city],
//           ['street', user_address_info.street],
//           ['building', user_address_info.building],
//           ['floor', user_address_info.floor],
//           ['postal', user_address_info.postal]
//         );
//         // console.log(UpdateAddress);
//         const UpdateDocument = await UpdateData(
//           connection,
//           'user_document',
//           NewID,
//           ['docPassportUrl', user_doc.docPassportUrl],
//           ['docCvUrl', user_doc.docCvUrl],
//           ['profileUrl', user_doc.profileUrl],
//           ['docRecommandationLetterUrl', user_doc.docRecommandationLetterUrl],
//           ['docProofOfM1Url', user_doc.docProofOfM1Url],
//           ['docBACCertificateUrl', user_doc.docBACCertificateUrl],
//           ['docTranscriptUrl', user_doc.docTranscriptUrl],
//           ['docResearchUrl', user_doc.docResearchUrl]
//         );
//         // console.log(UpdateDocument);
//         const UpdateEducation = await UpdateData(
//           connection,
//           'user_education_info',
//           NewID,
//           ['degree_level', user_education_info.degree_level],
//           ['degreelevel_bba', user_education_info.degreelevel_bba],
//           ['field_study', user_education_info.field_study],
//           ['series', user_education_info.series],
//           ['obtain_date', user_education_info.obtain_date],
//           ['establishment', user_education_info.establishment],
//           ['other_establishment', user_education_info.other_establishment],
//           ['university', user_education_info.university],
//           ['degree_title', user_education_info.degree_title],
//           ['Other_field_study', user_education_info.Other_field_study]
//         );
//         // console.log(UpdateEducation);
//         const UpdatePastExp = await UpdateData(
//           connection,
//           'user_past_experience',
//           NewID,
//           ['company', user_past_experience.company],
//           ['startDate', user_past_experience.startDate],
//           ['experience_type', user_past_experience.experience_type],
//           ['rolesAndTasks', user_past_experience.rolesAndTasks],
//           ['country', user_past_experience.country],
//           ['othercompany', user_past_experience.othercompany]
//         );
//         // console.log(UpdatePastExp);
//       } else if (
//         (userprofile.major == 13 || userprofile.major == 15) &&
//         (major_id.major_id == 13 || major_id.major_id == 15)
//       ) {
//         //Creating a new ID for old user
//         const NewUserProfile = await NewUser(
//           connection,
//           NewID,
//           userprofile.email,
//           'Mido123@',
//           major_id.major_id,
//           user_personal_info.firstname,
//           user_personal_info.lastname,
//           user_contact_info.mobile_number,
//           userprofile.application_Language
//         );
//         // console.log(NewUserProfile);
//         //reassigning old data to the new ID
//         const UpdateProfile = await UpdateData(
//           connection,
//           'user_profile',
//           NewID,
//           ['isVerified', '1'],
//           ['emailToken', null],
//           ['appisSaved', '1'],
//           ['create_time', userprofile.create_time],
//           ['isreset', userprofile.isreset]
//         );
//         // console.log(UpdateProfile);
//         const UpdatePersonal = await UpdateData(
//           connection,
//           'user_personal_info',
//           NewID,
//           ['title', user_personal_info.title],
//           ['fathername', user_personal_info.fathername],
//           ['maidename', user_personal_info.maidename],
//           ['mothername', user_personal_info.mothername],
//           ['gender', user_personal_info.gender],
//           ['dateofbirth', user_personal_info.dateofbirth],
//           ['countryofbirth', user_personal_info.countryofbirth],
//           ['placeofbirth', user_personal_info.placeofbirth],
//           ['registrationnumber', user_personal_info.registrationnumber],
//           ['maritalstatus', user_personal_info.maritalstatus],
//           ['firstnationality', user_personal_info.firstnationality],
//           ['secondnationality', user_personal_info.secondnationality]
//         );
//         // console.log(UpdatePersonal);
//         const UpdateLanguage = await UpdateData(
//           connection,
//           'user_languages_sat',
//           NewID,
//           ['french_proficiency', user_languages_sat.french_proficiency],
//           ['english_proficiency', user_languages_sat.english_proficiency],
//           ['arabic_proficiency', user_languages_sat.arabic_proficiency],
//           ['other_language', user_languages_sat.other_language],
//           [
//             'other_language_proficiency',
//             user_languages_sat.other_language_proficiency,
//           ]
//         );
//         // console.log(UpdateLanguage);

//         const UpdateContact = await UpdateData(
//           connection,
//           'user_contact_info',
//           NewID,
//           ['email_two', user_contact_info.email_two],
//           ['landline_number', user_contact_info.landline_number]
//         );
//         // console.log(UpdateContact);
//         const otherSource = user_source.otherSource ?? '';
//         const UpdatSource = await UpdateSource(
//           connection,
//           user_source.source,
//           otherSource,
//           NewID
//         );

//         // console.log(UpdatSource);

//         const UpdatePayment = await UpdateData(
//           connection,
//           'user_payment',
//           NewID,
//           ['payment_type', user_payment.payment_type],
//           ['otherpayment', user_payment.otherpayment]
//         );
//         // console.log(UpdatePayment);
//         const UpdateEmergency = await UpdateData(
//           connection,
//           'emergency_contact_info',
//           NewID,
//           ['prefix', emergency_contact_info.prefix],
//           ['firstname', emergency_contact_info.firstname],
//           ['middlename', emergency_contact_info.middlename],
//           ['lastname', emergency_contact_info.lastname],
//           ['relationship', emergency_contact_info.relationship],
//           ['phonenumber', emergency_contact_info.phonenumber],
//           ['medicalhealth', emergency_contact_info.medicalhealth],
//           ['diseasetype', emergency_contact_info.diseasetype]
//         );
//         // console.log(UpdateEmergency);
//         const UpdateAddress = await UpdateData(
//           connection,
//           'user_address_info',
//           NewID,
//           ['country', user_address_info.country],
//           ['region', user_address_info.region],
//           ['city', user_address_info.city],
//           ['street', user_address_info.street],
//           ['building', user_address_info.building],
//           ['floor', user_address_info.floor],
//           ['postal', user_address_info.postal]
//         );
//         // console.log(UpdateAddress);
//         const UpdateDocument = await UpdateData(
//           connection,
//           'user_document',
//           NewID,
//           ['docPassportUrl', user_doc.docPassportUrl],
//           ['docCvUrl', user_doc.docCvUrl],
//           ['profileUrl', user_doc.profileUrl],
//           ['docRecommandationLetterUrl', user_doc.docRecommandationLetterUrl],
//           ['docProofOfM1Url', user_doc.docProofOfM1Url],
//           ['docBACCertificateUrl', user_doc.docBACCertificateUrl],
//           ['docTranscriptUrl', user_doc.docTranscriptUrl],
//           ['docResearchUrl', user_doc.docResearchUrl]
//         );
//         // console.log(UpdateDocument);
//         const UpdateEducation = await UpdateData(
//           connection,
//           'user_education_info',
//           NewID,
//           ['degree_level', user_education_info.degree_level],
//           ['degreelevel_bba', user_education_info.degreelevel_bba],
//           ['field_study', user_education_info.field_study],
//           ['series', user_education_info.series],
//           ['obtain_date', user_education_info.obtain_date],
//           ['establishment', user_education_info.establishment],
//           ['other_establishment', user_education_info.other_establishment],
//           ['university', user_education_info.university],
//           ['degree_title', user_education_info.degree_title],
//           ['Other_field_study', user_education_info.Other_field_study]
//         );
//         // console.log(UpdateEducation);

//         const UpdateCompanyExp = await UpdateData(
//           connection,
//           'user_company_experience',
//           NewID,
//           ['company_name', user_company_experience.company_name],
//           ['job_title', user_company_experience.job_title],
//           ['start_date', user_company_experience.start_date],
//           ['director_name', user_company_experience.director_name],
//           ['hr_name', user_company_experience.hr_name],
//           ['website', user_company_experience.website],
//           ['city', user_company_experience.city],
//           ['building', user_company_experience.building],
//           ['floor', user_company_experience.floor],
//           ['street', user_company_experience.street],
//           ['region', user_company_experience.region],
//           ['country', user_company_experience.country],
//           ['phone', user_company_experience.phone],
//           ['postal', user_company_experience.postal],
//           ['num_of_employee', user_company_experience.num_of_employee],
//           ['num_emp_managed', user_company_experience.num_emp_managed],
//           ['turnover', user_company_experience.turnover],
//           ['annual_income', user_company_experience.annual_income],
//           ['monthly_salary', user_company_experience.monthly_salary],
//           ['work_sat', user_company_experience.work_sat],
//           ['position', user_company_experience.position],
//           ['functional_area', user_company_experience.functional_area],
//           ['business_activity', user_company_experience.business_activity],
//           ['totalYears', user_company_experience.totalYears],
//           ['totalMonths', user_company_experience.totalMonths],
//           ['otherCompany', user_company_experience.otherCompany]
//         );
//         // console.log(UpdateCompanyExp);
//         const UpdateQuestion = await UpdateData(
//           connection,
//           'user_questions',
//           NewID,
//           ['currentJob', user_questions.currentJob],
//           ['otherActivities', user_questions.otherActivities],
//           ['acheivement', user_questions.acheivement],
//           ['reason', user_questions.reason],
//           ['careerObjectives', user_questions.careerObjectives],
//           ['interests', user_questions.interests],
//           ['selfDescription', user_questions.selfDescription]
//         );
//         // console.log(UpdateQuestion);
//       }
//       const current_app_promotion = await current_applicant_promotion(
//         major_id.major_id,
//         NewID,
//         connection
//       );
//       // console.log(current_app_promotion);
//       sis_app_logger.info(
//         `${new Date()}=${user.role}=change student major=${user.email}=${
//           userAgentinfo.os.family
//         }=${userAgentinfo.os.major}=${userAgentinfo.family}=${
//           userAgentinfo.source
//         }=${userAgentinfo.device.family}`
//       );
//       res.status(200).json({
//         message: `Account major was Changed in the database to:${major}`,
//         promotion: current_app_promotion.current_applicants_promotion,
//         firstname: user_personal_info.firstname,
//         lastname: user_personal_info.firstname,
//         oldmajor: Oldmajorame.program,
//         newmajor: major,
//         defaultpassword: defaultpassword,
//         newID: NewID,
//         email: userprofile.email,
//       });
//       await disconnect(connection);
//     } catch (error) {
//       sis_app_logger.error(
//         `${new Date()}=change student major error=${user.role}=${user.email}=${
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
