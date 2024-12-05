import React from "react";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

import axios from "axios";
import ExportAttendanceData from "../../components/Dashboard/exportDataAttendance";
import moment from "moment";

export default function ReportById({
  majorValue,
  setMajorValue,
  majors,
  // setMajors,
}) {
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLatName, setStudentLatName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [presents, setPresent] = useState(" ");
  const [attendance_Date, setAttendanceDate] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    handleShowAll();
  }, [majorValue]);

  const handleShowAll = async () => {
    try {
      const payload = {
        major_id: majorValue,
        student_id: "",
        student_firstname: "",
        student_lastname: "",
        course_id: "",
        course_name: "",
        attendanceDate: "", // Use modifiedAttendanceDate
        present: "",
      };
      const data = await axios.post("/api/pmApi/exportAttendanceData", payload);

      setData(data.data.data);
      setStudentId("");
      setCourseId("");
      setPresent(" ");
      setCourseName("");
      setAttendanceDate("");
      setStudentFirstName("");
      setStudentLatName("");
    } catch (error) {
      setData([])
      return error;
    }
  };
  console.log('presents' , presents)
  const search = async () => {
    try {
      const payload = {
        major_id: majorValue,
        student_id: studentId,
        student_firstname: studentFirstName,
        student_lastname: studentLatName,
        course_id: courseId,
        course_name: courseName,
        attendanceDate: new Date(attendance_Date), // Use modifiedAttendanceDate
        present: presents,
      };
      const data = await axios.post("/api/pmApi/exportAttendanceData", payload);
      setData(data.data.data);
    } catch (error) {
      setData([])
      return error;
    }
  };

  const exportData = () => {
    try {
      // Modify the data
      const modifiedData = data.map((item) => ({
        ID: item.student_id,
        FirstName: item.student_firstname,
        LastName: item.student_lastname,
        Major: item.major_name,
        CourseId: item.course_id,
        CourseName: item.course_name,
        TeacherName: `${item.teacher_firstname} ${item.teacher_lastname}`, // Combine first name and last name
        Date: formatDate(item.attendance_date), // Assuming formatDate is a function to update the date format
        Status: item.attendance_status,
      }));


      // Convert modified data to XLSX format
      const ws = XLSX.utils.json_to_sheet(modifiedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Attendance Report");

      // Save the file
      const attendanceDate = formatDate(data[0].attendance_date);
      const fileName = `Report-${data[0].course_id}-${attendanceDate}-${data[0].major_name}.xlsx`;
      XLSX.writeFile(wb, fileName);

      // Alternatively, use file-saver to save the file
      // saveAs(new Blob([s2ab(XLSX.write(wb, { bookType: 'xlsx', type: 'blob' }))], { type: 'application/octet-stream' }), fileName);
    } catch (error) {
      console.error("Error exporting data: ", error);
    }
  };

  const formatDate = (dateString) => {
    return moment(dateString).format("DD/MM/YYYY");
  };
  return (
    <>
      <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">Report</p>
      <form>
        <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
          <label>
            ID:
            <input
              className="ml-16 w-40"
              type="number"
              name="ID"
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Select Student ID"
            // value={formData.ID}
            // onChange={handleChange}
            ></input>
          </label>

          <label>
            First Name:
            <input
              className="ml-1 w-40 max-[850px]:ml-1"
              type="text"
              name="Fname"
              onChange={(e) => setStudentFirstName(e.target.value)}
              placeholder="Select Name"
              value={studentFirstName}
            ></input>
          </label>

          <label>
            Last Name:
            <input
              className="ml-1 w-40 max-[850px]:ml-1"
              type="text"
              onChange={(e) => setStudentLatName(e.target.value)}
              placeholder="Select surname"
              value={studentLatName}
            ></input>
          </label>
          {/* </div>
<div className="grid lg:grid-cols-3 min-[100px]:gap-4 mb-3"> */}
          <label>
            Course ID:
            <input
              className="ml-2 mt-3 w-40 max-[850px]:ml-3 max-[850px]:mt-0"
              type="text"
              name="ID"
              onChange={(e) => setCourseId(e.target.value)}
              placeholder="Select Course ID"
              value={courseId}
            // onChange={handleChange}
            ></input>
          </label>

          <label>

            Course:
            <input
              className="ml-8 mt-3 w-40 max-[850px]:ml-8 max-[850px]:mt-0"
              type="text"
              name="ID"
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Select Course Name"
              value={courseName}
            // onChange={handleChange}
            ></input>
          </label>



          <label >
            present:
            <select
              onChange={(e) => setPresent(e.target.value)}
              value={presents}
              className="ml-7 mt-3 w-40 max-[850px]:ml-7 max-[850px]:mt-0"
            >
              <option value=" ">Choose a Value</option>
              <option value="true">Present</option>
              <option value="false">Absence</option>
            </select>
          </label>
          <label>
            Date:
            <input
              className="ml-12 mt-3 w-40 max-[850px]:ml-12 max-[850px]:mt-0"
              type="date"
              name="date"
              placeholder=""
              id={"date"}
              value={attendance_Date}
              onChange={(e) => {
                setAttendanceDate(e.target.value);
              }}
            ></input>
            
          </label>
          <label >
            Major:
            <select
              onChange={(e) => { setMajorValue(e.target.value) }}
              value={majorValue}
              className="ml-10 mt-3 w-40 max-[850px]:ml-10 max-[850px]:mt-0 "

            >
              <option key={"uu2isdvf"} value="">
                Choose a Major
              </option>
              {majors &&
                majors.map((major) => (
                  <>
                    <option key={major.major_id} value={major.major_id}>
                      {major.major_name}
                    </option>
                  </>
                ))}
            </select>
          </label>
  
          
          
          

          <div className="flex flex-col min-[850px]:flex-row gap-4 h-10">
            <button
              className="primary-button btnCol text-white w-60 hover:text-white hover:font-bold"
              type="button"
              onClick={search}
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
          <button
              className="primary-button btnCol text-white  w-60 hover:text-white hover:font-bold"
              type="button"
              onClick={exportData}
            >
              Export
            </button>

        </div>
        <ExportAttendanceData data={data} />
      </form>
    </>
  );
}
