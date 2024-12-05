import Head from 'next/head';
// import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import { appIsWaiting } from '../../redux/slices/appSlice';
import AttendanceList from '../../components/Dashboard/AttendanceList';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import axios from 'axios';

export default function AttendanceById() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);

  const router = useRouter();

  const { majorId } = router.query;

  const redirect = () => {
    router.push('/AccessDenied');
  };

  const [attendance_id, setAttendanceId] = useState('');
  const [student_id, setStudentId] = useState('');
  const [teacher_id, setTeacherId] = useState('');
  // const [major_id, setMajorid] = useState('');
  // const [major, setMajor] = useState([]);
  // const [allMajor, setAllMajor] = useState([])
  const [course_id, setCourseId] = useState('');
  const [present, setPresent] = useState('');
  const [teacher_firstName, setTeacherFirstName] = useState('');
  const [teacher_lastName, setTeacherLastName] = useState('');
  const [attendance_date, setAttendanceDate] = useState('');

  const [major, setMajors] = useState([])

  const handleMajors = async () => {
    try {
      if (session.user?.role === '3') {
        const data = await axios.post('/api/pmApi/getMajorFromAs', {
          pm_ass_id: session.user?.userid
        })

        setMajors(data.data.data)
      } else if (session.user?.role === '2') {
        const data = await axios.post('/api/pmApi/getMajorFromMajor', {
          pm_id: session.user?.userid
        })

        setMajors(data.data.data)
      }


    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    handleMajors()


  }, [majorId])

  const handleMajor = (selectedValue) => {
    // Do something with the selected value
    if (selectedValue) {
      // Redirect to the new page with the selected major's ID
      const newPageURL = `/programManager/AttendanceById?majorId=${selectedValue}`;
      router.push(newPageURL);
    }

  };
  useEffect(() => {
    const getMajor = async () => {
      let table = 'major';

      let { data } = await axios.post('/api/pmApi/getAll', { table });

      // console.log('major')
      // // console.log(data.rows)
      // setAllMajor(data.rows)

      const datesArray = [];
      data.rows.forEach((attendance) => {
        datesArray.push(attendance.major_name);
      });

      // setMajor(datesArray);

    };
    getMajor();

    const fetchData = async () => {
      try {
        const payload = {
          attendanceId: '',
          studentId: '',
          teacherId: '',
          majorId: majorId,
          courseId: '',
          attendanceDate: '',
          present: '',
          teacher_firstname: '',
          teacher_lastname: '',
          major_name: '',
        };

        const result = await axios.post('/api/pmApi/filterAttendance', payload);
        // console.log("data", result.data.data)

        setUsers(result.data.data);
      } catch (error) {
        setUsers([])
        return error;
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [majorId]);
  // console.log(majorId)

  const handleShowAll = async () => {
    try {
      const payload = {
        attendanceId: '',
        studentId: '',
        teacherId: '',
        majorId: majorId,
        courseId: '',
        attendanceDate: '',
        present: '',
        teacher_teacherfirstname: '',
        teacher_teacherlastname: '',
        major_name: '',
      };
      const result = await axios.post('/api/pmApi/filterAttendance', payload);
      setUsers(result.data.data);
      setAttendanceId('');
      setCourseId('');
      setTeacherId('');
      setStudentId('');
      setAttendanceDate('');
      setPresent('');
      setTeacherFirstName('');
      setTeacherLastName('');
      // setMajorName('')
      // setMajorValue('')
      // setTest(true)
    } catch (error) {
      setUsers([])
      return error;
    }
  };

  const handleAttendance = async () => {
    try {
      // Assuming attendance_id, student_id, teacher_id, majorId, course_id, attendance_date, present, teacher_firstName, and teacher_lastName are defined

      const payload = {
        attendanceId: attendance_id,
        studentId: student_id,
        teacherId: teacher_id,
        majorId: majorId,
        courseId: course_id,
        attendanceDate: new Date(attendance_date),
        present: present,
        teacher_firstname: teacher_firstName,
        teacher_lastname: teacher_lastName,
      };

      const result = await axios.post('/api/pmApi/filterAttendance', payload);

      setUsers(result.data.data);
    } catch (error) {
      setUsers([])
   
      return error;
    }
  };

  // const handleMajor = (selectedValue) => {
  //   // Do something with the selected value
  //   // console.log("Selected Value:", selectedValue);
  //   if(test){
  //     selectedValue == ''
  //   }
  //   if(selectedValue.trim() !== ''){
  //   let majorID = allMajor.filter(major => major.major_name === selectedValue);
  //   // console.log(majorID[0].major_id)
  //   setMajorValue(majorID[0].major_id)

  // }else{
  //   setMajorValue("")

  // }
  // if(test == true){
  //   selectedValue === ' '
  // }
  // };


  return (
    <>
      <Head>
        <title>SIS Admin - Attendance</title>
      </Head>
      {session?.user.role === '2' || session?.user.role === '3' ? (
        <>
          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
            Attendance
          </p>
          <form>
            <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
              <label>
                Date:
                <input
                  className="ml-10 mt-3 w-40 max-[850px]:ml-12 max-[850px]:mt-0"
                  type="date"
                  name="date"
                  placeholder=""
                  id={'date'}
                  value={attendance_date}
                  onChange={(e) => {
                    setAttendanceDate(e.target.value);
                  }}
                // value={formData.ID}
                // onChange={handleChange}
                ></input>
              </label>

              <label>
                First Name:
                <input
                  className="ml-1 mt-3 w-40 max-[850px]:ml-1 max-[850px]:mt-0"
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  id={'teacherId'}
                  value={teacher_firstName}
                  onChange={(e) => {
                    setTeacherFirstName(e.target.value);
                  }}
                ></input>
              </label>

              <label>
                Last Name:
                <input
                  className="ml-2 mt-3 w-40 max-[850px]:ml-1 max-[850px]:mt-0"
                  type="text"
                  name="lastname"
                  placeholder="last Name"
                  id={'teacherId'}
                  value={teacher_lastName}
                  onChange={(e) => {
                    setTeacherLastName(e.target.value);
                  }}
                ></input>
              </label>
              {session.user?.hasMultiMajor === 'true' ?

                <label className=''>
                  Major:
                  <select
                    onChange={(e) => handleMajor(e.target.value)}
                    value={majorId}
                    className="ml-10 w-40 max-[850px]:ml-8"

                  >
                    <option key={"uu2isdvf"} value="">
                      Choose a Major
                    </option>
                    {major &&
                      major.map((major) => (
                        <>
                          <option key={major.major_id} value={major.major_id}>
                            {major.major_name}
                          </option>
                        </>
                      ))}
                  </select>
                </label>


                : <></>}
              <label className="">
                Course ID:
                <input
                  className="ml-3 w-40 max-[850px]:ml-2"
                  type="text"
                  name="Lname"
                  placeholder="Course ID"
                  id={'text'}
                  value={course_id}
                  onChange={(e) => {
                    setCourseId(e.target.value);
                  }}
                ></input>
              </label>


              

              
              <div className="flex flex-col min-[850px]:flex-row gap-4 min-[850px]:col-start-2 min-[1100px]:col-start-3 h-10 max-[850px]:mb-16">
                <button
                  className="primary-button btnCol text-white w-60 hover:text-white hover:font-bold"
                  type="button"
                  onClick={handleAttendance}
                >
                  Search
                </button>
                <button
                  className="primary-button btnCol text-white  w-60 hover:text-white hover:font-bold"
                  type="button"
                  onClick={handleShowAll}
                >
                  Show All
                </button>
              </div>

            </div>
            <AttendanceList users={users} setUsers={setUsers} />
          </form>
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
AttendanceById.auth = true;
AttendanceById.adminOnly = true;
