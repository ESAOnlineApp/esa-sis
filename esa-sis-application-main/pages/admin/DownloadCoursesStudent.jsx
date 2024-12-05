import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaCloudDownloadAlt } from "react-icons/fa";
import axios from 'axios';
import Select from 'react-select';
// import ExcelJS from 'exceljs';
// import Papa from 'papaparse';
export default function DownloadCourseStudent() {
  const { data: session } = useSession();
  const [Data, setData] = useState([]);
const [DataCourseType, setDataCourseType] = useState([]);
  const [majors, setMajors] = useState([]);
  const [isSelected, setSelected] = useState(false);
  const router = useRouter();

  const headerStudent = [
    [
      'StudentFirstName(required)', 'StudentLastName(required)', 'Gender(required)', 'DateOfBirth(required,e.g:(mm/dd/yyyy))',
      'AcademicYear(required)', 'Promotion(required,e.g:promo(promoNumber))', 'MajorName', 'Email(required)', 'MobileNumber(required)', 'PimsId', 'Title', 'SecondEmail', 'LandLineNumber',
      'FatherName', 'MotherName', 'maidename', 'CountryOfBirth', 'PlaceOfBirth', 'RegisterNumber', 'MartialStatus',
      'FirstNationality', 'SecondNationality', 'Country', 'Region', 'City', 'Street', 'Building', 'Floor', 'Postal',
      'Degree', 'Series', 'DateObtain', 'EducationCountry', 'Establishment', 'otherEstablishment',
      'EmergencePrefix', 'EmergenceFirstName', 'EmergenceMiddleName', 'EmergenceLastName', 'EmergencePhoneNumber',
      'EmergenceRelationShip', 'EmergenceMedicalHealth', 'EmergenceDisease'
    ],
  ];

  const headerTeacher = [['FirstName', 'LastName', 'Email', 'MobileNumber']];
  const headerAluminStudent = [['StudentID', 'FirstName', 'LastName', 'Promotion', 'AcademicYear', 'Major', 'Status', 'GraduatedYear', 'Email', 'PhoneNumber']];
  const headerCourse = [['CourseID', 'CourseName', 'CourseCredit', 'CourseType', 'MajorName']]
  const redirect = () => {
    router.push("/AccessDenied");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const table = 'major';
        const data = await axios.post('/api/pmApi/getAll', { table });
        setData(data.data.rows);
      } catch (error) {
        return error;
      }
    };
    fetchData();

    const fetchCourseType= async () => {
      try {
        const table = 'course_type';
        const data = await axios.post('/api/pmApi/getAll', { table });
        setDataCourseType(data.data.rows);
      } catch (error) {
        return error;
      }
    };
    fetchCourseType();
  }, []);

  const handleMajor = (selectedOption) => {
    const selectedName = selectedOption.label;
    setMajors([selectedName]);
    setSelected(true);
  };

  const createCSVTemplateStudent = () => {
    const data2 = headerStudent.concat([
      ['', '', '', '', '', '', majors, '', '', '', '', '', '', '', '', '', '', '', '', '', '',

        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',

        '', '', ''], // MajorName data
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet(data2);
    const columnWidths = calculateColumnWidths(worksheet);

    // Apply column widths to the worksheet
    worksheet['!cols'] = columnWidths;

    const csvContent = XLSX.utils.sheet_to_csv(worksheet);
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(csvBlob, 'student.csv');
  };

  const createCSVTemplateTeacher = () => {
    const data2 = headerTeacher.concat([
      ['', '', '', ''],
    ]);

    const columnWidths = calculateColumnWidths(data2);
    console.log('columnWidths' , columnWidths)
    const worksheet = XLSX.utils.aoa_to_sheet(data2);
    worksheet['!cols'] = columnWidths;

    const csvContent = XLSX.utils.sheet_to_csv(worksheet);
    console.log('csvContent' , csvContent.length)
    
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(csvBlob, 'Teacher.csv');
  };

 console.log(DataCourseType)

const calculateColumnWidths = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
        return []; // Return an empty array if data is not valid
    }

    const columnWidths = data[0].map((col, colIndex) => {
        // Set a default width for each column
        let maxContentWidth = 20; // Default width

        // Iterate through each row to find the maximum content width in the column
        data.forEach((row) => {
            if (Array.isArray(row) && colIndex < row.length) {
                const cellContent = row[colIndex] !== undefined ? row[colIndex].toString() : '';
                const words = cellContent.split(''); // Split the content into words
                const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), ''); // Find the longest word
                const contentWidth = longestWord.length * 7; // Adjust the multiplier as needed
                maxContentWidth = Math.max(maxContentWidth, contentWidth);
            }
        });

        return { wch: maxContentWidth };
    });

    return columnWidths;
};

