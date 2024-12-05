import Head from 'next/head';
// import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import { appIsWaiting } from '../../redux/slices/appSlice';
import AttendanceStudentList from '../../components/Dashboard/AtendanceStudentList';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import axios from 'axios';
//attendance
export default function Attendance() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);

  const router = useRouter();
  const redirect = () => {
    router.push('/AccessDenied');
  };

  const [present, setPresent] = useState('');

  const [attendance_date, setattendanceDate] = useState('');
  const [teacher_lastname, setTeacherLastName] = useState('');
  const [teacher_firstname, setTeacherFirstName] = useState('');
  const [course_name, setCourseName] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          major_id: session.user.majorid,
          student_id: session.user.userid,
          teacher_firstname: '',
          teacher_lastname: '',
          course_name: '',
          attendance_date: '',
          present: '',
        };
        const result = await axios.post(
          '/api/user/filterAttendanceStudent',
          payload
        );
        // console.log("data", result.data.data)

        setUsers(result.data.data);
      } catch (error) {
        return error;
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(session.user.majorid)

  const handleShowAll = async () => {
    try {
      const payload = {
        major_id: session.user.majorid,
        student_id: session.user.userid,
        teacher_firstname: '',
        teacher_lastname: '',
        course_name: '',
        attendance_date: '',
        present: '',
      };
      const result = await axios.post(
        '/api/user/filterAttendanceStudent',
        payload
      );
      setUsers(result.data.data);
      setattendanceDate('');
      setTeacherFirstName('');
      setTeacherLastName('');
      setPresent('');
      setCourseName('');

      // setTest(true)
    } catch (error) {
      return error;
    }
  };

  const handleAttendance = async () => {
    try {
      const payload = {
        major_id: session.user.majorid,
        student_id: session.user.userid,
        teacher_firstname: teacher_firstname,
        teacher_lastname: teacher_lastname,
        course_name: course_name,
        attendance_date: new Date(attendance_date),
        present: present,
      };
      const result = await axios.post(
        '/api/user/filterAttendanceStudent',
        payload
      );
      setUsers(result.data.data);
    } catch (error) {
      setUsers([])
      return error;
    }
  };

  return (
    <>
      <Head>
        <title>SIS Admin - Attendance</title>
      </Head>
      {session?.user.role === '1' ? (
        <>
          <p className="text-3xl pt-5 mb-10 font-bold text-primary">
            Attendance
          </p>
          <form>
            <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-primary border-b-2">
              <label className="text-primary">
                Date:
                <input
                  className="ml-12  w-40 max-[850px]:ml-10"
                  type="date"
                  name="date"
                  placeholder=""
                  id={'date'}
                  value={attendance_date}
                  onChange={(e) => {
                    setattendanceDate(e.target.value);
                  }}
                ></input>
              </label>

              <label className="invisible max-[850px]:visible max-[850px]:hidden text-primary">
                First Name:
                <input
                  className="ml-12 invisible max-[850px]:visible max-[850px]:hidden w-40 max-[850px]:ml-10"
                  type="text"
                  name="Fname"
                  placeholder="Teacher's First Name"
                  // value={formData.Fname}
                  onChange={() => {
                    // setFname(e.target.value)
                  }}
                ></input>
              </label>

              <label className="text-primary">
                Course:
                <input
                  className="ml-7  w-40 max-[850px]:ml-7"
                  type="text"
                  name="Lname"
                  placeholder="Course Name"
                  id={'text'}
                  value={course_name}
                  onChange={(e) => {
                    setCourseName(e.target.value);
                  }}
                ></input>
              </label>
              {/* </div>
        <div className="grid lg:grid-cols-3 min-[100px]:gap-4 mb-3"> */}
              <label className="text-primary">
                First Name:
                <input
                  className="ml-1 mt-3 w-40 max-[850px]:ml-1 max-[850px]:mt-0"
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  id={'teacherId'}
                  value={teacher_firstname}
                  onChange={(e) => {
                    setTeacherFirstName(e.target.value);
                  }}
                ></input>
              </label>

              <label className="invisible max-[850px]:visible max-[850px]:hidden">
                From:
                <input
                  className="ml-12 invisible max-[850px]:visible max-[850px]:hidden w-40 max-[850px]:ml-10"
                  type="date"
                  name="from"
                  // value={formData.from}
                  // onChange={handleChange}
                ></input>
              </label>

              <label className="text-primary">
                Last Name:
                <input
                  className="ml-1 w-40 max-[850px]:ml-1 max-[850px]:mt-0"
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  id={'teacherId'}
                  value={teacher_lastname}
                  onChange={(e) => {
                    setTeacherLastName(e.target.value);
                  }}
                ></input>
              </label>
              {/* </div>
        <div className="grid lg:grid-cols-3 min-[100px]:gap-4 mb-3 pb-4  border-blue-300 border-b-2"> */}

              <label className="invisible max-[850px]:visible max-[850px]:hidden">
                Present:
                <select
                  className=" invisible max-[850px]:visible max-[850px]:hidden max-[850px]:ml-[60px]"
                  value={present}
                  onChange={(e) => {
                    setPresent(e.target.value);
                  }}
                >
                  <option value="">Select Option...</option>
                  <option value="true">Present</option>
                  <option value="false">Absent</option>
                </select>
              </label>

              <label className="invisible max-[850px]:visible max-[850px]:hidden">
                To:
                <input
                  className="ml-16 w-40 invisible max-[850px]:visible max-[850px]:hidden max-[850px]:ml-[60px]"
                  type="date"
                  name="to"
                  // value={formData.to}
                  // onChange={handleChange}
                ></input>
              </label>
              <div className="flex flex-col min-[850px]:flex-row gap-4">
                <button
                  className="primary-button rounded w-60 btnCol text-white"
                  type="button"
                  onClick={handleAttendance}
                >
                  Search
                </button>
                <button
                  className="primary-button btnCol text-white rounded w-60"
                  type="button"
                  onClick={handleShowAll}
                >
                  Show All
                </button>
              </div>
            </div>

            <AttendanceStudentList users={users} setUsers={setUsers} />
          </form>
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
Attendance.auth = true;
Attendance.adminOnly = true;
