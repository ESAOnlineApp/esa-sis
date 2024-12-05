import React from "react";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

import axios from "axios";
import ExportAttendanceData from "../../components/Dashboard/exportDataAttendance";
import moment from "moment";
import { useSession } from "next-auth/react";

export default function Reports() {
  const { data: session } = useSession();

  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLatName, setStudentLatName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [presents, setPresent] = useState("");
  const [attendance_Date, setAttendanceDate] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    handleShowAll();
  }, [session.user?.majorid]);

  const handleShowAll = async () => {
    try {
      const payload = {
        major_id: session.user?.majorid,
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
      setPresent("");
      setCourseName("");
      setAttendanceDate("");
      setStudentFirstName("");
      setStudentLatName("");
    } catch (error) {
      
      return error;
    }
  };
  const search = async () => {
    try {
      const payload = {
        major_id: session.user?.majorid,
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
      {/* <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">Report</p> */}
      <form>
        <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
          <label className="w-[350px]">
            Student ID:
            <input
              className="ml-10 mt-3 w-40 max-[850px]:ml-10 max-[850px]:mt-0"
              type="number"
              name="ID"
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Select Student ID"
              // value={formData.ID}
              // onChange={handleChange}
            ></input>
          </label>

          <label className="w-[350px]">
            First Name:
            <input
              className="ml-4 mt-3 w-40 max-[850px]:ml-10 max-[850px]:mt-0"
              type="text"
              name="Fname"
              value={studentFirstName}
              onChange={(e) => setStudentFirstName(e.target.value)}
              placeholder="Select Name"
              // value={formData.Fname}
              // onChange={handleChange}
            ></input>
          </label>

          <label className="w-[350px]">
            Last Name:
            <input
              className="ml-5 mt-3 w-40 max-[850px]:ml-10 max-[850px]:mt-0"
              type="text"
              name="Lname"
              value={studentLatName}
              onChange={(e) => setStudentLatName(e.target.value)}
              placeholder="Select surname"
              // value={formData.Lname}
              // onChange={handleChange}
            ></input>
          </label>
          <label className="w-[350px]">
            Course ID:
            <input
              className="ml-12 mt-3 w-40 max-[850px]:ml-12 max-[850px]:mt-0"
              type="text"
              name="ID"
              onChange={(e) => setCourseId(e.target.value)}
              value={courseId}
              placeholder="Select Course ID"
              // value={formData.ID}
              // onChange={handleChange}
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

          {/* <label className="w-[350px]">
                Promotion:
                {
                  <CustomSelectBox
                    options={promotion}
                    placeholder="Select Promotion"
                    onSelect={handlePromotion}
                    styled={
                      'font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-40 inline-block ml-[8px]'
                    }
                  />
                }
              </label> */}

          <label className="w-[350px]">
            Course Name:
            <input
              className="ml-5 mt-3 w-40 max-[850px]:ml-5 max-[850px]:mt-0"
              type="text"
              name="ID"
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Select Course Name"
              value={courseName}
              // value={formData.ID}
              // onChange={handleChange}
            ></input>
          </label>

          <label className="w-[350px]">
            present:
            <select
              onChange={(e) => setPresent(e.target.value)}
              value={presents}
              className="ml-10 mt-3 w-40 max-[850px]:ml-16 max-[850px]:mt-0"
            >
              <option value="">Choose a Value</option>
              <option value="true">Present</option>
              <option value="false">Absence</option>
            </select>
          </label>

          <label className="w-[350px]">
            Date:
            <input
              className="ml-16 mt-3 w-40 max-[850px]:ml-[85px] max-[850px]:mt-0"
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
            From:
            <input
              className="ml-12 invisible max-[850px]:visible max-[850px]:hidden w-40 max-[850px]:ml-10"
              type="date"
              name="from"
              // value={formData.from}
              // onChange={handleChange}
            ></input>
          </label>
          <div className="flex flex-col-2 min-[850px]:flex-row gap-2">
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
            <button
              className="primary-button btnCol text-white  w-60 hover:text-white hover:font-bold"
              type="button"
              onClick={exportData}
            >
              Export
            </button>

          </div>
        </div>
        <ExportAttendanceData data={data} />
        {/* <StudentsList users={users} setUsers={setUsers} /> */}
      </form>
    </>
  );
}
