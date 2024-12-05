import React, { useReducer, useState, useEffect } from "react";
import { NotificatonMessage } from "../../components/Dashboard/WarningMessage";
import * as XLSX from "xlsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import DropZone from "../../components/UploadDocuments/DropZone";
import uploadDocReducer from "../../components/UploadDocuments/reducers/uploadDocReducer";

export default function UploadGradesByMajor({ setClickUpload, showAll, showAllGMP, showAllRTF, showAllEXED, majorId, majors, clickUpload }) {
    const { data: session } = useSession();
    const [confirmOpenMessage, setConfirmOpenMessage] = useState(false);
    const [messages, setMessages] = useState("");
    const [isClick, setIsClick] = useState(false);
    // const [student, setStudentData] = useState([]);
    const [hasFetched, setHasFetched] = useState(false)
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
        setConfirmOpenMessage(true);
    };

    const handleCloseNotificatonMessages = () => {
        setConfirmOpenMessage(false);
        setIsClick(false);
    };

    const getFirstWordBeforeHyphen = (text) => {
        if (text) {
            const words = text.split("-");
            if (words.length > 0) {
                return words[0];
            }
        }
        return "";
    };
    const getFirstWordAfterHyphen = (text) => {
        if (text) {
            const words = text.split("-");
            if (words.length > 0) {
                return words[1];
            }
        }
        return "";
    };
    const firstMajorWord = getFirstWordBeforeHyphen(session?.user.majorName);
    const SecondMajorWord = getFirstWordAfterHyphen(session?.user.majorName);
    const isExeMajor = firstMajorWord === "EXED";



    useEffect(() => {
        // Auto-refresh the page 
        // const interval = setInterval(() => {
        if (!isExeMajor) {
            showAll();
        } else if (isExeMajor && majors === 'EXED-GMP') {
            showAllGMP();
        } else if (isExeMajor && SecondMajorWord === 'Digital Transformation in Financial Services' || majors === 'Digital Transformation in Financial Services' || majors === 'Digital Transformation' || SecondMajorWord === 'Digital Transformation') {
            showAllRTF()
        } else if (isExeMajor) {
            showAllEXED()
        }
        // }, 2000);

        // // Clear the interval when the component unmounts
        // return () => clearInterval(interval);
    }, [isClick]);

    const validateColumnHeaders = (columnA) => {
        if (!isExeMajor) {
            const templateFields = [
                'StudentID',
                'StudentFirstName',
                'StudentLastName',
                'CourseID',
                'Grade'
            ]; // Replace with your actual template fields

            // Check if all template fields exist in columnA
            const missingFields = templateFields.filter(
                (field) => !columnA.includes(field)
            );

            if (missingFields.length === 0) {
                // All template fields are present
                return true;
            } else {
                // Some template fields are missing
                return false;
            }
        } else if (SecondMajorWord === 'GMP' || SecondMajorWord === 'gmp' || SecondMajorWord === 'Gmp' || majors === 'EXED-GMP') {
            const templateFields = ['StudentID', 'FamilyName', 'FirstName', 'CertificateName', 'TaskName', 'Year', 'Grade', 'Comments']

            // Check if all template fields exist in columnA
            const missingFields = templateFields.filter(
                (field) => !columnA.includes(field)
            );

            if (missingFields.length === 0) {
                // All template fields are present
                return true;
            } else {
                // Some template fields are missing
                return false;
            }
        } else if (SecondMajorWord === 'Digital Transformation in Financial Services' || majors === 'Digital Transformation in Financial Services' || majors === 'Digital Transformation' || SecondMajorWord === 'Digital Transformation') {

            const templateFields = ['StudentID', 'FamilyName', 'FirstName', 'CertificateName', 'TaskName', 'Year', 'GradeOver30', 'GradeOver20']


            // Check if all template fields exist in columnA
            const missingFields = templateFields.filter(
                (field) => !columnA.includes(field)
            );

            if (missingFields.length === 0) {
                // All template fields are present
                return true;
            } else {
                // Some template fields are missing
                return false;
            }
        } else if (isExeMajor) {
            const templateFields = ['StudentID', 'FamilyName', 'FirstName', 'CertificateName', 'TaskName', 'Year', 'Grade', 'Comments']

            // Check if all template fields exist in columnA
            const missingFields = templateFields.filter(
                (field) => !columnA.includes(field)
            );

            if (missingFields.length === 0) {
                // All template fields are present
                return true;
            } else {
                // Some template fields are missing
                return false;
            }
        }
    };
    const validateRow = (rowData) => {
        if (!isExeMajor) {
            const requiredFields = [
                'StudentID',
                'StudentFirstName',
                'StudentLastName',
                'CourseID',
                'TaskName',
                'Grade',
                'Semester',
                'Academic_year'
            ];

            for (const field of requiredFields) {

                if (!rowData[field] || rowData[field] === "" || rowData[field] === undefined) {
                    return false; // Missing or empty required field
                } else {
                    return true; // All required fields are present and not empty
                }
            }
        } else if (SecondMajorWord === 'GMP' || SecondMajorWord === 'gmp' || SecondMajorWord === 'Gmp' || majors === 'EXED-GMP') {
            const requiredFields = ['StudentID', 'FamilyName', 'FirstName','Promotion' ,'CertificateName', 'TaskName', 'Year', 'Grade', 'Comments']

            for (const field of requiredFields) {

                if (!rowData[field] || rowData[field] === "" || rowData[field] === undefined) {
                    return false; // Missing or empty required field
                } else {
                    return true; // All required fields are present and not empty
                }
            }
        } else if (SecondMajorWord === 'Digital Transformation in Financial Services' || majors === 'Digital Transformation in Financial Services' || majors === 'Digital Transformation' || SecondMajorWord === 'Digital Transformation') {
            const requiredFields = ['StudentID', 'FamilyName', 'FirstName','Promotion' , 'CertificateName', 'TaskName', 'Year', 'GradeOver30', 'GradeOver20']

            for (const field of requiredFields) {

                if (!rowData[field] || rowData[field] === "" || rowData[field] === undefined) {
                    return false; // Missing or empty required field
                } else {
                    return true; // All required fields are present and not empty
                }
            }
        } else if (isExeMajor) {
            const requiredFields = ['StudentID', 'FamilyName', 'FirstName','Promotion' , 'CertificateName', 'TaskName', 'Year', 'Grade', 'Comments']

            for (const field of requiredFields) {

                if (!rowData[field] || rowData[field] === "" || rowData[field] === undefined) {
                    return false; // Missing or empty required field
                } else {
                    return true; // All required fields are present and not empty
                }
            }
        }



    };

    const fetchStudent = async (promotionName) => {
        try {

            const payload = {
                major_id: majorId,
                promotion_name: promotionName
            };

            if (clickUpload && !hasFetched) {
                const response = await axios.post('/api/pmApi/studentEmail', payload);

                const unsortedStudentData = response.data.data;


                // Sort the student data by student_id in increasing order
                const sortedStudentData = [...unsortedStudentData].sort((a, b) =>
                    a.student_id - b.student_id
                );
                // Extract the required information (first name, last name, and email)
                const studentInfo = sortedStudentData.map(student => ({
                    studentID: student.student_id,
                    firstName: student.student_firstname,
                    lastName: student.student_lastname,
                    email: student.email,
                    pm_id: session.user?.userid
                }));
                                // Set the student data in your state or wherever you need it
                                // setStudentData(studentInfo);
                                setHasFetched(true)
                return {data : studentInfo}







            }

        } catch (error) {
            return error;
        }
    };




    const handleAdd = async () => {
        try {
            setIsClick(true);
            // Fetch student emails separately
            const promotionNameColumnIndex = 3; // Assuming promotion name is in the second column (index 1)
            const file = uploadPhotoData.fileList[0];
            const reader = new FileReader();

            reader.onload = async function (event) {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: "array" });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const cellAddress = XLSX.utils.encode_cell({ r: 1, c: promotionNameColumnIndex });

                // Retrieve the value of the first cell in the specified column
                const promotionName = worksheet[cellAddress]?.v;
                // Fetch student emails based on the promotion name



               const students = await fetchStudent(promotionName)
               

                const studentInfo = students.data;
                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                if (rows.length < 2) {

                    setConfirmOpenMessage(true);
                    setMessages("Error: File is empty!");
                    return;
                }

                const firstRow = rows[0];
                const isValidHeaders = validateColumnHeaders(firstRow);
                if (!isValidHeaders) {
                    setConfirmOpenMessage(true);
                    setMessages("Error File! please upload Grade Template And Don't change The Header.");
                    return;
                }

                // Iterate through data rows (starting from index 1)
                for (let i = 1; i < rows.length; i++) {
                    const rowData = {}; // Create an object to store data from the current row

                    for (let j = 0; j < firstRow.length; j++) {
                        rowData[firstRow[j]] = rows[i][j]; // Assign values using header keys

                    }

                    // Check if the "Grade" column is empty or missing in the current row
                    if (!("Grade" in rowData) || rowData["Grade"] === "") {
                        setConfirmOpenMessage(true);
                        setMessages("No data was uploaded due to missing required information Grade.");
                        return;
                    }

                    if (!validateRow(rowData)) {
                        setConfirmOpenMessage(true);
                        setMessages("No data was uploaded due to missing required information.");
                        return;
                    }
                }

                // All validation checks passed, proceed with API call
                const formData = new FormData();

                formData.append("files", file);
                formData.append("studentInfo", JSON.stringify(studentInfo)); // Add studentInfo to formData

                try {
                    const { data } = await axios.post(
                        "/api/pmApi/uploadGrade",
                        formData,

                    );

                    if (data.success === true) {
                        setConfirmOpenMessage(true);
                        setMessages(data.message);
                        showAll()
                    }
                } catch (error) {
                    if (error.response && error.response.data.success === false) {
                        setConfirmOpenMessage(true);
                        setIsClick(false);
                        setMessages(error.response.data.message);
                    }
                }
            };

            reader.readAsArrayBuffer(file);
        } catch (error) {
            setConfirmOpenMessage(true);
            setMessages("Something went wrong. Please try again later.");
        }
    };

    // const handleAddGMP = async () => {
    //     try {
    //         setIsClick(true);

    //         // Fetch student emails separately
    //         const studentInfo = student;
    //         // console.log('student', studentInfo)

    //         if (!studentInfo || studentInfo.length === 0) {
    //             setConfirmOpenMessage(true);
    //             setMessages("Error: Unable to fetch student information.");
    //             return;
    //         }

    //         const file = uploadPhotoData.fileList[0];
    //         const reader = new FileReader();

    //         reader.onload = async function (event) {
    //             const data = new Uint8Array(event.target.result);
    //             const workbook = XLSX.read(data, { type: "array" });

    //             const sheetName = workbook.SheetNames[0];
    //             const worksheet = workbook.Sheets[sheetName];

    //             const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    //             if (rows.length < 2) {
    //                 setConfirmOpenMessage(true);
    //                 setMessages("Error: File is empty!");
    //                 return;
    //             }

    //             const firstRow = rows[0];
    //             const isValidHeaders = validateColumnHeaders(firstRow);
    //             if (!isValidHeaders) {
    //                 setConfirmOpenMessage(true);
    //                 setMessages("Error File! Please upload the Grade Template and don't change the header.");
    //                 return;
    //             }

    //             const formData = new FormData();
    //             formData.append("files", file);
    //             formData.append("studentInfo", JSON.stringify(studentInfo)); // Add studentInfo to formData

    //             try {
    //                 const { data } = await axios.post(
    //                     "/api/pmApi/uploadGMPGrades",
    //                     formData,
    //                 );

    //                 if (data.success === true) {
    //                     setConfirmOpenMessage(true);
    //                     setMessages(data.message);
    //                 }
    //             } catch (error) {
    //                 if (error.response && error.response.data.success === false) {
    //                     setConfirmOpenMessage(true);
    //                     setIsClick(false);
    //                     setMessages(error.response.data.message);
    //                 }
    //             }
    //         };

    //         reader.readAsArrayBuffer(file);
    //     } catch (error) {
    //         setConfirmOpenMessage(true);
    //         setMessages("Something went wrong. Please try again later.");
    //     }
    // };




    const handleAddGMP = async () => {
        try {
            setIsClick(true);

            const promotionNameColumnIndex = 3; // Assuming promotion name is in the second column (index 1)
            const file = uploadPhotoData.fileList[0];
            const reader = new FileReader();

            reader.onload = async function (event) {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: "array" });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const cellAddress = XLSX.utils.encode_cell({ r: 1, c: promotionNameColumnIndex });

                // Retrieve the value of the first cell in the specified column
                const promotionName = worksheet[cellAddress]?.v;
                // Fetch student emails based on the promotion name



               const students = await fetchStudent(promotionName)
               

                const studentInfo = students.data;
                
                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                if (rows.length < 2) {
                    setConfirmOpenMessage(true);
                    setMessages("Error: File is empty!");
                    return;
                }

                const firstRow = rows[0];
                const isValidHeaders = validateColumnHeaders(firstRow);
                if (!isValidHeaders) {
                    setConfirmOpenMessage(true);
                    setMessages("Error File! Please upload the Grade Template and don't change the header.");
                    return;
                }

                const formData = new FormData();
                formData.append("files", file);
                formData.append("studentInfo", JSON.stringify(studentInfo)); // Add studentInfo to formData

                try {
                    const { data } = await axios.post(
                        "/api/pmApi/uploadGMPGrades",
                        formData,
                    );

                    if (data.success === true) {
                        // Extract promotion name from the first row of the specified column
                        // Get the cell address of the first cell in the specified column

                        setConfirmOpenMessage(true);
                        setMessages(data.message);
                        showAllGMP()
                    }
                } catch (error) {
                    if (error.response && error.response.data.success === false) {
                        setConfirmOpenMessage(true);
                        setIsClick(false);
                        setMessages(error.response.data.message);
                    }
                }
            };

            reader.readAsArrayBuffer(file);
        } catch (error) {
            setConfirmOpenMessage(true);
            setMessages("Something went wrong. Please try again later.");
        }
    };


    const handleAddEXED = async () => {

        try {
            setIsClick(true);

            // Fetch student emails separately
            const promotionNameColumnIndex = 3; // Assuming promotion name is in the second column (index 1)
            const file = uploadPhotoData.fileList[0];
            const reader = new FileReader();

            reader.onload = async function (event) {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: "array" });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const cellAddress = XLSX.utils.encode_cell({ r: 1, c: promotionNameColumnIndex });

                // Retrieve the value of the first cell in the specified column
                const promotionName = worksheet[cellAddress]?.v;
                // Fetch student emails based on the promotion name



               const students = await fetchStudent(promotionName)
               

                const studentInfo = students.data;

                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                if (rows.length < 2) {
                    setConfirmOpenMessage(true);
                    setMessages("Error: File is empty!");
                    return;
                }

                const firstRow = rows[0];
                const isValidHeaders = validateColumnHeaders(firstRow);
                if (!isValidHeaders) {
                    setConfirmOpenMessage(true);
                    setMessages("Error File! Please upload the Grade Template and don't change the header.");
                    return;
                }

                const formData = new FormData();
                formData.append("files", file);
                formData.append("studentInfo", JSON.stringify(studentInfo)); // Add studentInfo to formData

                try {
                    const { data } = await axios.post(
                        "/api/pmApi/uploadGradesExED",
                        formData,
                    );

                    if (data.success === true) {
                        setConfirmOpenMessage(true);
                        setMessages(data.message);
                        showAllEXED()
                    }
                } catch (error) {
                    if (error.response && error.response.data.success === false) {
                        setConfirmOpenMessage(true);
                        setIsClick(false);
                        setMessages(error.response.data.message);
                    }
                }
            };

            reader.readAsArrayBuffer(file);
        } catch (error) {
            setConfirmOpenMessage(true);
            setMessages("Something went wrong. Please try again later.");
        }
    };

    const handleAddRTF = async () => {

        try {
            setIsClick(true);
            const promotionNameColumnIndex = 3; // Assuming promotion name is in the second column (index 1)
            const file = uploadPhotoData.fileList[0];
            const reader = new FileReader();

            reader.onload = async function (event) {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: "array" });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const cellAddress = XLSX.utils.encode_cell({ r: 1, c: promotionNameColumnIndex });

                // Retrieve the value of the first cell in the specified column
                const promotionName = worksheet[cellAddress]?.v;
                // Fetch student emails based on the promotion name



               const students = await fetchStudent(promotionName)
               

                const studentInfo = students.data;

                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                if (rows.length < 2) {
                    setConfirmOpenMessage(true);
                    setMessages("Error: File is empty!");
                    return;
                }

                const firstRow = rows[0];
                const isValidHeaders = validateColumnHeaders(firstRow);
                if (!isValidHeaders) {
                    setConfirmOpenMessage(true);
                    setMessages("Error File! Please upload the Grade Template and don't change the header.");
                    return;
                }

                const formData = new FormData();
                formData.append("files", file);
                formData.append("studentInfo", JSON.stringify(studentInfo)); // Add studentInfo to formData

                try {
                    const { data } = await axios.post(
                        "/api/pmApi/uploadGrades_RTF",
                        formData,
                    );

                    if (data.success === true) {
                        setConfirmOpenMessage(true);
                        setMessages(data.message);
                        showAllRTF()
                    }
                } catch (error) {
                    if (error.response && error.response.data.success === false) {
                        setConfirmOpenMessage(true);
                        setIsClick(false);
                        setMessages(error.response.data.message);
                    }
                }
            };

            reader.readAsArrayBuffer(file);
        } catch (error) {
            setConfirmOpenMessage(true);
            setMessages("Something went wrong. Please try again later.");
        }
    };




    return (
        <>
            {confirmOpenMessage && (
                <NotificatonMessage
                    handleOpenNotificatonMessages={handleOpenNotificatonMessages}
                    handleCloseNotificatonMessages={handleCloseNotificatonMessages}
                    messages={messages}
                />
            )}

            {session?.user.role === "2" || session?.user.role === "3" ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-3/4  my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-gray-700 text-3xl font-bold">
                                        Upload Grades
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setClickUpload(false)}
                                    >
                                        <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}

                                <>
                                    <div className="place-items-center">
                                        <form className="my-4 text-slate-500 text-lg leading-relaxed">
                                            <div className="flex flex-column justify-center  pb-4">

                                                <div className="relative p-6 flex-auto ">
                                                    <div className="">
                                                        <DropZone
                                                            data={uploadPhotoData}
                                                            dispatch={uploadPhotoDispatch}
                                                            type={"file"}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='p-4 ml-2 flex flex-column justify-center'>
                                                {isClick ? (
                                                    <button
                                                        className="primary-button cursor-not-allowed rounded w-60 btnCol text-white hover:text-white hover:font-bold"
                                                        type="button"
                                                        disabled
                                                    >
                                                        Scan
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold"
                                                        type="button"
                                                        onClick={
                                                            isExeMajor && SecondMajorWord === 'GMP' || majors === 'EXED-GMP' ?
                                                                handleAddGMP :
                                                                isExeMajor && SecondMajorWord === 'Digital Transformation in Financial Services' || majors === 'Digital Transformation in Financial Services' || majors === 'Digital Transformation' || SecondMajorWord === 'Digital Transformation' ?
                                                                    handleAddRTF
                                                                    : isExeMajor ? handleAddEXED : handleAdd
                                                        }
                                                    >
                                                        Scan
                                                    </button>
                                                )}

                                            </div>
                                        </form>
                                    </div>

                                </>

                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : (
                redirect()
            )}
        </>
    );
}

UploadGradesByMajor.auth = true;
UploadGradesByMajor.adminOnly = true;
