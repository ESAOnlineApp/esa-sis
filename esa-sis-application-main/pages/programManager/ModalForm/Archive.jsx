import React, { useEffect, useReducer, useState } from "react";
import DropZone from "../../../components/UploadDocuments/DropZone";
import { CVModal } from "../../../components/StudentInfoApplication/ModalDocument";
import uploadDocReducer from "../../../components/UploadDocuments/reducers/uploadDocReducer";
import { BsX } from "react-icons/bs";
// import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";


import { NotificatonMessage } from "../../../components/Dashboard/WarningMessage";

import axios from "axios";

export default function Archive({
  setShowArchive,
  attendance,
  details,
  setDetails,
}) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [message, setMessage] = useState("");
  const [docUrl, setDocUrl] = useState(false);
  const [confirmOpenMessage, setConfirmOpenMessage] = useState(false);
  // const [updateProfileButtonDisable, setupdateProfileButtonDisable] =
  //   useState(false);
  // const [profileUrl, setProfileUrl] = useState(null);

  // const dispatch = useDispatch();
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

  const closeModal = () => {
    setShowProfileModal(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const table = "attendance_report";
        const Where = "attendance_id";
        const id = details[0].attendance_id;

        const { data } = await axios.post("/api/pmApi/getAllCourses", {
          table,
          Where,
          id,
        });

        setDocUrl(data.data[0].url);
        // console.log("docUrl", docUrl)
      } catch (error) {
        return error;
      }
    };
    fetchData();
  }, [details]);

  useEffect(() => {
    if (uploadPhotoData.fileList.length !== 0) {
      // // console.log('uploaddata', uploadPhotoData.fileList[0].name);
      console.log('uploadphoto' , uploadPhotoData.fileList[0])

      // setupdateProfileButtonDisable(true);
      const handleUpload = async () => {
        try {

          const date = details[0].attendance_date;

          const DateFormat = moment(date).format("DD_MM_YYYY");

          const fileExtension = getFileExtension(
            uploadPhotoData.fileList[0].name
          );
          // const newFileName = `new_file_name${fileExtension}`;
          const newFileName = `attendance-${details[0].attendance_id}-${details[0].course_id}-${details[0].teacher_id}-${DateFormat}.${fileExtension}`;
          const formData = new FormData();
          formData.append("files", uploadPhotoData.fileList[0], newFileName);
          formData.append("major_id", details[0].major_id);
          formData.append("attendance_id", details[0].attendance_id);
          formData.append("course_id", details[0].course_id);
          formData.append("teacher_id", details[0].teacher_id);
          formData.append("attendance_date", DateFormat);
          formData.append("ext", fileExtension);

          const { data } = await axios.post(
            "/api/uploaddoc/uploadDoc",
            formData
          );
          // console.log('URL', data.url);
          setDocUrl(data.url);
          // setShowProfileModal(true)
          // setupdateProfileButtonDisable(false);
        } catch (error) {
          // console.log(error.response?.data);
        }
      };
      handleUpload();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadPhotoData.fileList]);
  const getFileExtension = (filename) => {
    const parts = filename.split(".");
    return parts[parts.length - 1];
  };

  const handleFile = async () => {
    try {
      const url = docUrl;
      console.log('att', attendance[0].attendance_id)
      const attendance_id = attendance[0].attendance_id;
      const { data } = await axios.post("/api/pmApi/updateURL", {
        url,
        attendance_id,
      });
     
      if (data.success) {
        setConfirmOpenMessage(true);

        setMessage(data.message);
      }



    } catch (error) {
      return error

    }
  };
  return (
    <>
      {confirmOpenMessage && (
        <NotificatonMessage
          handleOpenNotificatonMessages={handleOpenNotificatonMessages}
          handleCloseNotificatonMessages={handleCloseNotificatonMessages}
          messages={message}
        />
      )}
      {!showProfileModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full md:w-1/2 overflow-y-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-gray-700 text-3xl font-bold">
                    Upload File
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowArchive(false), setDetails([]);
                    }}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <BsX className=" text-gray-700 font-bold" />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-slate-500 text-lg leading-relaxed">
                    {message && (
                      <div className=" text-gray-600 item-center pt-5 mb-1 font-bold p-2">
                        {message}
                      </div>
                    )}
                    <div>
                      <DropZone
                        data={uploadPhotoData}
                        dispatch={uploadPhotoDispatch}
                        type={"file"}
                      />

                      {docUrl && docUrl !== " " && (
                        <div className="flex justify-center w-auto items-center">
                          {!showProfileModal && (
                            <a
                              className="cursor-pointer"
                              onClick={() => {
                                setShowProfileModal(true);
                              }}
                            >
                              Preview file
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex  justify-center items-center p-6  rounded-b">
                  <button
                    className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold"
                    type="button"
                    onClick={() => handleFile()}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-full h-full md:w-auto md:h-auto overflow-y-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b  border-slate-200 rounded-t">
                {/* <h3 className="text-3xl font-semibold">
                 View upload File
                </h3> */}
                {/* <button
                  className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => { setShowArchive(false), setDetails([]) }}
                >
                  <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                    <BsX className=" text-gray-700 font-bold" />
                  </span>
                </button> */}
              </div>
              {/*body*/}
              <div className="relative flex-auto">
                <CVModal
                  className="cursor-pointer "
                  closeModal={closeModal}
                  docUrl={docUrl}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );

}
