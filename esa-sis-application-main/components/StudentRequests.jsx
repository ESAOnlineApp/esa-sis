import React, { useEffect, useState, useRef } from 'react';
// import EmailForSendingRequest from "../utilities/emailing/emailForSendingRequest";
// import { useDispatch } from "react-redux";
import axios from 'axios';
// import emailRequestTranscript from "../pages/api/user/emailRequestTranscript";
import Loader from './Loader/Loader';

import { useSession } from 'next-auth/react';

const StudentRequests = () => {
  const { data: session } = useSession();

  const [semester, setSemester] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [reason, setReason] = useState('');
  const [major, setMajor] = useState('');
  const [stEmail, setStEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageClass, setMessageClass] = useState('');
  const [gpa, setGpa] = useState('Included');
  const [isLoading, setIsLoading] = useState(false);
  const [pm_firstName, setPm_firstName] = useState('');
  const [pm_lastname, setPm_lastname] = useState('');
  const [pm_email, setPm_email] = useState('');
  const [pm_id, setPm_id] = useState('');

  // console.log(session?.user);
  const getStudent = async () => {
    let sendData = {
      student_id: session?.user.userid,
    };
    try {
      const res = await axios.post(
        '/api/user/studentForRequestTranscript',
        sendData
      );
      // setGpa(res.data.rows[0].gpa);

      setMajor(res.data.rows[0].major_name);
      // console.log(typeof res.data.rows[0].gpa);
      setStEmail(res.data.rows[0].email);
    } catch (error) {
      console.log(error);
    }
  };
  const getPM = async () => {
    let sendData = {
      major_id: session?.user.majorid,
    };
    try {
      const res = await axios.post(
        '/api/user/getPmDetailsForRequests',
        sendData
      );
      setPm_firstName(res.data.rows[0].pm_firstname);
      setPm_lastname(res.data.rows[0].pm_lastname);
      setPm_email(res.data.rows[0].pm_email);
      setPm_id(res.data.rows[0].pm_id);
      
    } catch (error) {
     
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStudent();
    getPM();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const radioRef = useRef(null);
  const radioRef2 = useRef(null);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log({
    //   semester,
    //   academicYear,
    //   reason,
    //   student_id: session?.user.userid,
    //   major,
    //   student_name: session?.user.name,
    //   student_email: stEmail,
    //   gpa,
    // });
    if (
      session?.user.majorName === 'BBA (Bachelor in Business Administration)' &&
      semester === ''
    ) {
      setMessage('All Fields Must be Filled !');
      setMessageClass('text-red-500');
      setIsLoading(false);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
    if (reason === '') {
      setMessage('All Fields Must be Filled !');
      setMessageClass('text-red-500');
      setIsLoading(false);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } else {
      try {
        let sendData = {
          semester,
          academicYear,
          reason,
          student_id: session?.user.userid,
          major,
          student_name: session?.user.name,
          student_email: stEmail,
          gpa,
          promotion: session?.user.promotion,
          pm_firstName,
          pm_lastname,
          pm_email,
        };
        
        let res = await axios.post('/api/admin/adminApi/sendReqToPM', sendData);
       
        let sendToPm = {
          pm_id,
          student_id: session?.user.userid,
          student_email: stEmail,
          major_id: session?.user.majorid,
          promotion: session?.user.promotion,
          gpa: gpa,
        };
         await axios.post('/api/pmApi/addRequestForPm', sendToPm);
        
        setMessage('Request Sent !');
        setMessageClass('text-green-500');
        setReason(''), setSemester(''), setAcademicYear('');
        setTimeout(() => {
          setMessage('');
        }, 5000);
        if (res) {
          setIsLoading(false);
        }
      
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleRadioClick = () => {
    if (radioRef.current) {
      radioRef.current.blur();
    }
    if (radioRef2.current) {
      radioRef2.current.blur();
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center">
        <p className={` ${messageClass}`}>{message}</p>
      </div>
      <form onSubmit={submitHandler} className="mt-12 min-w-full">
        {session?.user.majorName ===
          'BBA (Bachelor in Business Administration)' && (
          <div className="mb-4">
            <label>Semester:</label>
            <input
              type="text"
              placeholder="ex: Fall"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        <div className="mb-4 flex flex-col md:flex-row">
          {!session?.user.majorName.includes('EXED') && (
            <>
          <div className="flex items-center">
            <input
              type="radio"
              value="Included"
              name="gpa-radio"
              className="w-4 h-4 mr-2"
              ref={radioRef}
              onClick={handleRadioClick}
              onChange={(e) => setGpa(e.target.value)}
            />

            <label className="text-sm font-medium text-primary">
              Include GPA
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              value="Excluded"
              ref={radioRef2}
              onClick={handleRadioClick}
              name="gpa-radio"
              onChange={(e) => setGpa(e.target.value)}
              className="w-4 h-4 mr-2"
            />

            <label className="text-sm font-medium text-primary">
              Exclude GPA
            </label>
          </div>
          </>
          )}
        </div>
        <div className="flex flex-col">
          <div className="mb-4">
            <textarea
              className="w-full p-2 border rounded"
              rows="6"
              name="ID"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the Reason"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4 justify-end">
            <button
              className="w-full sm:w-1/2 p-2 rounded primary-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
            {isLoading && <Loader />}
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentRequests;
