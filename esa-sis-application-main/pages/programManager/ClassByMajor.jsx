import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import AddClass from '../../components/addClass';
import ClassListById from '../../components/Dashboard/ClassListById';
import CopyClass from '../../components/CopyClass';
// import moment from 'moment';
// import Link from 'next/link';

export default function ClassByMajor() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  // const [promotionValue, setPromotionValue] = useState('');
  const [promotion, setPromotion] = useState([]);
  const [courseValue, setCourseValue] = useState('');
  const [majorValue, setMajorValue] = useState('');
  const [courses, setCourses] = useState([]);
  const [allCourse, setAllCourse] = useState([]);
  const [coursesCopy, setCoursesCopy] = useState([]);

  const [promotionValueClass, setPromotionValueClass] = useState('');
  // const [promotionClass, setPromotionClass] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCopy, setOpenCopy] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [teacherValue, setTeacherValue] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [allTeacher, setAllTeacher] = useState([]);
  const [error, setError] = useState('');
  const [errorCourse, setErrorCourse] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [teacherList, setTeacherList] = useState([]);
  const [errorTeacher, setErrorTeacher] = useState('');
  const [errorPromotion, setErrorPromotion] = useState('');
  const [errorStart, setErrorStart] = useState('');
  const [errorEnd, setErrorEnd] = useState('');
  const [searchCourse, setSearchCourse] = useState('');
  const [classes, setClasses] = useState([]);


  const handleCancel = () => {
    setOpen(false);
    setErrorEnd('');
    setErrorStart('');
    setErrorCourse('');
    setErrorPromotion('');
    setErrorTeacher('');
    // setPromotionValue('');
    setCourseValue('');
    setTeacherValue('');
    setDateFrom('');
    setDateTo('');
  };
  // const clientId = '42910b5b-82de-425f-81fd-fbfc51089a4a@f64c300e-4a43-49ab-8bc9-471ab9b9544e';
  // const clientSecret = '5LXGHVnrQYtOVdJV5yt9lpv20TgYYxQ3KVVgCYdkDGE=';
  // const tenantId = 'f64c300e-4a43-49ab-8bc9-471ab9b9544e';
  // const resource = 'https://esalb.sharepoint.com'; // SharePoint API endpoint

  // // Your client-side code
  // const getSharePointToken = async () => {
  //   try {
  //     const response = await fetch('/api/pmApi/getsharePointToken', {
  //       method: 'POST',
  //       headers: {
  //         'Accept':'application/json;odata=verbose',
  //         'Content-Type':'application/json;odata=verbose',
  //       },
  //       body: JSON.stringify({
  //         clientId: `${clientId}`,
  //         clientSecret: `${clientSecret}`,
  //         tenantId: `${tenantId}`,
  //         resource: `${resource}`,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (!data.access_token) {
  //       throw new Error('Access token not obtained');
  //     }

  //     return data.access_token;
  //   } catch (error) {
  //     console.error('Error obtaining SharePoint access token:', error.message);
  //     throw error;
  //   }
  // };



  // const getRoomBooking = async () => {
  //   try {
  //     const accessToken = await getSharePointToken();

  //     const apiUrl = `https://esalb.sharepoint.com/sites/test2/_api/web/lists/getbytitle('BookingRoom')/items`;

  //     const response = await fetch(apiUrl, {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json;odata=verbose',
  //         'Content-Type': 'application/json;odata=verbose',
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     const data = await response.json();
  //     if (data.d.results.length > 0) {
  //       for (const booking of data.d.results) {
  //         // Format the date to 'YYYY-MM-DDT00:00:00Z'
  //         const formattedDate = moment(booking.Date).format('YYYY-MM-DDT00:00:00[Z]');

  //         // Make the API call
  //         const result = await axios.post('/api/pmApi/createBooking', {
  //           bookingId: booking.ID,
  //           room: booking.Title,
  //           space: booking.Space,
  //           bookingBy: booking.BookingBy,
  //           date: formattedDate,
  //           fromTime: booking.FromTime,
  //           toTime: booking.ToTime,
  //         });
  //         console.log(result);
  //       }
  //     }

  //     return { ok: true, result: data };

  //   } catch (error) {
  //     console.error('Error checking room availability in SharePoint:', error.message);
  //     // Assuming an error means the room is not available
  //     return { ok: false, result: false };
  //   }
  // };

  // useEffect(() => {
  //   getRoomBooking();
  // }, []);



  // useEffect(()=>{
  //   getRoomBooking()
  // },[])

  // const handleCancelCopy = () => {
  //   setOpenCopy(false)
  //   setPromotionValue('');
  //   setCourseValue('');
  //   setTeacherValue('');
  // }

  const handleSave = async () => {
    // console.log('save')
    try {
      if (courseValue.length === 0) {
        setErrorCourse('Select At least one Course');
      }
      if (teacherValue.length === 0) {
        setErrorTeacher('Select At least one Teacher');
      }
      if (promotionValueClass.length === 0) {
        setErrorPromotion('Select At least one Promotion ');
      }
      if (dateFrom === '') {
        setErrorStart('Please Fill The Start Date');
      }
      if (dateTo === '') {
        setErrorEnd('Please Fill The End Date');
      }
      const payload = {
        major_id: majorId,
        teachers_fullname: teacherValue,
        teacher_id: teacherValue,
        course_id: courseValue, // Retrieve the value property of the selected course === courseID
        course_name: courseValue, // Retrieve the label property of the selected course === courseName
      };
      await axios.post('/api/pmApi/asigendTeacher', payload);

      let classValue = {
        course_id: courseValue,
        teacher_id: teacherValue,
        promotion: promotionValueClass.replace(/\s/g, ''),
        startdate: dateFrom,
        enddate: dateTo,
        pm_id: session.user.userid,
        major_id: majorValue,
      };

      // console.log("payload", payload)

      let { data } = await axios.post('/api/pmApi/createClass', classValue);
      // console.log(data)
      if (data.success) {
        setOpen(false);
        // setPromotionValue('');
        setCourseValue('');
        setMajorValue('');
        setTeacherValue('');
        setDateFrom('');
        setDateTo('');
        getClasses();
      } else {
        alert('Error creating class');
      }

      // setOpen(false)
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveCopy = () => {
    let createClass = async () => {
      try {
        let classValue = {
          course_id: courseValue,
          teacher_id: teacherValue,
          promotion: promotionValueClass,
          startdate: dateFrom,
          enddate: dateTo,
          pm_id: session.user.userid,
          major_id: majorValue,
        };
        let { data } = await axios.post('/api/pmApi/createClass', classValue);
        // console.log(data)
        if (data.success) {
          setOpen(false);
          // setPromotionValue('');
          setCourseValue('');
          setMajorValue('');
          setTeacherValue('');
          setDateFrom('');
          setDateTo('');
          getClasses();
        } else {
          alert('Error creating class');
        }
        // setOpen(false)
      } catch (err) {
        // console.log(err)
      }
    };
    courseValue.length === 0
      ? setError('Please choose course')
      : teacherValue.length === 0
        ? setError('Please choose teacher')
        : promotionValueClass.length === 0
          ? setError('Please choose promotion')
          : (setError(''), createClass());
  };

  const handleDateFromChange = (event) => {
    const selectedDate = event.target.value;

    // console.log(selectedDate);
    if (dateTo.length > 0 && selectedDate > dateTo) {
      alert('The start date is greater than end date');
    } else if (dateTo.length > 0 && selectedDate === dateTo) {
      alert('The date from and to are equal');
    } else {
      // console.log(new Date(selectedDate))
      setDateFrom(selectedDate);
    }
  };

  const handleDateToChange = (event) => {
    const selectedDate = event.target.value;

    // console.log(selectedDate);
    if (dateFrom.length > 0 && selectedDate < dateFrom) {
      alert('The end date is less than start date');
    } else if (dateFrom.length > 0 && selectedDate === dateFrom) {
      alert('The date from and to are equal');
    } else {
      setDateTo(selectedDate);
    }
  };

  const fetchClass = async () => {
    try {
      const payload = {
        table: 'tmpclass',
        Where: 'major_id',
        id: majorId,
      };
      const data = await axios.post('/api/pmApi/getAllCourses', payload);
      setClasses(data.data.data);
    } catch (error) {
      return error;
    }
  };


  const router = useRouter();

  const redirect = () => {
    router.push('/AccessDenied');
  };

  const { majorId } = router.query;

  useEffect(() => {
    fetchClass();
    handleShowAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handlePromotion = (selectedValue) => {
  //   // Do something with the selected value
  //   // console.log("Selected Value:", selectedValue);
  //   setPromotionValue(selectedValue)
  // };

  const handlePromotionClass = (selectedValue) => {
    // Do something with the selected value
    // console.log("Selected Value:", selectedValue);
    setPromotionValueClass(selectedValue);
  };

  const handleCourse = (selectedValue) => {
    // Do something with the selected value
    // console.log("Selected Value:",selectedValue.length > 0 ? allCourse.filter(course => course.course_name === selectedValue)[0].course_id : '');
    // setCourseValue(selectedValue)
    if (selectedValue.trim() !== '') {
      setCourseValue(
        selectedValue.length > 0
          ? allCourse.filter(
            (course) => course.course_name === selectedValue
          )[0].course_id
          : ''
      );
    }
    setMajorValue(
      selectedValue.length > 0
        ? allCourse.filter((course) => course.course_name === selectedValue)[0]
          .major_id
        : ''
    );
  };

  // const handleCourseCopy = (selectedValue) => {
  //   setTeacherValue(allTeacher.filter(teach => teach.teacher_id === users.filter(user => user.course_id == selectedValue)[0].teacher_id)[0].teacher_firstname)

  //   // console.log("teacherValue  ==  ", teacherValue)
  //   // console.log(selectedValue)
  //   // console.log(coursesCopy)
  //   // console.log(users)
  //   // console.log(users.filter(user => user.course_id == selectedValue)[0].teacher_id)

  //   // console.log(users.filter(user => user.course_id == selectedValue)[0].promotion)

  //   // console.log(
  //     allTeacher.filter(teach => teach.teacher_id === users.filter(user => user.course_id == selectedValue)[0].teacher_id)[0].teacher_firstname
  //     )
  // }
  const handleTeacher = (selectedValue) => {
    // Do something with the selected value
    // // console.log("Selected Value:", allTeacher.filter(teacher => `${teacher.teacher_firstname} ${teacher.teacher_lastname}` === selectedValue)[0].course_id);
    // console.log('select teacher: ',selectedValue.length > 0 ?selectedValue.split(' ')[0] : '')
    if (selectedValue.trim() !== '') {
      setTeacherValue(
        selectedValue.length > 0 ? selectedValue.split(' ')[0] : ''
      );
    }
    // setCourseValue(allCourse.filter(course => course.course_name === selectedValue)[0].course_id)
  };

  const handleShowAll = async () => {
    setSearchCourse(' ');
    // console.log('hello')
    getClasses();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setUsers(
      users.filter((course) =>
        course.course_id.toLowerCase().includes(searchCourse.toLowerCase())
      )
    );
  };
  const getClasses = async () => {
    try {
      let val = majorId;
      let { data } = await axios.post('/api/pmApi/getuserteacher', {
        pmID: val,
      });

      // const datesArray = [];
      // data.rows.forEach((clas) => {
      //   datesArray.push(clas.tmpclass_id);
      // });

      // console.log('users Classes are the following : ',data.rows)
      setUsers(data.rows);

      setCoursesCopy(data.rows.map((cours) => cours.course_id));
      // console.log("CoursesCopy  : ", data.rows.map(cours => cours.course_id))
    } catch (err) {
      // console.log(err)
    }
  };
  useEffect(() => {
    getClasses();
    const getPromotion = async () => {
      try {
        let table = 'promotions';
        let Where = 'major_id';
        let id = majorId;
        let { data } = await axios.post('/api/pmApi/getAllCourses', {
          table,
          Where,
          id,
        });

        const datesArray = [];
        data.data.forEach((prom) => {
          datesArray.push(prom.promotion_name);
        });

        setPromotion(datesArray);
        // setPromotionClass(datesArray)
      } catch (err) {
        // console.log(err)
      }
    };
    getPromotion();

    const getCourse = async () => {
      try {
        let table = 'courses';
        let Where = 'major_id';
        let id = majorId;
        let { data } = await axios.post('/api/pmApi/getAllCourses', {
          table,
          Where,
          id,
        });
        // console.log('dataaaaaaaaaaaaa', data.data);
        // console.log('allCourse', allCourse);
        setAllCourse(data.data);
        // console.log('allCourse', allCourse);
        const datesArray = [];
        data.data.forEach((course) => {
          datesArray.push(course.course_name);
        });

        setCourses(datesArray);
        // console.log("courses  : ",datesArray)
      } catch (err) {
        // console.log(err)
      }
    };
    getCourse();

    const getTeacher = async () => {
      try {
        let table = 'teachers';
        let { data } = await axios.post('/api/pmApi/getAll', { table });

        setAllTeacher(data.rows);
        const datesArray = [];
        data.rows.forEach((teacher) => {
          datesArray.push(
            `${teacher.teacher_id} ${teacher.teacher_firstname} ${teacher.teacher_lastname}`
          );
        });
        setTeachers(datesArray);
      } catch (err) {
        // console.log(err)
      }
    };
    getTeacher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClass = () => {
    setOpen(true);
  };

  const handleCopyClass = () => {
    setOpenCopy(true);
  };

  //>>>>>>> main
  return (
    <>
      <Head>
        <title>SIS Admin - Schedule</title>
      </Head>
      {session?.user.role === '2' || session?.user.role === '3' ? (
        <>
          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
            List Of Classes
          </p>
          {open && (
            <AddClass
              promotion={promotion}
              handlePromotionClass={handlePromotionClass}
              setOpen={setOpen}
              dateFrom={dateFrom}
              handleDateFromChange={handleDateFromChange}
              dateTo={dateTo}
              errorCourse={errorCourse}
              errorTeacher={errorTeacher}
              handleDateToChange={handleDateToChange}
              errorPromotion={errorPromotion}
              courses={courses}
              teacherList={teacherList}
              errorStart={errorStart}
              errorEnd={errorEnd}
              courseValue={courseValue}
              teacherValue={teacherValue}
              handleCourse={handleCourse}
              teachers={teachers}
              handleTeacher={handleTeacher}
              handleCancel={handleCancel}
              handleSave={handleSave}
              error={error}
            />
          )}

          {openCopy && (
            <CopyClass
              promotion={promotion}
              setOpen={setOpenCopy}
              courses={coursesCopy}
              teachers={teachers}
              handleSave={handleSaveCopy}
              error={error}
              users={users}
              allTeacher={allTeacher}
              setOpenCopy={setOpenCopy}
              getClasses={getClasses}
            />
          )}
          <form>
            <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
              <label>
                Class:
                <select
                  className="ml-9 w-40"
                  value={searchCourse}
                  onChange={(e) => setSearchCourse(e.target.value)}
                >
                  <option value=" ">class</option>
                  <>
                    <>
                      {classes.length > 0 ? (
                        classes.map((item, index) => (
                          <option key={index} value={item.course_id}>
                            {item.course_id}
                          </option>
                        ))
                      ) : (
                        <option value={' '}>NO Courses</option>
                      )}
                    </>
                  </>
                </select>
              </label>

              <div className="flex flex-col min-[850px]:flex-row gap-4 min-[850px]:col-start-2 min-[1100px]:col-start-3 h-10 max-[850px]:mb-16">
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
              <div className="flex flex-col  min-[850px]:flex-row gap-4 min-[850px]:col-start-2 min-[1100px]:col-start-3 max-[850px]:mb-16">
                <button
                  className="py-1 px-2 primary-button hover:text-white w-60 bg-green-600  hover:font-bold"
                  type="button"
                  onClick={handleClass}
                >
                  Add Class
                </button>

                <button
                  className="py-1 px-2 primary-button w-60 bg-green-600 hover:text-white hover:font-bold"
                  type="button"
                  onClick={handleCopyClass}
                >
                  Copy Schedule
                </button>
              </div>


            </div>
            <ClassListById users={users} setUsers={setUsers} allCourse={allCourse} />
          </form>
        </>
      ) : (
        redirect()

      )}
    </>
  );
}
ClassByMajor.auth = true;
ClassByMajor.adminOnly = true;
