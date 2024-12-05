import Head from 'next/head';
// import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import { appIsWaiting } from '../../redux/slices/appSlice';

import TeachersCourseList from '../../components/Dashboard/TeachersCourseList';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import axios from 'axios';

// import CustomSelectBox from "./customSelectBox";
export default function TeacherCourse() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);

  const router = useRouter();
  const redirect = () => {
    router.push('/AccessDenied');
  };
  const [teacher_id, setTeacherId] = useState('');
  const [teacher_firstname, setTeacherFirstName] = useState('');
  const [teacher_lastname, setTeacherLastName] = useState('');
  const [course_id, setCourseid] = useState('');
  const [course_name, setCourseName] = useState('');

  // console.log(session)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          teacherId: '',
          courseId: '',
          teacher_firstname: '',
          teacher_lastname: '',
          course_name: '',
          major_id: session.user.majorid,
        };
        const result = await axios.post(
          '/api/pmApi/filterTeacherCourse',
          payload
        );
        // // console.log(result.data.data)
        setUsers(result.data.data);
      } catch (error) {
        return error;
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowAll = async () => {
    try {
      const payload = {
        teacherId: '',
        courseId: '',
        teacher_firstname: '',
        teacher_lastname: '',
        course_name: '',
        major_id: session.user.majorid,
      };
      const result = await axios.post(
        '/api/pmApi/filterTeacherCourse',
        payload
      );
      setUsers(result.data.data);
      setTeacherId('');
      setCourseName('');
      setCourseid('');
      setTeacherFirstName('');
      setTeacherLastName('');
    } catch (error) {

      return error;
    }
  };

  const handleSearch = async () => {
    try {
      const payload = {
        teacherId: teacher_id,
        courseId: course_id,
        teacher_firstname: teacher_firstname,
        teacher_lastname: teacher_lastname,
        course_name: course_name,
        major_id: session.user.majorid,
      };
      const result = await axios.post(
        '/api/pmApi/filterTeacherCourse',
        payload
      );
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
        <title>SIS Admin - assigned</title>
      </Head>
      {session?.user.role === '2' || session?.user.role === '3' ? (
        <>
          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">Assign</p>
          <form>
            <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">

              <label>
                First Name:
                <input
                  className="ml-1 w-40 max-[850px]:ml-1"
                  type="text"
                  value={teacher_firstname}
                  onChange={(e) => {
                    setTeacherFirstName(e.target.value);
                  }}
                  placeholder="Select Name"
                // value={formData.Fname}
                // onChange={handleChange}
                ></input>
              </label>
              <label className='invisible max-[850px]:visible max-[850px]:hidden'>
                First Name:
                <input
                  className="ml-2 w-10 invisible max-[850px]:visible max-[850px]:hidden"
                  type="text"
                  value={teacher_firstname}
                  onChange={(e) => {
                    setTeacherFirstName(e.target.value);
                  }}
                  placeholder="Select Name"
                // value={formData.Fname}
                // onChange={handleChange}
                ></input>
              </label>


              <label>
                Last Name:
                <input
                  className="ml-1 w-40 max-[850px]:ml-1"
                  type="text"
                  name="teacher_id"
                  placeholder="Teacher LastName"
                  id={'teacherId'}
                  value={teacher_lastname}
                  onChange={(e) => {
                    setTeacherLastName(e.target.value);
                  }}
                // value={formData.Lname}
                // onChange={handleChange}
                ></input>
              </label>


              {/* </div>
        <div className="grid lg:grid-cols-3 min-[100px]:gap-4 mb-3"> */}
              <label className="invisible max-[850px]:visible max-[850px]:hidden">
                Major:
                {/* Start select box */}
                <input
                  className="ml-12 invisible max-[850px]:visible max-[850px]:hidden w-40 max-[850px]:ml-10"
                  // options={major}
                  placeholder="Select Major"

                  styled={
                    'font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-40 inline-block ml-10'
                  }
                />
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
              {/* </div>
        <div className="grid lg:grid-cols-3 min-[100px]:gap-4 mb-3 pb-4  border-blue-300 border-b-2"> */}

              <label>
                
                Course ID:
                <input
                  className="ml-4 w-40 max-[850px]:ml-4 "
                  type="text"
                  name="courseId"
                  placeholder="Course ID"
                  id={'courseId'}
                  value={course_id}
                  onChange={(e) => {
                    setCourseid(e.target.value);
                  }} />
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
                  className="primary-button btnCol text-white w-60 hover:text-white hover:font-bold"
                  type="button"
                  onClick={handleSearch}
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
            <TeachersCourseList users={users} setUsers={setUsers} />
          </form>

        </>
      ) : (
        redirect()
      )}
    </>
  );
}
TeacherCourse.auth = true;
TeacherCourse.adminOnly = true;
