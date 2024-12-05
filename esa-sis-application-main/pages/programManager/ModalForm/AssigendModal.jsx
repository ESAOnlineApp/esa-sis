import React, { useEffect, useState } from 'react';
import { BsX } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Select from 'react-select';
// import selection_data from '../../../utilities/selection_data';
// import { getSession } from 'next-auth/react';

export default function AssigendModal({ setOpenModal, setUsers, users }) {
  const [coursesValue, setCoursesValue] = useState([]);
  const [teacherValue, setTeachersValue] = useState([]);
  const [teacherValueC, setTeachersValueC] = useState([]);
  const { data: session } = useSession();
  const [allcourses, setAllCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [allteachers, setAllTeachers] = useState([]);
  // const [teachers, setTeachers] = useState([]);
  const [message, setMessage] = useState('');
  const [teachersName, setTeachersName] = useState('');
  const [teachersNameC, setTeachersNameC] = useState('');
  // const [test, setTest] = useState()
  const [formErrors, setFormErrors] = useState({});
  const [isReplace, setIsReplace] = useState(false);
  const [newAssign, setNewAssign] = useState(false);
  const [multiAssign, setMultiAssign] = useState(false);
  const [teacherCourses, setTeacherCourses] = useState([]);
  // const [teacherCourse, setTeacherCourse] = useState([])
  const [teacherFrom, setTeacherFrom] = useState('');
  const [teacherFromValue, setTeacherFromValue] = useState('');
  const [isSelected, setSelected] = useState(false);

  // setTimeout(() => {
  //   setMessage('');
  // },10000);

  useEffect(() => {
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
        // // console.log("course", data.data);
        setAllCourses(data.data);
        setMessage(data.data.message);

        const datesArray = data.data.map((course) => course.course_name);
        setCourses(datesArray);
      } catch (error) {
        return error;
      }
    };

    getCourses();

    const handleTeacher = async () => {
      try {
        // let major_id = session.user.majorid;
        const { data } = await axios.post(
          '/api/pmApi/getTeachersByMajorCourse'
        );
        setAllTeachers(data.data);
        setMessage(data.data.message);

        data.data.map((teacher) => teacher.teacher_fullname);
        // setTeachers(datesArray);
      } catch (error) {
        return error;
      }
    };

    handleTeacher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);
  useEffect(() => {
    const getTeacherCourses = async () => {
      try {
        const course_id = coursesValue;
        if (course_id) {
          let { data } = await axios.post('/api/pmApi/courseTeacher', {
            course_id,
          });
          // console.log("course", data.data);
          setTeacherCourses(data.data);
          setMessage(data.data.message);

          data.data.map((teacher) => teacher.teacher_fullname);
        }
      } catch (error) {
        return error;
      }
    };
    getTeacherCourses();
  }, [coursesValue]);

  const handleCourses = (selectedOptions) => {
    const selectedCourseIds = selectedOptions.map((option) => option.value);
    const selectedName = selectedOptions.map((option) => option.label);
    setCourses(selectedName);
    setCoursesValue(selectedCourseIds);
    setSelected(true);
  };

  const handleTeachers = (selectedValues) => {
    const selectedTeacherIds = selectedValues.map((value) => value.value);
    const selectedTeacherNames = selectedValues.map((value) => value.label);
    setTeachersValue(selectedTeacherIds);
    setTeachersName(selectedTeacherNames);
  };

  const handleTeacher = (selectedValues) => {
    const selectedTeacherIds = selectedValues.map((value) => value.value);
    const selectedTeacherNames = selectedValues.map((value) => value.label);
    setTeachersValueC(selectedTeacherIds);
    setTeachersNameC(selectedTeacherNames);
  };
  const handleTeacherCourse = (selectedValues) => {
    const selectedTeacherIds = selectedValues.map((value) => value.value);
    const selectedTeacherNames = selectedValues.map((value) => value.label);
    setTeacherFromValue(selectedTeacherIds);
    setTeacherFrom(selectedTeacherNames);
  };

  const handleAdd = async () => {
    try {
      const errors = {};
      if (teachersName.length === 0) {
        errors.teachersName = 'At least one teacher must be selected';
      }
      if (coursesValue.length === 0) {
        errors.courses = 'At least one course must be selected.';
      }
      if (teachersName.length > 1 && coursesValue.length > 1) {
        errors.courses = 'Can not select multiple course to multiple teachers';
      }
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      for (let j = 0; j < teacherValue.length; j++) {
        for (let i = 0; i < coursesValue.length; i++) {
          const payload = {
            major_id: session.user.majorid,
            teachers_fullname: teachersName[j],
            teacher_id: teacherValue[j],
            course_id: coursesValue[i], // Retrieve the value property of the selected course === courseID
            course_name: courses[i], // Retrieve the label property of the selected course === courseName
          };

          // // console.log("payload", payload)
          const { data } = await axios.post(
            '/api/pmApi/asigendTeacher',
            payload
          );
          // // console.log('data', data.message)

          const newRows = {
            teacher_courses_id: data.data[0].teacher_courses_id,
            teacher_id: teacherValue[j],
            course_id: coursesValue[i], // Retrieve the value property of the selected course
            course_name: courses[i], // Retrieve the label property of the selected course
            major_id: session.user.majorid,
            teacher_firstname: teachersName[j].split(' ')[0],
            teacher_lastname: teachersName[j].split(' ')[1],
          };
          // // console.log('newRow' ,  newRows )
          setMessage('Assign Successfully!');

          setUsers((prevUsers) => [...prevUsers, newRows]);
          // // console.log('message',message)
        }
      }
    } catch (error) {
      return error;
    }
  };

  const handleAddMultiple = async () => {
    try {
      const errors = {};
      if (teachersName.length === 0) {
        errors.teachersName = 'At least one teacher must be selected';
      }
      if (coursesValue.length === 0) {
        errors.courses = 'At least one course must be selected.';
      }
      if (coursesValue.length > teachersName.length) {
        errors.courses =
          'The number of courses selected must be equal to teachers';
      }
      if (teachersName.length > coursesValue.length) {
        errors.teachersName =
          'The number of teachers selected must be equal to courses';
      }
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      for (let i = 0; i < coursesValue.length; i++) {
        const payload = {
          major_id: session.user.majorid,
          teachers_fullname: teachersName[i],
          teacher_id: teacherValue[i],
          course_id: coursesValue[i], // Retrieve the value property of the selected course === courseID
          course_name: courses[i], // Retrieve the label property of the selected course === courseName
        };

        // // console.log("payload", payload)
        const { data } = await axios.post('/api/pmApi/asigendTeacher', payload);
        // // console.log('data', data.message)

        const newRows = {
          teacher_courses_id: data.data[0].teacher_courses_id,
          teacher_id: teacherValue[i],
          course_id: coursesValue[i], // Retrieve the value property of the selected course
          course_name: courses[i], // Retrieve the label property of the selected course
          major_id: session.user.majorid,
          teacher_firstname: teachersName[i].split(' ')[0],
          teacher_lastname: teachersName[i].split(' ')[1],
        };
        // // console.log('newRow' ,  newRows )

        setUsers((prevUsers) => [...prevUsers, newRows]);
        setMessage(data.message);
        // // console.log('message',message)
      }
    } catch (error) {
      return error;
    }
  };

  // const handleUpdate = async() =>{
  //   try {

  //      const major_id = session.user.majorid
  //       const teacher_nameC = teachersNameC[0]
  //       const teacher_name = teachersName[0]
  //       const teacher_idC = teacherValueC[0]
  //      const course_id = coursesValue[0]
  //       const teacher_id = teacherValue[0]

  //     const {data}  = await axios.put('/api/pmApi/ChangeAssigen',{
  //       major_id,
  //       teacher_name,
  //       teacher_nameC,
  //       teacher_id,
  //       course_id,
  //       teacher_idC

  //     })
  //     setMessage(data.message)
  //   } catch (error) {
  //      return error
  //   }
  // }

  // const handleTeachers = (selectedValue) => {
  //           // Do something with the selected value
  //           // console.log("Selected Value:", selectedValue);
  //           if (test) {
  //               selectedValue == ''
  //           }
  //           if (selectedValue.trim() !== '') {
  //               let teachersFullname = allteachers.filter(teachers => teachers.teacher_fullname === selectedValue);
  //               // console.log("select", teachersFullname[0].teacher_id)

  //               setTeachersValue(teachersFullname[0].teacher_id)
  //               setTeachersName(teachersFullname[0].teacher_fullname)

  //           }

  //           else {
  //               setTeachersValue("")

  //           }
  //           if (test == true) {
  //               selectedValue === ' '
  //           }
  //       };

  const handleUpdate = async () => {
    try {
      const errors = {};
      if (teacherFrom.length === 0) {
        errors.teacherFrom = 'At least one teacher must be selected';
      }
      if (teacherFrom.length > 1) {
        errors.teacherFrom = 'only one teacher can select';
      }
      if (teacherFrom.length > teachersNameC.length) {
        errors.teacherFrom = 'only one teacher can select';
      }
      if (teachersNameC.length > teacherFrom.length) {
        errors.teachersNameC = 'only one teacher can select';
      }
      if (teachersNameC.length === 0) {
        errors.teachersNameC = 'At least one teacher must be selected';
      }
      if (teachersNameC.length > 1) {
        errors.teachersNameC = 'only one teacher can select';
      }
      if (coursesValue.length === 0) {
        errors.courses = 'At least one course must be selected.';
      }
      if (coursesValue.length > 1) {
        errors.courses = 'only one course can be selected';
      }
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      const major_id = session.user.majorid;
      const teacher_nameC = teachersNameC[0];
      const teacher_name = teacherFrom[0];
      const teacher_idC = teacherValueC[0];
      const course_id = coursesValue[0];
      const teacher_id = teacherFromValue[0];

      const { data } = await axios.put('/api/pmApi/ChangeAssigen', {
        major_id,
        teacher_name,
        teacher_nameC,
        teacher_id,
        course_id,
        teacher_idC,
      });

      // // console.log("data" , data.data)
      setMessage(data.message);
      const updatedRow = {
        teacher_courses_id: data.data,
        teacher_id: teacher_idC,
        course_id,
        major_id,
        teacher_firstname: teacher_nameC.split(' ')[0],
        teacher_lastname: teacher_nameC.split(' ')[1],
        course_name: allcourses.find((course) => course.course_id === course_id)
          ?.course_name,
      };
      // // console.log(updatedRow)
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.teacher_courses_id === updatedRow.teacher_courses_id
            ? updatedRow
            : user
        )
      );
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <div className="justify-center items-center p-12 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-50 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col p-10 bg-white outline-none focus:outline-none">
            {/* <div className="flex items-start justify-between p-2">
            <h3 className="text-3xl font-semibold text-gray-700 text-3xl pt-5 mb-10 ">
                    Assigned Teacher To Course
                  </h3>
              <button
                className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={(e) => setOpenModal(false)}
              >
                <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <BsX className="text-gray-700" />
                </span>
              </button>

            </div> */}
            {!isReplace && !newAssign & !multiAssign ? (
              <div className="flex items-start justify-between p-5  rounded-t">
                <h3 className="text-3xl font-semibold text-gray-700 pt-5 mb-10">
                  Assigned Teacher To Course
                </h3>
                <button
                  className="text-3xl font-semibold text-gray-700 pt-5 mb-10"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  <span className="bg-transparent text-black font-bold h-6 w-6 text-2xl block outline-none focus:outline-none">
                    <BsX className=" text-gray-700 font-bold" />
                  </span>
                </button>
              </div>
            ) : (
              <></>
            )}
            {isReplace ? (
              <div className="flex items-start justify-between p-5 rounded-t">
                <h3 className="text-3xl font-semibold text-gray-700 pt-5 mb-10">
                  Replace Course Assign
                </h3>
                <button
                  className="text-3xl font-semibold text-gray-700 pt-5 mb-10"
                  onClick={() => {
                    setIsReplace(false), setFormErrors({}), setSelected(false);
                  }}
                >
                  <span className="bg-transparent text-black font-bold h-6 w-6 text-2xl block outline-none focus:outline-none">
                    <BsX className=" text-gray-700 font-bold" />
                  </span>
                </button>
              </div>
            ) : (
              <></>
            )}
            {newAssign ? (
              <div className="flex items-start justify-between p-5 rounded-t">
                <h3 className="text-3xl font-semibold text-gray-700 pt-5 mb-10">
                  Assign Teacher To Courses
                </h3>
                <button
                  className="text-3xl font-semibold text-gray-700 pt-5 mb-10"
                  onClick={() => {
                    setNewAssign(false), setFormErrors({}), setSelected(false);
                  }}
                >
                  <span className="bg-transparent text-black font-bold h-6 w-6 text-2xl block outline-none focus:outline-none">
                    <BsX className=" text-gray-700 font-bold" />
                  </span>
                </button>
              </div>
            ) : (
              <></>
            )}
            {multiAssign ? (
              <div className="flex items-start justify-between p-4 pb-0">
                <h3 className="text-3xl font-semibold text-gray-700 pt-5 mb-10">
                  Assign Teachers To Courses
                </h3>
                <button
                  className="text-3xl font-semibold text-gray-700 pt-5 mb-10"
                  onClick={() => {
                    setMultiAssign(false),
                      setFormErrors({}),
                      setSelected(false);
                  }}
                >
                  <span className="bg-transparent text-black font-bold h-6 w-6 text-2xl block outline-none focus:outline-none">
                    <BsX className=" text-gray-700 font-bold" />
                  </span>
                </button>
              </div>
            ) : (
              <></>
            )}

            <div className="relative flex-auto">
              {!isReplace && !newAssign && !multiAssign ? (
                <form>
                  <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-3 min-[1100px]:grid-cols-2 mb-3 pb-4 border-blue-300 border-b-2 justify-center">
                    <div className="flex flex-col min-[850px]:flex-row gap-4 justify-center  min-[850px]:justify-center">
                      <button
                        className="primary-button rounded w-60 btnCol text-white hover:text-white justify-center"
                        type="button"
                        onClick={() => setIsReplace(true)}
                      >
                        Replace Teachers
                      </button>
                    </div>
                    <div className="flex flex-col min-[850px]:flex-row gap-4 justify-center  min-[850px]:justify-center">
                      <button
                        className="primary-button rounded w-60 btnCol text-white hover:text-white justify-center"
                        type="button"
                        onClick={() => setNewAssign(true)}
                      >
                        New Assign
                      </button>
                    </div>
                    <div className="flex flex-col min-[850px]:flex-row gap-4 justify-center  min-[850px]:justify-center">
                      <button
                        className="primary-button rounded w-60 btnCol text-white hover:text-white justify-center"
                        type="button"
                        onClick={() => setMultiAssign(true)}
                      >
                        Assign Teachers To Courses
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <></>
              )}

              <div className="flex flex-col min-[850px]:flex-row gap-4 justify-center  min-[850px]:justify-center"></div>
            </div>
            {newAssign ? (
              <div className="relative flex-auto">
                {message && (
                  <div className="text-gray-500 font-bold p-2">{message}</div>
                )}
                <form className="flex items-center">
                  <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-3 min-[1100px]:grid-cols-2 mb-3 pb-4 border-blue-300 border-b-2 justify-center">
                    {/* <label className='text-gray-700 mr-12'>
                          Teacher Full Name:
                         { <CustomSelectBox
                          options={teachers}
                          placeholder="Select Teacher"
                          onSelect={handleTeachers}
                          styled={"font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-40 inline-block ml-10  mr-10"}
                          />}
                            {formErrors.teachersName && <div className='text-center text-red-500 font-bold p-2'>{formErrors.teachersName}</div>}
                        </label> */}
                    <label className="text-gray-700 mr-12">
                      Teacher Full Name:
                      <Select
                        isMulti
                        options={allteachers
                          .map((teacher) => ({
                            value: teacher.teacher_id,
                            label: teacher.teacher_fullname,
                          }))
                          .sort((a, b) => a.label.localeCompare(b.label))}
                        placeholder="Select Teacher"
                        onChange={handleTeachers}
                      />
                      {formErrors.teachersName && (
                        <div className="text-center text-red-500 font-bold p-2">
                          {formErrors.teachersName}
                        </div>
                      )}
                    </label>

                    <label className="text-gray-700">
                      Course:
                      <Select
                        isMulti
                        options={allcourses
                          .map((course) => ({
                            value: course.course_id,
                            label: course.course_name,
                          }))
                          .sort((a, b) => a.label.localeCompare(b.label))}
                        placeholder="Select Courses"
                        onChange={handleCourses}
                      />
                      {formErrors.courses && (
                        <div className="text-center text-red-500 font-bold p-2">
                          {formErrors.courses}
                        </div>
                      )}
                    </label>
                  </div>
                </form>
                <div className="flex flex-col min-[850px]:flex-row gap-4 justify-center  min-[850px]:justify-center">
                  <button
                    className="primary-button rounded w-60 btnCol text-white hover:text-white justify-center"
                    type="button"
                    onClick={() => handleAdd()}
                  >
                    Assign
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
            {multiAssign ? (
              <div className="relative flex-auto">
                {message && (
                  <div className="text-gray-500 font-bold p-2">{message}</div>
                )}
                <form className="flex items-center">
                  <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-3 min-[1100px]:grid-cols-2 mb-3 pb-4 border-blue-300 border-b-2 justify-center">
                    {/* <label className='text-gray-700 mr-12'>
                          Teacher Full Name:
                         { <CustomSelectBox
                          options={teachers}
                          placeholder="Select Teacher"
                          onSelect={handleTeachers}
                          styled={"font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-40 inline-block ml-10  mr-10"}
                          />}
                            {formErrors.teachersName && <div className='text-center text-red-500 font-bold p-2'>{formErrors.teachersName}</div>}
                        </label> */}
                    <label className="text-gray-700 mr-12">
                      Teacher Full Name:
                      <Select
                        isMulti
                        options={allteachers
                          .map((teacher) => ({
                            value: teacher.teacher_id,
                            label: teacher.teacher_fullname,
                          }))
                          .sort((a, b) => a.label.localeCompare(b.label))}
                        placeholder="Can Select More Than one teacher"
                        onChange={handleTeachers}
                      />
                      {formErrors.teachersName && (
                        <div className="text-center text-red-500 font-bold p-2">
                          {formErrors.teachersName}
                        </div>
                      )}
                    </label>

                    <label className="text-gray-700">
                      Course:
                      <Select
                        isMulti
                        options={allcourses
                          .map((course) => ({
                            value: course.course_id,
                            label: course.course_name,
                          }))
                          .sort((a, b) => a.label.localeCompare(b.label))}
                        placeholder="Course For each teacher Selected"
                        onChange={handleCourses}
                      />
                      {formErrors.courses && (
                        <div className="text-center text-red-500 font-bold p-2">
                          {formErrors.courses}
                        </div>
                      )}
                    </label>
                  </div>
                </form>
                <div className="flex flex-col min-[850px]:flex-row gap-4 justify-center  min-[850px]:justify-center">
                  <button
                    className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold justify-center"
                    type="button"
                    onClick={() => handleAddMultiple()}
                  >
                    Assign set
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
            {isReplace ? (
              <div className="relative flex-auto">
                {message && (
                  <div className="text-gray-500 font-bold p-2">{message}</div>
                )}
                <form className="flex items-center">
                  <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-3 min-[1100px]:grid-cols-2 mb-3 pb-4 border-blue-300 border-b-2 justify-center">
                    {/* <label className='text-gray-700 mr-12'>
                        Teacher Full Name:
                       { <CustomSelectBox
                        options={teachers}
                        placeholder="Select Teacher"
                        onSelect={handleTeachers}
                        styled={"font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-40 inline-block ml-10  mr-10"}
                        />}
                          {formErrors.teachersName && <div className='text-center text-red-500 font-bold p-2'>{formErrors.teachersName}</div>}
                      </label> */}

                    <label className="text-gray-700">
                      Course:
                      <Select
                        isMulti
                        options={allcourses
                          .map((course) => ({
                            value: course.course_id,
                            label: course.course_name,
                          }))
                          .sort((a, b) => a.label.localeCompare(b.label))}
                        placeholder="Select Courses"
                        onChange={handleCourses}
                        className="place-items-center"
                      />
                      {formErrors.courses && (
                        <div className="text-center text-red-500 font-bold p-2">
                          {formErrors.courses}
                        </div>
                      )}
                    </label>
                    {isSelected ? (
                      <>
                        <label className="text-gray-700 mr-12 invisible max-[850px]:visible max-[850px]:hidden">
                          from Teacher Full Name:
                          <Select
                            isMulti
                            options={teacherCourses.map((teacher) => ({
                              value: teacher.teacher_id,
                              label: teacher.teacher_fullname,
                            }))}
                            placeholder="Select Teacher"
                            onChange={handleTeacherCourse}
                            style={{ display: 'none' }}
                          />
                          {formErrors.teacherFrom && (
                            <div className="text-center text-red-500 font-bold p-2">
                              {formErrors.teacherFrom}
                            </div>
                          )}
                        </label>
                        <label className="text-gray-700 mr-12">
                          from Teacher Full Name:
                          <Select
                            isMulti
                            options={allteachers
                              .filter((teacher) =>
                                teacherCourses.some(
                                  (course) =>
                                    course.teacher_id === teacher.teacher_id
                                )
                              )
                              .map((teacher) => ({
                                value: teacher.teacher_id,
                                label: teacher.teacher_fullname,
                              }))
                              .sort((a, b) => a.label.localeCompare(b.label))}
                            placeholder="Select Teacher"
                            onChange={handleTeacherCourse}
                          />
                          {formErrors.teacherFrom && (
                            <div className="text-center text-red-500 font-bold p-2">
                              {formErrors.teacherFrom}
                            </div>
                          )}
                        </label>
                        <label className="text-gray-700 mr-12">
                          to Teacher Full Name:
                          <Select
                            isMulti
                            options={allteachers
                              .filter(
                                (teacher) =>
                                  !teacherCourses.some(
                                    (course) =>
                                      course.teacher_id === teacher.teacher_id
                                  )
                              )
                              .map((teacher) => ({
                                value: teacher.teacher_id,
                                label: teacher.teacher_fullname,
                              }))
                              .sort((a, b) => a.label.localeCompare(b.label))}
                            placeholder="Select Teacher"
                            onChange={handleTeacher}
                          />
                          {formErrors.teachersNameC && (
                            <div className="text-center text-red-500 font-bold p-2">
                              {formErrors.teachersNameC}
                            </div>
                          )}
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </form>
                {isSelected ? (
                  <>
                    <div className="flex flex-col min-[850px]:flex-row gap-4 justify-center  min-[850px]:justify-center">
                      <button
                        className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold justify-center"
                        type="button"
                        onClick={() => handleUpdate()}
                      >
                        Replace
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col min-[850px]:flex-row gap-4 justify-center  min-[850px]:justify-center">
                      <button
                        disabled
                        className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold justify-center"
                        type="button"
                        onClick={() => handleUpdate()}
                      >
                        Replace
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <></>
            )}
            <div className="flex items-center justify-center p-6"></div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
