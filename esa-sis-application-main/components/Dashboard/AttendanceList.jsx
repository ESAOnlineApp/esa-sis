/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React, { useEffect } from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import moment from "moment";
import axios from "axios";
import selection_data from "../../utilities/selection_data";

// import encrypt from '../../utilities/encrypt_decrypt/encryptText';
// import major_code from '../../utilities/major_code';
// import { LowerButtons } from './LowerButtons';
// import exportSelect from '../../utilities/ExcelExport/exportSelect';
// import exportAll from '../../utilities/ExcelExport/exportAll';
// import EmailAfterChangMajor from '../../utilities/emailing/emailAfterChangeMajor';
// import {
//   WarningMessageCancleIncomplete,
//   WarningMessageIncomplete,
//   WarningMessageObsolote,
// } from './WarningMessage';
// import decrypt from '../../utilities/encrypt_decrypt/decryptText';
import { useSession } from "next-auth/react";
import CustomPagination from "./Pagination";
// import AttendanceModal from '../../pages/programManager/ModalForm/AttendanceModal';
import UpdateModal from "../../pages/programManager/ModalForm/UpdateModal";
import ModalperID from "../../pages/programManager/ModalForm/ModalperID";
import Archive from "../../pages/programManager/ModalForm/Archive";
import ModalByMajorPM from "../../pages/programManager/ModalForm/ModalByMajorPM";

