import React, {  useReducer, useState } from "react";

// import { useDispatch } from 'react-redux';
// import moment from 'moment';
import { NotificatonMessage } from "../../components/Dashboard/WarningMessage";
import * as XLSX from "xlsx";
import { useSession } from "next-auth/react";
// import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import DropZone from "../../components/UploadDocuments/DropZone";
import uploadDocReducer from "../../components/UploadDocuments/reducers/uploadDocReducer";
// import selection_data from '../../utilities/selection_data';
export default function UploadTeacher() {
  // const [showProfileModal, setShowProfileModal] = useState(false);
  // const [message, setMessage] = useState('');
  // const [docUrl, setDocUrl] = useState(false);
  // const [updateProfileButtonDisable, setupdateProfileButtonDisable] =
  //     useState(false);
  // const [profileUrl, setProfileUrl] = useState(null);
  const { data: session } = useSession();
  const [confirmOpenMessage, setConfirmOpenMessage] = useState(false);
  const [messages, setMessages] = useState("");
  const [isClick, setIsClick] = useState(false);
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
  };
  const validateColumnHeaders = (columnA) => {
    const templateFields = ["FirstName", "LastName", "Email" , 'MobileNumber']; // Replace with your actual template fields

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
  };
  // function generateID(prefix) {
  //   prefix.length;
  //   const randomDigits = Math.floor(Math.random() * 10000).toString();

  //   return randomDigits;
  // }
  // useEffect(() => {
  //   if (uploadPhotoData.fileList.length !== 0) {
  //     const handleUpload = async () => {
  //       try {
  //         const formData = new FormData();
  //         formData.append("files", uploadPhotoData.fileList[0]);

  //         // Assuming you have a reference to the uploaded file in uploadPhotoData.fileList[0]
  //         const file = uploadPhotoData.fileList[0];

  //         // Assuming you have retrieved the file from the FormData object
  //         const reader = new FileReader();

  //         reader.onload = async function (event) {
  //           const data = new Uint8Array(event.target.result);
  //           const workbook = XLSX.read(data, { type: "array" });

  //           // Assuming you are interested in the first sheet of the workbook
  //           const sheetName = workbook.SheetNames[0];
  //           const worksheet = workbook.Sheets[sheetName];

  //           // Parse columns or specific cells here
  //           // For example, let's say you want to extract data from column A
  //           const columnHeaders = [];

  //           Object.keys(worksheet).forEach((cell) => {
  //             const cellRef = XLSX.utils.decode_cell(cell);
  //             if (cellRef.r === 0) {
  //               columnHeaders[cellRef.c] = worksheet[cell].v;
  //             }
  //           });

  //           const isValidHeaders = validateColumnHeaders(columnHeaders);

  //           if (isValidHeaders) {
  //             // Data is valid, proceed with uploading and other actions

  //             await axios.post("/api/admin/adminApi/uploadTeacher", formData);
  //           }
  //         };

  //         reader.readAsArrayBuffer(file);
  //       } catch (error) {
  //         // console.log(error.response?.data);
  //       }
  //     };
  //     handleUpload();
  //   }
  // }, [uploadPhotoData.fileList]);

  const handleScan = async () => {
    try {
      if (uploadPhotoData.fileList.length !== 0) {
        setIsClick(true);

        const formData = new FormData();
        formData.append("file", uploadPhotoData.fileList[0]);

        const file = uploadPhotoData.fileList[0];
        const reader = new FileReader();

        reader.onload = async function (event) {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          const columnHeaders = [];

          Object.keys(worksheet).forEach((cell) => {
            const cellRef = XLSX.utils.decode_cell(cell);
            if (cellRef.r === 0) {
              columnHeaders[cellRef.c] = worksheet[cell].v;
            }
          });

          const isValidHeaders = validateColumnHeaders(columnHeaders);

          const records = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          // for (let rowIndex = 1; rowIndex < records.length; rowIndex++) {
          //   const record = records[rowIndex];
          //   console.log(record)
          //   if (!record[0]) {
          //     setIsClick(false);
          //     setConfirmOpenMessage(true);
          //     setMessages("Error File: please upload template file AND/OR Don't Change Header");
          //     return;
          //   }
          // }


          // const teacherDataArray = [];
          // for (let rowIndex = 1; rowIndex < records.length; rowIndex++) {
          //   const record = records[rowIndex];
          //   const teacher_id = generateID(5);

          //   // const teacherData = {
          //   //   teacher_id,
          //   //   firstName: record[0], // Assuming FirstName is in the first column
          //   //   lastName: record[1], // Assuming LastName is in the second column
          //   //   email: record[2], // Assuming Email is in the third column
          //   //   mobile:record[3]
              
          //   // };

          //   // teacherDataArray.push(teacherData);
          // }

          if (isValidHeaders) {
            // Proceed with uploading and other actions
            try {
              // Check if there are any records in the file
              if (records.length <= 1) {
                setIsClick(false);
                setConfirmOpenMessage(true);
                setMessages("Error File: The uploaded Excel file is empty.");
                return;
              }
              for (let rowIndex = 1; rowIndex < records.length; rowIndex++) {
                const record = records[rowIndex];
                console.log('record' , record)
               
                if (record[0] === '' || record[1] === '' || record[2] === '' || record[3]==='' ||
                  record[0] === undefined || record[1] === undefined 
                  || record[2] === undefined 
                  || record[3]=== undefined) {
                    console.log('test' ,record[0] === '' || record[1] === '' || record[2] === '' || record[3]==='' ||
                    record[0] === undefined || record[1] === undefined 
                    || record[2] === undefined 
                    || record[3]=== undefined )
                  setIsClick(false);
                  setConfirmOpenMessage(true);
                  setMessages("No data was uploaded due to missing required information.");
                  return;
                }
              }
              const response = await axios.post(
                "/api/admin/adminApi/uploadTeacher",
                formData
              );

              // const response = await axios.post(
              //   "/api/admin/adminApi/uploadTeacher",
              //   teacherDataArray
              // );

              if (response.data.success === true) {
                setConfirmOpenMessage(true);
                setIsClick(false);
                setMessages(response.data.message);
              }


            } catch (error) {
              if (error.response && error.response.data.success === false) {
                setConfirmOpenMessage(true);
                setIsClick(false);
                setMessages(error.response.data.message)

              }
            }

          } else {
            setIsClick(false);
            setConfirmOpenMessage(true);
            setMessages("Error File! please upload Teacher Template And Don't change The Header");
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

      {session?.user.role === "0" ? (
        <>
          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
            Upload Teachers
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
                <div className="">
                  <div>
                    <div className="my-4 text-slate-500 text-lg leading-relaxed hover:text-blue-600 hover:font-bold">
                      <DropZone
                        data={uploadPhotoData}
                        dispatch={uploadPhotoDispatch}
                        type={"file"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 ml-2 flex flex-column justify-center">
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
                  onClick={handleScan}
                >
                  Scan
                </button>
              )}
            </div>
          </form>
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
UploadTeacher.auth = true;
UploadTeacher.adminOnly = true;
