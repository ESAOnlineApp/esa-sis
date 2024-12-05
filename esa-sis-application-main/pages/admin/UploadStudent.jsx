import React, {  useReducer, useState } from 'react';
import { NotificatonMessage } from "../../components/Dashboard/WarningMessage";
import * as XLSX from 'xlsx';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from 'axios';
import DropZone from '../../components/UploadDocuments/DropZone';
import uploadDocReducer from '../../components/UploadDocuments/reducers/uploadDocReducer';
// function generateID(academicYear, majorId) {
//     let academic_year = academicYear;
//     let major_id = majorId;
//     const randomDigits = Math.floor(Math.random() * 10000)

//     return academic_year + major_id + randomDigits
// }

export default function UploadCourses() {

    const { data: session } = useSession();
    const [confirmOpenMessage, setConfirmOpenMessage] = useState(false)
    const [messages, setMessages] = useState('')
    const [isClick, setIsClick] = useState(false)
    // const [majorId, setMajorId] = useState('')
    const router = useRouter();



    const redirect = () => {
        router.push("/AccessDenied");
    };


    const [uploadPhotoData, uploadPhotoDispatch] = useReducer(uploadDocReducer, {
        inDropZone: false,
        fileList: [],
        totalSize: 0,
    });


    const handleOpenNotificatonMessages = () => {
        setConfirmOpenMessage(true)

    }
    const handleCloseNotificatonMessages = () => {
        // setMajorId('')
        setConfirmOpenMessage(false)
    }
    // function generateRandomPassword(length = 8) {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     let password = '';

    //     for (let i = 0; i < length; i++) {
    //         const randomIndex = Math.floor(Math.random() * characters.length);
    //         password += characters.charAt(randomIndex);
    //     }

    //     return password;
    // }
    const validateColumnHeaders = (columnA) => {
        const templateFields = [
            'StudentFirstName(required)', 'StudentLastName(required)', 'Gender(required)', 'DateOfBirth(required,e.g:(mm/dd/yyyy))',

            'AcademicYear(required)', 'Promotion(required,e.g:promo(promoNumber))', 'MajorName', 'Email(required)', 'MobileNumber(required)', 'PimsId', 'Title', 'SecondEmail', 'LandLineNumber',

            'FatherName', 'MotherName', 'maidename', 'CountryOfBirth', 'PlaceOfBirth', 'RegisterNumber', 'MartialStatus',

            'FirstNationality', 'SecondNationality', 'Country', 'Region', 'City', 'Street', 'Building', 'Floor', 'Postal',

            'Degree', 'Series', 'DateObtain', 'EducationCountry', 'Establishment', 'otherEstablishment',

            'EmergencePrefix', 'EmergenceFirstName', 'EmergenceMiddleName', 'EmergenceLastName', 'EmergencePhoneNumber',

            'EmergenceRelationShip', 'EmergenceMedicalHealth', 'EmergenceDisease'
        ]; // Replace with your actual template fields

        // Check if all template fields exist in columnA
        const missingFields = templateFields.filter(field => !columnA.includes(field));

        if (missingFields.length === 0) {
            // All template fields are present
            return true;
        } else {
            // Some template fields are missing
            return false;
        }
    };
    // const validateRow = (rowData) => {
    //     const requiredFields = ['StudentFirstName', 'StudentLastName', 'Gender', 'MobileNumber', 'Promotion', 'DateOfBirth', 'AcademicYear', 'Email', 'MajorName'];
    
    //     for (const field of requiredFields) {
    //         if (!rowData[field] || rowData[field] === "") {
    //             return false; // Missing or empty required field
    //         }
    //     }
    
    //     return true; // All required fields are present and not empty
    // };
    

    const handleScan = async () => {
        try {
            if (uploadPhotoData.fileList.length !== 0) {
                setIsClick(true);
                const formData = new FormData();
                formData.append('file', uploadPhotoData.fileList[0]);
                const file = uploadPhotoData.fileList[0];
                const reader = new FileReader();
    
                reader.onload = async function (event) {
                    const data = new Uint8Array(event.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
    
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    // const rows = XLSX.utils.sheet_to_json(worksheet, { header: 2 });
    
                    // if (rows.length <= 2) {
                    //     setConfirmOpenMessage(true);
                    //     setMessages("Error: File is empty!");
                    //     return;
                    // }
    
                    // const firstRow = rows[0];
    
                    const columnHeaders = [];
    
                    Object.keys(worksheet).forEach(cell => {
                        const cellRef = XLSX.utils.decode_cell(cell);
                        if (cellRef.r === 0) {
                            columnHeaders[cellRef.c] = worksheet[cell].v.trim();
                        }
                    });
    
                    // // Iterate through data rows (starting from index 1)
                    // for (let i = 1; i < rows.length; i++) {
                    //     const rowData = {}; // Create an object to store data from the current row
    
                    //     for (let j = 0; j < firstRow.length; j++) {
                    //         rowData[firstRow[j]] = rows[i][j]; // Assign values using header keys
                    //     }
    
                    //     if (!validateRow(rowData)) {
                    //         setIsClick(false);
                    //         setConfirmOpenMessage(true);
                    //         setMessages(`No data was uploaded due to missing required information.`);
                    //         return;
                    //     }
                    // }
                    Object.keys(worksheet).forEach(cell => {
                        const cellRef = XLSX.utils.decode_cell(cell);
                        if (cellRef.r === 0) {
                            columnHeaders[cellRef.c] = worksheet[cell].v;
                        }
                    });
    
                    const isValidHeaders = validateColumnHeaders(columnHeaders);
                    const majorNameFieldExists = columnHeaders.includes('MajorName');
                    // const requiredFields = ['StudentFirstName', 'StudentLastName', 'Gender', 'MobileNumber', 'Promotion', 'DateOfBirth', 'AcademicYear'];
    
                    if (!majorNameFieldExists || !isValidHeaders) {
                        setIsClick(false);
                        setConfirmOpenMessage(true);
                        setMessages("Invalid File Format. Make sure 'MajorName' field exists and headers are correct.");
                        return;
                    }
    
                    const records = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    const firstRowData = records[1];
                    // const missingRequiredFields = requiredFields.filter(field => !firstRowData.includes(field));
    
    
                    const majorNameValue = firstRowData[columnHeaders.indexOf('MajorName')];
                    
                    if(majorNameValue === undefined ){
                        setIsClick(false);
                        setConfirmOpenMessage(true);
                        setMessages(`No data was uploaded due to missing MajorName.`);
                    }
    
                    // await axios.post('/api/pmApi/getAllCourses', { table: 'major', Where: 'major_name', id: majorNameValue });
                    // const studentData = [];
                   
                    for (let rowIndex = 1; rowIndex < records.length; rowIndex++) {
                        const record = records[rowIndex];
                        // const year = record[4];
                        if(record[0]=== undefined || record[1] === undefined 
                            || record[2] === undefined || record[3] === undefined 
                            || record[4] === undefined || record[5] === undefined || record[7] === undefined 
                            || record[8]=== undefined){
                                setIsClick(false);
                                setConfirmOpenMessage(true);
                                setMessages(`No data was uploaded due to missing required information.`);
                                return;
                            }
                            if(record[0]=== '' && record[1] === '' 
                                && record[2] === '' && record[3] === '' 
                                && record[4] === '' && record[5] === '' && record[7] === '' 
                                && record[8]=== '' ){
                                    setIsClick(false);
                                    setConfirmOpenMessage(true);
                                    setMessages(`Error File: File is empty`);
                                    return;
                                }
                        // const student_id = generateID(year, response.data.data[0].major_id);
                        // const userpassword = generateRandomPassword(8);
                     
                        //     const studentDataArray = {
                        //         student_id,
                        //         userpassword,
                        //         Title: record[9],
                        //         StudentFirstName: record[0],
                        //         FatherName: record[12],
                        //         StudentLastName: record[1],
                        //         Promotion: record[5],
                        //         MajorName:record[6],
                        //         AcademicYear: record[4],
                        //         maidename: record[14],
                        //         MotherName: record[13],
                        //         Gender: record[2],
                        //         DateOfBirth: record[3],
                        //         CountryOfBirth: record[15],
                        //         PlaceOfBirth: record[16],
                        //         RegisterNumber: record[17],
                        //         MartialStatus: record[18],
                        //         FirstNationality: record[19],
                        //         SecondNationality: record[20],
                        //         EmergencePrefix: record[34],
                        //         EmergenceFirstName: record[35],
                        //         EmergenceMiddleName: record[36],
                        //         EmergenceLastName: record[37],
                        //         EmergencePhoneNumber: record[38],
                        //         EmergenceRelationShip: record[39],
                        //         EmergenceMedicalHealth: record[40],
                        //         EmergenceDisease: record[41],
                        //         Degree: record[28],
                        //         Series: record[29],
                        //         DateObtain: record[30],
                        //         EducationCountry: record[31],
                        //         Establishment: record[32],
                        //         otherEstablishment: record[33],
                        //         Email: record[7],
                        //         SecondEmail: record[10],
                        //         MobileNumber: record[8],
                        //         LandLineNumber: record[11],
                        //         Country: record[21],
                        //         Region: record[22],
                        //         City: record[23],
                        //         Street: record[24],
                        //         Building: record[25],
                        //         Floor: record[26],
                        //         Postal: record[27],
                        //         PimsId: record[9]
                        //     };
    
                        //     studentData.push(studentDataArray);    
                    }
    
                    if (isValidHeaders) {
                        try {
                            // try {
                            //     await axios.post('/api/admin/adminApi/uploadScanStudent', formData);
                            // } catch (error) {
                            //     console.error("API Error:", error);
    
                            // }
    
                            // const data = await axios.post(
                            //     '/api/admin/adminApi/uploadScanStudent',
                            //     studentData,
                            // );
                            const data = await axios.post('/api/admin/adminApi/uploadScanStudent', 
                            formData);
    
                            if (data.data.success === true) {
                                setIsClick(false);
                                setConfirmOpenMessage(true);
                                setMessages(data.data.message);
                            }
                        } catch (error) {
                            if (error.response && error.response.data.success === false) {
                                setConfirmOpenMessage(true);
                                setIsClick(false);
                                setMessages(error.response.data.message);
                            }
                        }
                    } else {
                        setIsClick(false);
                        setConfirmOpenMessage(true);
                        setMessages(`Error File! please upload Student Template And Don't change The Header`);
                    }
                };
    
                reader.readAsArrayBuffer(file);
            }
        } catch (error) {
            setIsClick(false);
            setConfirmOpenMessage(true);
            setMessages("Something went wrong. Please try again later.");
        }
    };
    

    return (
        <>

            {session?.user.role === '0' ? (
                <>
                    <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
                        Upload Student
                    </p>
                    <form>
                        {confirmOpenMessage && (
                            <NotificatonMessage
                                handleOpenNotificatonMessages={handleOpenNotificatonMessages}
                                handleCloseNotificatonMessages={handleCloseNotificatonMessages}
                                messages={messages}
                            />
                        )}

                        <div className="flex flex-column justify-center  pb-4 border-blue-300 border-b-2">
                            <div className="my-4 text-slate-500 text-lg leading-relaxed">

                                <div className=''>
                                    <div >
                                        <div className='my-4 text-slate-500 text-lg leading-relaxed hover:text-blue-600 hover:font-bold'>
                                            <DropZone
                                                data={uploadPhotoData}
                                                dispatch={uploadPhotoDispatch}
                                                type={'file'}

                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className='p-4 ml-2 flex flex-column justify-center'>
                            {isClick ?
                                <button
                                    className="primary-button cursor-not-allowed rounded w-60 btnCol text-white hover:text-white hover:font-bold"
                                    type="button"

                                    disabled

                                >
                                    Scan
                                </button> :
                                <button
                                    className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold"

                                    type="button"
                                    onClick={handleScan}

                                >
                                    Scan
                                </button>

                            }

                        </div>

                    </form>

                </>
            ) : (
                redirect()
            )}
        </>

    )
}
UploadCourses.auth = true;
UploadCourses.adminOnly = true;
