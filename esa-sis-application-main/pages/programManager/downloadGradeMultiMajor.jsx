import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
// import { FaCloudDownloadAlt } from "react-icons/fa";
import axios from 'axios';
import Select from 'react-select';

export default function DownloadGradeMultiMajor({ setClickDownload, majorId, majors }) {
  const { data: session } = useSession();
  const [Data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isSelected, setSelected] = useState(false);
  const [promotionSelect, setPromotionSelected] = useState(false);
  const [student, setStudentData] = useState([]);
  const [promotionName, setPromotion] = useState('')
  const [promotion, setPromotionList] = useState([])
  const router = useRouter();
  const [taskName, setTaskValue] = useState('')
  const [semester, setSemester] = useState('')
  const [academic_year, setAcademicYear] = useState('')
  const [taskNameError, setTaskNameError] = useState('');
  const [academicYearError, setAcademicYearError] = useState('');
  const [courseError, setCourseError] = useState('');
  const semesterOptions = [
    { value: 'summer', label: 'Summer' },
    { value: 'fall', label: 'Fall' },
    { value: 'spring', label: 'Spring' },
    { value: 'winter', label: 'Winter' },
  ];

  const getFirstWordBeforeHyphen = (text) => {
    if (text) {
      const words = text.split("-");
      if (words.length > 0) {
        return words[0];
      }
    }
    return "";
  };
  const getFirstWordAfterHyphen = (text) => {
    if (text) {
      const words = text.split("-");
      if (words.length > 0) {
        return words[1];
      }
    }
    return "";
  };
  const firstMajorWord = getFirstWordBeforeHyphen(session?.user.majorName);
  const secondMajorWord = getFirstWordAfterHyphen(session?.user.majorName);

  const isExeMajor = firstMajorWord === "EXED";
  let header = []
  if (isExeMajor) {
    if (secondMajorWord === 'GMP' || secondMajorWord === 'gmp' || secondMajorWord === 'Gmp' || majors === 'EXED-GMP') {
      header = [
        ['StudentID', 'FamilyName', 'FirstName', 'Promotion', 'CertificateName', 'TaskName', 'Year', 'Grade', 'Comments'],
      ]
    } else if (secondMajorWord === 'Digital Transformation in Financial Services' || majors === 'Digital Transformation in Financial Services' || majors === 'Digital Transformation' || secondMajorWord === 'Digital Transformation') {
      header = [
        ['StudentID', 'FamilyName', 'FirstName', 'Promotion', 'CertificateName', 'TaskName', 'Year', 'GradeOver30', 'GradeOver20'],
      ]
    } else {
      header = [
        ['StudentID', 'FamilyName', 'FirstName', 'Promotion', 'CertificateName', 'TaskName', 'Year', 'Grade', 'Comments'],
      ]
    }



  } else {
    header = [
      ['StudentID', 'StudentFirstName', 'StudentLastName', 'Promotion', 'CourseID', 'TaskName', 'Grade', 'Semester', 'Academic_year'],
    ]

  }

  const redirect = () => {
    router.push("/AccessDenied");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          table: 'courses',
          Where: 'major_id',
          id: majorId
        }

        const data = await axios.post('/api/pmApi/getAllCourses', payload);
        setData(data.data.data);

      } catch (error) {
        return error;
      }
    };
    fetchData();

    const fetchPromotion = async () => {
      try {
        const payload = {
          table: 'promotions',
          Where: 'major_id',
          id: majorId
        }
        const data = await axios.post('/api/pmApi/getAllCourses', payload)

        setPromotionList(data.data.data)
      } catch (error) {
        return error
      }
    };
    fetchPromotion();

  }, []);
  useEffect(() => {
    if (promotionName != '') {
      fetchStudent()
    }

  }, [promotionName])
  const fetchStudent = async () => {
    try {
      const payload = {
        major_id: majorId,
        promotion: promotionName
      };
      const response = await axios.post('/api/pmApi/StudentMajor', payload);
      const unsortedStudentData = response.data.data;

      // Sort the student data by student_id in increasing order
      const sortedStudentData = [...unsortedStudentData].sort((a, b) =>
        a.student_id - b.student_id
      );

      setStudentData(sortedStudentData);
    } catch (error) {
      return error;
    }
  };


  const calculateColumnWidths = (data) => {
    const columnWidths = data[0].map((col, colIndex) => {
      const maxContentWidth = data.reduce((max, row) => {
        const cellContent = row[colIndex] !== undefined ? row[colIndex].toString() : '';
        const contentWidth = cellContent.length;
        return Math.max(max, contentWidth);
      }, col.length);

      return { wch: maxContentWidth };
    });

    return columnWidths;
  };


  const handleCourse = (selectedOption) => {
    const selectedName = selectedOption.value;
    setCourses([selectedName]);
    setSelected(true);
  };
  const handleSemester = (selectedOption) => {
    const selectedName = selectedOption.value; // or selectedOption.label, depending on your data structure
    setSemester([selectedName]);
  };


  const handlePromotion = (selectedOption) => {
    const selectedName = selectedOption.label;
    setPromotion([selectedName]);
    setPromotionSelected(true);
  };

  const createExcelTemplateCourse = () => {
    if (!isSelected || courses.length === 0) {
      setCourseError("Please select a course.");
      return;
    } else {
      setCourseError('');
    }

    // Check if taskName is selected
    if (!taskName) {
      setTaskNameError("Task name is required.");
      return;
    } else {
      setTaskNameError('');
    }

    // Check if academic_year is selected
    if (!academic_year) {
      setAcademicYearError("Academic year is required.");
      return;
    } else {
      setAcademicYearError('');
    }




    // Create the data for the Excel sheet, including student data
    let data = []
    if (isExeMajor) {
      if (secondMajorWord === 'GMP' || secondMajorWord === 'gmp' || secondMajorWord === 'Gmp') {
        data = header.concat(
          student.map((studentData) => [
            studentData.student_id,
            studentData.student_lastname,
            studentData.student_firstname,
            promotionName,
            courses,
            taskName,
            academic_year,
            '',
            ''
          ])
        );

      } else if (secondMajorWord === 'Digital Transformation in Financial Services' || majors === 'Digital Transformation in Financial Services') {
        data = header.concat(
          student.map((studentData) => [
            studentData.student_id,
            studentData.student_lastname,
            studentData.student_firstname,
            promotionName,
            courses,
            taskName,
            academic_year,
            '',
            '',

          ])
        );
      } else {
        data = header.concat(
          student.map((studentData) => [
            studentData.student_id,
            studentData.student_lastname,
            studentData.student_firstname,
            promotionName,
            courses,
            taskName,
            academic_year,
            '',
            ''
          ]))

      }



    } else {
      data = header.concat(
        student.map((studentData) => [
          studentData.student_id,
          studentData.student_firstname,
          studentData.student_lastname,
          promotionName,
          courses,
          taskName,
          '',
          semester,
          academic_year,
          ''
        ])
      );


    }

    const columnWidths = calculateColumnWidths(data);

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    worksheet['!cols'] = columnWidths;
    const csvContent = XLSX.utils.sheet_to_csv(worksheet);
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(csvBlob, 'Grade.csv');
  };





  return (
    <>
      <Head>
        <title>SIS Program Manager - Download</title>
      </Head>
      {session?.user.role === '2' ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-3/4 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-gray-700 text-3xl font-bold">
                    Download Template
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setClickDownload(false);
                      setStudentData([]);
                    }}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                {/*body*/}


                {
                  promotionSelect ?
                    <>
                      <div className='relative flex-auto '>
                        <form className=" text-slate-500 text-lg leading-relaxed flex flex-col  justify-center">
                          {/* {isSelected ?

                            <>
                              <div className="m-8 text-slate-500 text-lg leading-relaxed">
                                <FaCloudDownloadAlt className=" hover:text-blue-600 hover:font-bold" style={{ width: '7rem', height: '7rem', cursor: 'pointer' }} onClick={createExcelTemplateCourse} />
                                <p className="pt-5 mb-10 font-bold">Download Course Template</p>
                              </div>

                            </> :
                            <>

                              <div className="m-8 text-slate-500 text-lg leading-relaxed">
                                <FaCloudDownloadAlt className=" hover:text-blue-600 hover:font-bold hover:<small>please select major first</small>" style={{ width: '7rem', height: '7rem', cursor: 'not-allowed' }} />
                                <p className="pt-5 mb-10 font-bold">Download Course Template</p>
                              </div>

                            </>} */}


                          <div className=" m-5 text-slate-500 text-lg leading-relaxed">

                            <p className="font-bold">Select Course Name</p>
                            <Select
                              isMulti={false}
                              options={Data.map((course) => ({ value: course.course_id, label: course.course_name })).sort((a, b) => a.label.localeCompare(b.label))}
                              placeholder="Select a Course"
                              onChange={handleCourse}
                              className='place-items-center w-full'
                            />
                            {courseError && (
                              <p className="text-red-500">{courseError}</p>
                            )}


                          </div>
                          <div className="m-5 text-slate-500 text-lg leading-relaxed flex flex-col">
                            <div className=''>
                              <p className="font-bold">Select Task</p>
                            </div>

                            <div className='flex flex-rows'>
                              <div className='mr-5'>

                                <input type='radio' value={'assignment'} onChange={(e) => setTaskValue(e.target.value)} name='task' />Assignment
                              </div>
                              <div className='mr-5'>
                                <input type='radio' value={'exam'} onChange={(e) => setTaskValue(e.target.value)} name='task' />Exam
                              </div>
                              <div>
                                <input type='radio' value={'project'} onChange={(e) => setTaskValue(e.target.value)} name='task' />Project
                              </div>
                            </div>
                            {taskNameError && (
                              <p className="text-red-500">{taskNameError}</p>
                            )}
                          </div>
                          {session.user?.majorName === 'BBA (Bachelor in Business Administration)' ?
                            <>
                              <div className='m-5 text-slate-500 text-lg leading-relaxed flex flex-col'>
                                <p className=" font-bold">Select semester </p>
                                <Select
                                  isMulti={false}
                                  options={semesterOptions} // Use your semesterOptions array here
                                  placeholder="Select a Semester"
                                  value={semesterOptions.find(option => option.value === semester)} // Set the selected option
                                  onChange={handleSemester}
                                  className='place-items-center w-96'
                                />

                              </div>
                            </>
                            : <></>}
                          <div className='m-5 text-slate-500 text-lg leading-relaxed '>
                            <p className=" font-bold">Academic year </p>
                            <input type="text" placeholder='academic year' value={academic_year} onChange={(e) => setAcademicYear(e.target.value)} />
                            {academicYearError && (
                              <p className="text-red-500">{academicYearError}</p>
                            )}
                          </div>




                          <div className='m-5 text-slate-500 text-lg leading-relaxed flex flex-col justify-center'>
                            <button
                              type='button'
                              className="primary-button rounded btnCol text-white hover:text-white hover:font-bold "

                              onClick={createExcelTemplateCourse}>
                              Download
                            </button>
                          </div>
                        </form>

                      </div>

                    </>

                    :
                    <>
                      <div className='relative p-6 flex-auto '>
                        <form className="m-8 text-slate-500 text-lg leading-relaxed">
                          {/* Add your select field for promotion here */}
                          <Select
                            isMulti={false}
                            options={promotion.map((promotion) => ({ value: promotion.promotion_name, label: promotion.promotion_name }))}
                            placeholder="Select a Promotion"
                            onChange={handlePromotion}
                            className="place-items-center w-full"
                          />
                          <p className="pt-5 font-bold">Please select a promotion</p>
                        </form>
                      </div>

                    </>
                }


                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>) : (

        redirect()
      )}
    </>
  )
}

DownloadGradeMultiMajor.auth = true;
DownloadGradeMultiMajor.adminOnly = true;