const createCSVTemplateCourse = () => {
  const data2 = headerCourse.concat([
    ['', '', '', '', majors],
  ]);

  const columnWidths = calculateColumnWidths(data2);
  console.log('columnWidths' , columnWidths)
  const worksheet = XLSX.utils.aoa_to_sheet(data2);
  worksheet['!cols'] = columnWidths;

  const csvContent = XLSX.utils.sheet_to_csv(worksheet);
  console.log('csvContent' , csvContent.length)
  
  const csvBlob = new Blob([csvContent], { type: 'text/csv' });
  saveAs(csvBlob, 'Course.csv');
};



// const createCSVTemplateCourse = async () => {
//   const csvContent = [];

//   // Add header row
//   csvContent.push(['CourseID', 'CourseName', 'CourseCredit', 'CourseType', 'MajorName']);

//   // Define the list of valid CourseType options
//   // const courseTypeOptions = DataCourseType.map(course => course.course_type);

//   // Add data row with selected major and note about available options
//   csvContent.concat(['', '', '', '', majors[0]]);

//   // Generate CSV content
//   // const csvRows = csvContent.map(row => row.join(',')).join('\n');

//   // Add data validation rule for the CourseType column


//   // Generate CSV file
//   const csvBlob = new Blob([csvContent], { type: 'text/csv' });
//   saveAs(csvBlob, 'course.csv');
// };
  

  const createCSVStudentAlumni = () => {
    const data2 = headerAluminStudent.concat([
      ['', '', '', '', '', majors, 'Alumni', '', '', ''],
    ]);

    const columnWidths = calculateColumnWidths(data2);

    const worksheet = XLSX.utils.aoa_to_sheet(data2);
    worksheet['!cols'] = columnWidths;
    const csvContent = XLSX.utils.sheet_to_csv(worksheet);
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(csvBlob, 'Student Alumni.csv');
  };

  return (
    <>
      <Head>
        <title>SIS Admin - Download</title>
      </Head>
      {session?.user.role === "0" ? (
        <>
          <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
            {isSelected ?
              <>
                                <div className="my-4 text-slate-500 text-lg leading-relaxed">
                  <FaCloudDownloadAlt className=" hover:text-blue-600 hover:font-bold" style={{ width: '7rem', height: '7rem', cursor: 'pointer' }} onClick={createCSVTemplateCourse} />
                  <p className="pt-5 mb-10 font-bold">Download Course Template</p>
                </div>
                <div className="my-4 text-slate-500 text-lg leading-relaxed">
                  <FaCloudDownloadAlt className=" hover:text-blue-600 hover:font-bold" style={{ width: '7rem', height: '7rem', cursor: 'pointer' }} onClick={createCSVTemplateStudent} />
                  <p className="pt-5 mb-10 font-bold">Download Student Template</p>
                </div>
              </> :
              <>
                              <div className="my-4 text-slate-500 text-lg leading-relaxed">
                  <FaCloudDownloadAlt className=" hover:text-blue-600 hover:font-bold hover:<small>please select major first</small>" style={{ width: '7rem', height: '7rem', cursor: 'not-allowed' }} />
                  <p className="pt-5 mb-10 font-bold">Download Course Template</p>
                </div>
                <div className="my-4 text-slate-500 text-lg leading-relaxed">
                  <FaCloudDownloadAlt className=" hover:text-blue-600 hover:font-bold hover:<small>please select major first</small>" style={{ width: '7rem', height: '7rem', cursor: 'not-allowed' }} />
                  <p className="pt-5 mb-10 font-bold">Download Student Template</p>
                </div>
              </>
            }
            <div className="my-4 text-slate-500 text-lg leading-relaxed">
              <p className="pt-5 mb-10 font-bold">Select Major Name</p>
              <Select
                isMulti={false}
                options={Data.map((major) => ({ value: major.major_id, label: major.major_name })).sort((a, b) => a.label.localeCompare(b.label))}
                placeholder="Select a Major"
                onChange={handleMajor}
                className='place-items-center'
              />
            </div>
            <div className="my-4 text-slate-500 text-lg leading-relaxed">
              <FaCloudDownloadAlt className=" hover:text-blue-600 hover:font-bold" style={{ width: '7rem', height: '7rem', cursor: 'pointer' }} onClick={createCSVTemplateTeacher} />
              <p className="pt-5 mb-10 font-bold">Download Teacher Template</p>
            </div>
            <div className="my-4 text-slate-500 text-lg leading-relaxed">
              <FaCloudDownloadAlt className=" hover:text-blue-600 hover:font-bold" style={{ width: '7rem', height: '7rem', cursor: 'pointer' }} onClick={createCSVStudentAlumni} />
              <p className="pt-5 mb-10 font-bold">Download Alumni Student Template</p>
            </div>
            
          </div>
        </>
      ) : (
        redirect()
      )}
    </>
  )
}

DownloadCourseStudent.auth = true;
DownloadCourseStudent.adminOnly = true;