const AttendanceList = ({ users }) => {
  const [pageSize, setPageSize] = useState(10);
  const [message, setMessage] = useState("");
  // const statusData = selection_data.application_status_inList;
  // const presence = selection_data.presence;
  // const [presentEnable, setPesentEnable] = useState(null);
  // const [selectedRows, setSelectedRows] = useState([]);
  const { data: session } = useSession();
  const [editModal, setEditModal] = useState(false);

  const [attendance, setAttendance] = useState([]);
  const [details, setDetails] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [teachersFirstname, setTeacherFirstName] = useState("");
  const [teacherslastname, setTeacherlastname] = useState("");
  const [date, setDate] = useState("");
  const [showPrint, setShowPrint] = useState(false);
  const [archive, setShowArchive] = useState(false);

  //sort by Teacher Firstname
  // const [sortedRows, setSortedRows] = useState(users);

  // const handleSort = (field) => {
  //   const sorted = [...sortedRows].sort((a, b) => a[field].localeCompare(b[field]));
  //   setSortedRows(sorted);
  // };
  //sort by date
  //   const sortedUsers = [...users].sort((a, b) =>
  //   moment(b.attendance_date).diff(moment(a.attendance_date))
  // );

  //     setCourses(datesArray);

  //   } catch (error) {
  //     return error
  //   }
  // }
  // getCourses();

  // const handleTeacher = async () => {
  //   try {

  //     let major_id = session.user.majorid;
  //     // let course_id = coursesValue ;
  //     const { data } = await axios.post("/api/pmApi/getTeachersByMajorCourse", { major_id })
  //     setAllTeachers(data.data)
  //     // console.log('allteacher', allteachers)

  //     const datesArray = [];
  //     data.data.forEach((teachers) => {
  //       datesArray.push(teachers.teacher_firstname);

  //     });
  //     setTeachers(datesArray)

  //   } catch (error) {
  //     return error
  //   }
  // }
  // handleTeacher()

  // const getStudent = async () => {
  //   try {
  //     let major_id = session.user.majorid
  //     const { data } = await axios.post('/api/pmApi/getAllStudent', { major_id })
  //     // console.log(data.data)
  //     // console.log(data.data)
  //     setStudent(data.data)
  //   } catch (error) {
  //     return error
  //   }
  //sort by attendance_id
  const [sortedRows, setSortedRows] = useState(users);
  useEffect(() => {
    const sorted = [...users].sort((a, b) => a.attendance_id - b.attendance_id);
    setSortedRows(sorted);
  }, [users]);

  const getDetails = async (event) => {
    try {
      const attendance_id = event.attendance_id;
      const { data } = await axios.post(`/api/pmApi/attendanceDetails`, {
        attendance_id,
      });
      // // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaa",data.data[0].teacher_firstname)
      setTeacherFirstName(data.data[0].teacher_firstname);
      setTeacherlastname(data.data[0].teacher_lastname);
      setCourseName(data.data[0].course_name);
      setDate(data.data[0].attendance_date);

      setDetails(data.data);
    } catch (error) {
      return error;
    }
  };

  // const handleSave = (user) => {
  //   axios
  //     .put('/api/admin/listusers/status', {
  //       data: encrypt(
  //         JSON.stringify({
  //           ID: user.ID,
  //           status: user.status,
  //         })
  //       ),
  //     })
  //     .then((response) => {
  //       // Handle success
  //       // console.log(response.data);
  //       setMessage('User Status Changed Succesfully!');

  //       //Update the user's status and major in the table
  //       setUsers((prevUsers) =>
  //         prevUsers.map((u) =>
  //           u.ID === user.ID ? { ...u, status: user.status } : u
  //         )
  //       );
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       // console.log(error);
  //     });
  // };

  // const handlePrintSelected = () => {
  //   const selectedIDs = selectedRows;
  //   // console.log('selectedIDs', selectedIDs);
  //   const selectedUsers = users.filter((user) => selectedIDs.includes(user.ID));
  //   // console.log('selectedUsersbefore', selectedUsers);
  //   selectedUsers.forEach((user) => {
  //     if (user.reportURL) {
  //       window.open(user.reportURL);
  //     } else {
  //       setMessage('Please select a user with a report');
  //     }
  //   });

  //   // console.log('selectedUsers', selectedUsers);
  // };

  const handleShowAll = async (event) => {
    try {
      // setEditModal(true)
      //  console.log('event' , event.attendance_id)
      const attendance_id = event.attendance_id;
      const { data } = await axios.post(`/api/pmApi/getAllAttendance`, {
        attendance_id,
      });

      setAttendance(data.data);
    } catch (error) {
      return error;
    }
  };

  setTimeout(() => {
    setMessage("");
  }, selection_data.message_disapear_timing);

  const columns = [
    // {
    //   field: 'attendance_id',
    //   headerName: 'Attendance ID',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 150,
    // },
    // {
    //   field: 'student_id',
    //   headerName: 'Student ID',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 90,
    // },
    {
      field: "Name",
      headerName: "teacher Name",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) =>
        `${params.row.teacher_firstname || ""} ${params.row.teacher_lastname || ""
        }`,
    },
    // {
    //   field: 'major_id',
    //   headerName: 'Major ID',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 90,
    // },
    {
      field: "major_name",
      headerName: "Major Name",
      headerAlign: "center",
      align: "center",
      width: 200,
    },

    {
      field: "course_id",
      headerName: "Course ID",
      headerAlign: "center",
      align: "center",
      width: 120,
    },

    // {
    //   field: 'present',
    //   headerName: 'Presence',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 100,
    //   editable: true,

    //   renderCell: (params) => {
    //     return params.value ? (
    //       <>  Present</>
    //     ):(<>Absent</>);
    //   },

    //   cellClassName: (params) =>
    //     params.row.present === false
    //     ? 'text-red-600 font-bold'
    //     : params.row.present === true
    //     ? 'text-green-600 font-bold'
    //     : '',
    //     type: 'singleSelect',
    //     valueOptions: presence,

    // },
    {
      field: "attendance_date",
      headerName: "Attendance Date",
      headerAlign: "center",
      align: "center",
      width: 150,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "action",
      headerName: "Action",
      width: `${(session?.user.role === "2" || session?.user.role === "3") ? 300 : 150}`,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            className="primary-button hover:text-white"
            onClick={() => {
              handleShowAll(params.row),
                getDetails(params.row),
                setEditModal(true);
            }}
            // disabled={params.id !== presentEnable}
            type="button"
            hidden={
              session.user.role === "1" || session.user.role === "0"
                ? true
                : false
            }
          >
            Edit
          </button>

          <button
            className="primary-button hover:text-white"
            type="button"
            onClick={() => {
              getDetails(params.row), setShowPrint(true);
            }}
          >
            Print
          </button>
          {/* <Link
            className='text-black'
            target='_blank'
            href={`${params.row.reportURL}`}
            // href={downloadPDF}
            
          > */}
          <button
            className="primary-button hover:text-white"
            type="button"
            onClick={() => {
              handleShowAll(params.row),
                getDetails(params.row),
                setShowArchive(true);
            }}
          >
            Archive
          </button>

          {/* </Link> */}
          {/* <button
            className='primary-button hover:text-white'
            onClick={() => handleChangeMajor(params.row)}
            disabled={params.id !== majorEnable}
            type='button'
            hidden={
              session.user.role === '1' || session.user.role === '3'
                ? true
                : false
            }
          >
            Change Major
          </button> */}
        </div>
      ),
    },
  ];

  // export select to excel

  // const exportButton = async () => {
  //   if (users.length > 0) {
  //     try {
  //       const response = await axios.get('/api/admin/listusers/listexport');
  //       const incomingData = JSON.parse(decrypt(response.data.data));
  //       if (response.status === 200) {
  //         // console.log('response', response);
  //         // console.log('incomingData', incomingData);
  //         await exportSelect(selectedRows, incomingData, session);
  //       } else {
  //         setUsers([]);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  // export all to excel
  // const exportAllButton = async () => {
  //   if (users.length > 0) {
  //     try {
  //       const response = await axios.get('/api/admin/listusers/listexport');
  //       const incomingData = JSON.parse(decrypt(response.data.data));
  //       if (response.status === 200) {
  //         // console.log('response', response);
  //         // console.log('incomingData', incomingData);
  //         await exportAll(incomingData, session);
  //       } else {
  //         setUsers([]);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  return (
    <>
      <div className="text-center text-red-500 font-bold p-2">{message}</div>
      {showPrint && session.user?.hasMultiMajor === "false"? 
        <ModalperID
          setShowPrint={setShowPrint}
          attendance={attendance}
          session={session}
          courseName={courseName}
          teachersFirstname={teachersFirstname}
          teacherslastname={teacherslastname}
          date={date}
          details={details}
          setDetails={setDetails}
          setDate={setDate}
          setCourseName={setCourseName}
          setTeacherFirstName={setTeacherFirstName}
          setTeacherlastname={setTeacherlastname}
        />:showPrint && session.user?.hasMultiMajor === "true" && (
          <ModalByMajorPM 
            setShowPrint={setShowPrint}
            attendance={attendance}
            session={session}
            courseName={courseName}
            teachersFirstname={teachersFirstname}
            teacherslastname={teacherslastname}
            date={date}
            details={details}
            setDetails={setDetails}
            setDate={setDate}
            setCourseName={setCourseName}
            setTeacherFirstName={setTeacherFirstName}
            setTeacherlastname={setTeacherlastname}
          />
        )
      }
   
      {editModal && (
        <UpdateModal
          editModal={editModal}
          setEditModal={setEditModal}
          attendance={attendance}
          setAttendance={setAttendance}
          setMessage={setMessage}
          courseName={courseName}
          teachersFirstname={teachersFirstname}
          teacherslastname={teacherslastname}
          date={date}
          setDate={setDate}
          setDetails={setDetails}
          setCourseName={setCourseName}
          setTeacherFirstName={setTeacherFirstName}
          setTeacherlastname={setTeacherlastname}
        />
      )}
      {archive && (
        <Archive
          archive={archive}
          setShowArchive={setShowArchive}
          attendance={attendance}
          details={details}
          setAttendance={setAttendance}
          setDetails={setDetails}
          setDate={setDate}
          setCourseName={setCourseName}
          setTeacherFirstName={setTeacherFirstName}
          setTeacherlastname={setTeacherlastname}
        />
      )}
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(r) => r.attendance_id}
          rows={sortedRows}
          getRowHeight={() => "auto"}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // onColumnHeaderClick={(column) => handleSort(column.field)}
          rowsPerPageOptions={[5, 10, 15, 20]}
          // pagination
          checkboxSelection
          // onSelectionModelChange={setSelectedRows}
          disableSelectionOnClick
          // onSelectionModelChange={disablePrintHanlder}
          // onCellEditCommit={(params) => setMajorEnable(params.id)}
          components={{
            NoRowsOverlay: () => (
              <div className="grid h-[100%] place-items-center">No Data</div>
            ),
            Pagination: CustomPagination,
          }}
        />
      </Box>

      <div className="grid lg:grid-cols-1 p-5 shadow-sm">
        {/* <LowerButtons
          exportButton={exportButton}
          setisModal={setisModal}
          selectedRows={selectedRows}
          exportAllButton={exportAllButton}
          handlePrintSelected={handlePrintSelected}
          session={session}
        /> */}
      </div>
    </>
  );
};

export default AttendanceList;
