import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import axios from 'axios';

export default function ModalperID({
  setShowPrint,
  courseName,
  session,
  teachersFirstname,
  teacherslastname,
  date,
  details,
  setDetails,
  setDate,
  setCourseName,
  setTeacherFirstName,
  setTeacherlastname,
}) {
  const componentRef = useRef();
  const [promotion, setPromotion] = useState([]);
  const [student, setStudent] = useState([]);
  // const date = details[0].attendance_date
  // const year = new Date(date).getFullYear()
  // const days = details[0].attendance_date

  useEffect(() => {
    const handlePromotionByID = async () => {
      try {
        const attendanceID = details[0].attendance_id;
        const payload = {
          major_id: session.user.majorid,
          attendance_id: attendanceID,
        };
        const data = await axios.post(
          '/api/pmApi/getPromoFromSchedule',
          payload
        );
        setPromotion(data.data.data[0].promotion);
      } catch (error) {
        return error;
      }
    };
    handlePromotionByID();
    const handlePromotion = async () => {
      try {
        const attendance_id = details[0].attendance_id;
        const data = await axios.post('/api/pmApi/getStudentPromotions', {
          attendance_id,
        });
        const sortedStudents = data.data.data.sort((a, b) => {
          const fullNameA = a.student_fullname.toLowerCase();
          const fullNameB = b.student_fullname.toLowerCase();

          const [firstNameA, lastNameA] = fullNameA.split(' ');
          const [firstNameB, lastNameB] = fullNameB.split(' ');

          if (firstNameA === firstNameB) {
            return lastNameA.localeCompare(lastNameB);
          } else {
            return firstNameA.localeCompare(firstNameB);
          }
        });

        const datesArray = sortedStudents.map(
          (student) => student.student_fullname
        );
        setStudent(datesArray);
      } catch (error) {
        return error;
      }
    };

    handlePromotion();
    setTimeout(() => {
      handlePromotion();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);
  // console.log("promotions", promotion);
  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-1/2 h-screen my-6 mx-auto max-w-3xl p-8">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-gray-700 text-3xl font-bold">Print</h3>
                {/* <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button> */}
              </div>
              {/*body*/}
              <div
                ref={componentRef}
                className="flex flex-col bg-white justify-around px-4 relative p-6 flex-auto"
              >
                <div className="flex flex-col pl-2 pr-4 leading-relaxed">
                  <div className="flex flex-row mt-2">
                    <div className="">
                      <picture>
                        <img
                          className="w-20 h-auto"
                          // src={
                          //     'https://res.cloudinary.com/ds6avfn6i/image/upload/v1684261612/esaonlineapp/public/esa-logo_y9a1ha.png'
                          // }
                          // src={appState.appVar.esa_logo}
                          src={'../../../../esa.png'}
                          alt="ESA logo"
                        />
                      </picture>
                    </div>

                    <div className="mt-5 ml-2">
                      <h1 className="text-xl">ESA Business School</h1>
                      <p className="font-medium">{promotion}</p>
                    </div>
                  </div>
                  <div className="ml-2">
                    <div className="flex flex-row mb-1 ">
                      <div className=" border-b-2 border-black">
                        <span className="font-medium mr-2">Date:</span>
                      </div>
                      <div className=" border-b-2 border-black">
                        <p className="text-base">
                          {moment(date).format('DD/MM/YYYY')}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row mb-2 border-b-1 border-black ">
                      <div className="border-b-2 border-black">
                        <span className=" font-medium mr-2">Module Name:</span>
                      </div>
                      <div className="border-b-2 border-black">
                        <p className="text-base">{courseName}</p>
                      </div>
                    </div>
                    <div className="flex flex-row mb-2">
                      <div className="border-b-2 border-black">
                        <span className="font-medium  mr-2">
                          Professor Name:
                        </span>
                      </div>
                      <div className="border-b-2 border-black">
                        <p className="text-base">
                          {teachersFirstname} {teacherslastname}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <table className=" border-collapse border mt-4 border-1 border-black w-full">
                        <thead>
                          <tr>
                            <th className="border border-1 border-black text-center p-0 font-medium">
                              Students
                            </th>
                            <th className="border border-1 border-black text-center p-0 font-medium">
                              Signature
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {student.length > 0 ? (
                            student.map((item, index) => (
                              <tr key={index}>
                                <td className="border border-1 border-black p-2 font-medium">
                                  {student[index]}
                                </td>
                                <td className="border border-1 border-black p-2 font-medium"></td>
                              </tr>
                            ))
                          ) : (
                            <></>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 rounded-b">
                <ReactToPrint
                  trigger={() => (
                    <button
                      className="primary-button btnCol text-white hover:text-white mr-3"
                      type="button"
                    >
                      Print
                    </button>
                  )}
                  content={() => componentRef.current}
                />
                <button
                  className="primary-button btnCol text-white hover:text-white "
                  onClick={() => {
                    setShowPrint(false),
                      setDate(''),
                      setCourseName(''),
                      setTeacherFirstName(''),
                      setTeacherlastname(''),
                      setDetails([]);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
}
