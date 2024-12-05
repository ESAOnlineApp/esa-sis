import React from 'react';
import { useState, useEffect } from 'react';
import CustomSelectBox from '../customSelectBox';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import AttendanceModal from '../ModalForm/AttendanceModal';
import { useRouter } from 'next/router';
export default function CreateAttendance() {
  const [promotionValue, setPromotionValue] = useState('');
  const [formErrors, setFormErrors] = useState({});
  // const [test, setTest] = useState()
  const [coursesValue, setCoursesValue] = useState('');
  const [teacherValue, setTeachersValue] = useState('');
  const [promotionName, setPromotionName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [teachersName, setTeachersName] = useState('');
  // const [teachersLastName, setTeachersLastName] = useState('')
  // const componentRef = useRef();
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [data, setData] = useState('');
  const { data: session } = useSession();
  const [allpromotion, setAllPromotions] = useState([]);
  const [promotion, setPromotions] = useState([]);
  const [allcourses, setAllCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [allteachers, setAllTeachers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [student, setStudent] = useState([]);
  const [isModal, setIsModal] = useState(false);
  // const [error, setError] = useState(false)
  // const [message, setMessage] = useState('')
  const [course_type, setCourseType] = useState([]);
  // // console.log("selectedddd", selectedDate)
  const router = useRouter();
  const redirect = () => {
    router.push('/AccessDenied');
  };

  useEffect(() => {
    const getAllPromotion = async () => {
      try {
        let table = 'promotions';
        let Where = 'major_id';
        let id = session.user.majorid;
        let { data } = await axios.post('/api/pmApi/getAllCourses', {
          table,
          Where,
          id,
        });
        // console.log("promotion", data.data)
        setAllPromotions(data.data);

        const datesArray = [];
        data.data.forEach((promotions) => {
          datesArray.push(promotions.promotion_name);
        });

        setPromotions(datesArray);
        // // console.log(promotion, 'before')
        // setMessage(data.data.message)
      } catch (error) {
        return error;
        // setMessage(error)
        // return error
      }
    };
    getAllPromotion();

    const getCourses = async () => {
      try {
        let table = 'courses';
        let Where = 'major_id';
        let id = session.user.majorid;
        let { data } = await axios.post('/api/pmApi/getAllCourses', {
          table,
          Where,
          id,
        });
        // console.log("course", data.data)
        setAllCourses(data.data);
        // setMessage(data.data.message)

        const datesArray = [];
        data.data.forEach((courses) => {
          datesArray.push(courses.course_name);
        });

        setCourses(datesArray);
      } catch (error) {
        return error;
      }
    };
    getCourses();

    const handleTeacher = async () => {
      try {
        let major_id = session.user.majorid;
        // let course_id = coursesValue ;
        const { data } = await axios.post(
          '/api/pmApi/getTeachersByMajorCourse',
          { major_id }
        );
        setAllTeachers(data.data);
        // // console.log("teacher",data.data.teacher_fullname)

        // setMessage(data.data.message)
        const datesArray = [];
        data.data.forEach((teachers) => {
          datesArray.push(teachers.teacher_fullname);
        });
        setTeachers(datesArray);
      } catch (error) {
        return error;
      }
    };
    handleTeacher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [null]);
  // // console.log('promotion', promotionValue)

  const handlePromotion = (selectedValue) => {
    // Do something with the selected value
    // // console.log("Selected Value:", selectedValue);

    if (selectedValue.trim() !== '') {
      let promotionID = allpromotion.filter(
        (promotion) => promotion.promotion_name === selectedValue
      );
      // console.log(promotionID[0].promotion_id)
      setPromotionValue(promotionID[0].promotion_id);
      setPromotionName(promotionID[0].promotion_name);
    } else {
      setPromotionValue('');
    }
  };

  const handleCourses = (selectedValue) => {
    // Do something with the selected value
    // // console.log("Selected Value:", selectedValue);
    // if (test) {
    //     selectedValue == ''
    // }
    if (selectedValue.trim() !== '') {
      let coursesID = allcourses.filter(
        (courses) => courses.course_name === selectedValue
      );

      setCoursesValue(coursesID[0].course_id);

      setCourseName(coursesID[0].course_name);
      setCourseType(coursesID[0].course_type);
    } else {
      setCoursesValue('');
    }
    // if (test == true) {
    //     selectedValue === ' '
    // }
  };

  const handleTeachers = (selectedValue) => {
    // Do something with the selected value
    // console.log("Selected Value:", selectedValue);
    // if (test) {
    //     selectedValue == ''
    // }
    if (selectedValue.trim() !== '') {
      let teachersFullname = allteachers.filter(
        (teachers) => teachers.teacher_fullname === selectedValue
      );
      // console.log("select", teachersFullname[0].teacher_id)

      setTeachersValue(teachersFullname[0].teacher_id);
      setTeachersName(teachersFullname[0].teacher_fullname);
    } else {
      setTeachersValue('');
    }
    // if (test == true) {
    //     selectedValue === ' '
    // }
  };

  const getStudent = async () => {
    try {
      const errors = {};
      // const currentDate = new Date()
      if (teacherValue.length === 0) {
        errors.teachers = 'At least one Teacher must be selected.';
      }
      if (coursesValue.length === 0) {
        errors.courses = 'At least one course must be selected.';
      }
      if (promotionValue.length === 0) {
        errors.promotion = 'At least one promotion must be selected.';
      }

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      } else {
        if (course_type !== 'Elective') {
          setIsModal(true);
          let major_id = session.user.majorid;
          let promotion = promotionName.replace(/\s/g, '');
          // let promotion = promotionName
          const { data } = await axios.post('/api/pmApi/getAllStudent', {
            major_id,
            promotion,
          });
          // // console.log(data.data)
          // // console.log(data.data)
          setStudent(data.data);
        } else {
          try {
            const payload = {
              promotion: promotionName.replace(/\s/g, ''),
              major_id: session.user.majorid,
              course_id: coursesValue,
            };
            // console.log('payload', payload)

            const data = await axios.post(
              '/api/pmApi/getStudentAssign',
              payload
            );
            setIsModal(true);
            setStudent(data.data.data);
          } catch (error) {
            // console.log('wssll')
            setIsModal(true);
            let major_id = session.user.majorid;
            let promotion = promotionName.replace(/\s/g, '');
            // let promotion = promotionName
            // console.log('promotion', promotion)
            const { data } = await axios.post('/api/pmApi/getAllStudent', {
              major_id,
              promotion,
            });
            // // console.log(data.data)

            // // console.log(data.data)
            setIsModal(true);
            setStudent(data.data);
          }
        }
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      {session?.user.role === '2' || session?.user.role === '3' ? (
        <>
          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
            Create Attendance
          </p>
          <form className="flex flex-col justify-between flex-wrap">
            <div className="flex flex-col  mb-3 pb-4 border-blue-300 border-b-2 max-sm:flex">
              <form>
                <div className="flex flex-row justify-between p-5 flex-wrap">
                  <div className="ml-8">
                    <label>promotion:</label>
                    <CustomSelectBox
                      options={promotion}
                      placeholder="Select Promotion"
                      onSelect={handlePromotion}
                      styled={
                        'font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-60 inline-block ml-8'
                      }
                    />
                    {formErrors.promotion && (
                      <div className="text-center text-red-500 font-bold p-2">
                        {formErrors.promotion}
                      </div>
                    )}
                  </div>
                  <div>
                    <label>Course Name:</label>
                    <CustomSelectBox
                      options={courses}
                      placeholder="Select Courses"
                      onSelect={handleCourses}
                      styled={
                        'font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-60 inline-block ml-5'
                      }
                    />
                    {formErrors.courses && (
                      <div className="text-center text-red-500 font-bold p-2">
                        {formErrors.courses}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row justify-between p-5 flex-wrap">
                  <div>
                    <label>Teacher FullName:</label>

                    {
                      <CustomSelectBox
                        options={teachers}
                        placeholder="Select Teacher"
                        onSelect={handleTeachers}
                        styled={
                          'font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-60 inline-block ml-5'
                        }
                      />
                    }
                    {formErrors.teachers && (
                      <div className="text-center text-red-500 font-bold p-2">
                        {formErrors.teachers}
                      </div>
                    )}
                  </div>
                  <div>
                    <label>Date:</label>
                    <input
                      type="date"
                      className="font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-60 inline-block ml-5"
                      value={selectedDate.toISOString().substring(0, 10)}
                      onChange={(e) =>
                        setSelectedDate(new Date(e.target.value))
                      }
                    />
                  </div>
                </div>
              </form>

              <div className="flex flex-row justify-end ml-7 min-[850px]:flex-row gap-4">
                <button
                  className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold"
                  type="button"
                  onClick={() => getStudent()}
                >
                  Create Attendance
                </button>
              </div>
            </div>
            {isModal && (
              <AttendanceModal
                setIsModal={setIsModal}
                student={student}
                selectedDate={selectedDate}
                promotionName={promotionName}
                teachersName={teachersName}
                courseName={courseName}
                session={session}
                teacherValue={teacherValue}
                coursesValue={coursesValue}
              />
            )}
          </form>
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
CreateAttendance.auth = true;
CreateAttendance.adminOnly = true;
