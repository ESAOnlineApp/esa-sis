/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from "react";
import { useState } from "react";
// import Link from 'next/link';
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
// import moment from 'moment';
// import axios from "axios";
import selection_data from "../../utilities/selection_data";
// import encrypt from '../../utilities/encrypt_decrypt/encryptText';
// import major_code from '../../utilities/major_code';
// import { LowerButtons } from './LowerButtons';
// import exportSelect from "../../utilities/ExcelExport/exportSelect";
// import exportAll from "../../utilities/ExcelExport/exportAll";
// import EmailAfterChangMajor from '../../utilities/emailing/emailAfterChangeMajor';
// import {
//   WarningMessageCancleIncomplete,
//   WarningMessageIncomplete,
//   WarningMessageObsolote,
// } from './WarningMessage';
// import decrypt from "../../utilities/encrypt_decrypt/decryptText";
// import { useSession } from "next-auth/react";
import CustomPagination from "./Pagination";

const CourseList = ({
  users,
  // , setUsers
}) => {
  // console.log("usssssssssssser", users);
  const [pageSize, setPageSize] = useState(10);
  const [message, setMessage] = useState("");
  // const statusData = selection_data.application_status_inList;
  // const majorData = selection_data.Academic_program_inList;
  // const [majorEnable, setMajorEnable] = useState(null);
  // const [selectedRows, setSelectedRows] = useState([]);
  // const [confirmOpenIncomplete, setConfirmOpenIncomplete] = useState(false);
  // const [confirmOpenObsolote, setConfirmOpenObsolote] = useState(false);
  // const [cancleIncomplete, setCancleIncomplete] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);
  // const { data: session } = useSession();

  //incomplete modal
  // const handleConfirmIncomplete = (user) => {
  //   setSelectedUser(user);
  //   setConfirmOpenIncomplete(true);
  // };

  //obsolete modal
  // const handleConfirmObsolote = (user) => {
  //   setSelectedUser(user);
  //   setConfirmOpenObsolote(true);
  // };

  //cancle incomplete
  // const handleCancleIncomplete = (user) => {
  //   setSelectedUser(user);
  //   setCancleIncomplete(true);
  //   const prevStatus = users.find((u) => u.ID === user.ID)?.status;
  //   // console.log("prevStatus",prevStatus)
  //   setUsers((prevUsers) =>
  //     prevUsers.map((u) =>
  //       u.ID === user.ID ? { ...u, status: prevStatus } : u
  //     )
  //   );
  // };

  // const handleConfirmClose = (user) => {
  //   setConfirmOpenIncomplete(false);
  //   setConfirmOpenObsolote(false);
  //   setCancleIncomplete(false);
  //   const prevStatus = users.find((u) => u.ID === user.ID)?.status;
  //   // console.log("prevStatus",prevStatus)
  //   setUsers((prevUsers) =>
  //     prevUsers.map((u) =>
  //       u.ID === user.ID ? { ...u, status: prevStatus } : u
  //     )
  //   );
  // };

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
  //       console.log(response.data);
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
  //       console.log(error);
  //     });
  // };

  // const handleConfirm = () => {
  //   handleSave(selectedUser);
  //   setConfirmOpenIncomplete(false);
  //   setConfirmOpenObsolote(false);
  //   setCancleIncomplete(false);
  //   };
  //  const handleChangeMajor =  async(user) => {
  //   const targetPromotion = major_code.find(
  //     (major) => major.major === user.major
  //   )?.promotion;
  //   await axios
  //     .put(`/api/admin/listusers/major`, {
  //       data: encrypt(
  //         JSON.stringify({
  //           ID: user.ID,
  //           major: user.major,
  //           promotion: targetPromotion,
  //         })
  //       ),
  //     })
  //     .then(async (response) => {
  //       // Handle success
  //       console.log(response.data);
  //       //console.log(response.data.defaultpassword)
  //       //console.log(response.data.newID)
  //       setMessage('User Major Changed Succesfully!');
  //         await EmailAfterChangMajor({
  //          lname:response.data.lastname ,
  //          fname:response.data.firstname,
  //          newID:response.data.newID,
  //          email:response.data.email,
  //          defaultpassword:response.data.defaultpassword,
  //          oldmajor:response.data.oldmajor,
  //          newmajor:response.data.newmajor,
  //        });

  //       setMajorEnable(null);
  //       //Update the user's major in the table);
  //       setUsers((prevUsers) =>
  //         prevUsers.map((u) =>
  //           u.ID === user.ID
  //             ? {
  //                 ...u,
  //                 major: user.major,
  //                 promotion: targetPromotion,
  //                 status: 'incomplete',
  //               }
  //             : u
  //         )
  //       );
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.log(error.response.data);
  //     });
  // };

  setTimeout(() => {
    setMessage("");
  }, selection_data.message_disapear_timing);

  const columns = [
    {
      field: "course_id",
      headerName: "Course ID",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "course_name",
      headerName: "Course Name",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "course_credit",
      headerName: "Course Credit",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "major_name",
      headerName: "Major Name",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "course_type",
      headerName: "Course Type",
      headerAlign: "center",
      align: "center",
      width: 150,
    },

    // {
    //   field: 'student_id',
    //   headerName: 'Student ID',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 150,
    //   renderCell: (params) =>
    //     `${params.row.teacher_firstname || ''} ${params.row.teacher_lastname || ''}`,
    // },

    // {
    //   field: 'email',
    //   headerName: 'Email',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 150,
    // },
    // {
    //   field: 'mobileNumber',
    //   headerName: 'Mobile Number',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 120,
    // },

    // {
    //   field: 'major',
    //   headerName: 'Major',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 200,
    //   editable: true,
    //   type: 'singleSelect',
    //   valueOptions: majorData,
    // },
    // {
    //   field: 'promotion',
    //   headerName: 'Promotion',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 90,
    // },
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 100,
    //   editable: true,
    //   cellClassName: (params) =>
    //     params.row.status === 'complete'
    //       ? 'text-green-600 font-bold'
    //       : params.row.status === 'incomplete'
    //       ? 'text-red-600 font-bold'
    //       : '' || params.row.status === 'submitted'
    //       ? 'text-blue-600 font-bold'
    //       : '',
    //   type: 'singleSelect',
    //   valueOptions: statusData,
    // },
    // {
    //   field: 'Academic Year',
    //   headerName: 'Academic Year',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 100,
    // },

    // {
    //   field: 'present',
    //   headerName: 'Presence',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 100,
    //   editable: true,
    //   type: 'singleSelect',
    //   valueOptions: majorData,
    // },
    // {
    //   field: 'promotion',
    //   headerName: 'Promotion',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 90,
    // },
    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 100,
    //   editable: true,
    //   cellClassName: (params) =>
    //     params.row.status === 'active'
    //       ? 'text-green-600 font-bold'
    //       : params.row.status === 'limited'
    //       ? 'text-red-600 font-bold'
    //       : '' || params.row.status === 'Inactive'
    //       ? 'text-blue-600 font-bold'
    //       : '',
    //   type: 'singleSelect',
    //   valueOptions: statusData,
    // },
    // {
    //   field: 'attendance_date',
    //   headerName: 'Attendance Date',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 150,
    // },

    // {
    //   field: 'createdAt',
    //   headerName: 'Initial Date',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 100,
    //   type: 'date',
    //   valueFormatter: (params) => moment(params?.value).format('DD/MM/YYYY'),
    // },
    // {
    //   field: 'updatedAt',
    //   headerName: 'Submition Date',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 100,
    //   type: 'date',
    //   valueFormatter: (params) => moment(params?.value).format('DD/MM/YYYY'),
    // },
    // {
    //   field: 'reportURL',
    //   headerName: 'Report',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 200,
    //   renderCell: (params) => {
    //     return params.row.status === 'incomplete' ? (
    //       ''
    //     ) : (
    //       <Link target='_blank' href={`${params.row.reportURL}`}>
    //         {params.row.reportURL
    //           ? `${params.row.fname} ${params.row.lname}'s Report`
    //           : ''}
    //       </Link>
    //     );
    //   },
    // },

    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   width: `${session.user.role === '0' ? 300 : 150}`,
    //   headerAlign: 'center',
    //   align: 'center',
    //   sortable: false,
    //   renderCell: (params) => (
    //     <div className='flex gap-2'>
    //       <button
    //         className='primary-button hover:text-white'
    //         onClick={() => {
    //           const prevStatus = users.find(
    //             (u) => u.ID === params.row.ID
    //           )?.status;
    //           if (prevStatus === 'incomplete') {
    //             handleCancleIncomplete(params.row);
    //           } else if (params.row.status === 'incomplete') {
    //             handleConfirmIncomplete(params.row);
    //           } else if (params.row.status === 'obsolete') {
    //             handleConfirmObsolote(params.row);
    //           } else if (prevStatus === 'obsolete') {
    //             handleConfirmObsolote(params.row);
    //           } else {
    //             handleSave(params.row);
    //           }
    //         }}
    //         type='button'
    //       >
    //         Save
    //       </button>
    //       <Link
    //         className='text-black'
    //         target='_blank'
    //         href={`${params.row.reportURL}`}
    //       >
    //         <button
    //           className='primary-button hover:text-white'
    //           disabled={params.row.reportURL ? false : true}
    //           type='button'
    //         >
    //           Print
    //         </button>
    //       </Link>
    //       <button
    //         className='primary-button hover:text-white'
    //         onClick={() => handleChangeMajor(params.row)}
    //         disabled={params.id !== majorEnable}
    //         type='button'
    //         hidden={
    //           session.user.role === '2' || session.user.role === '3'
    //             ? true
    //             : false
    //         }
    //       >
    //         Change Major
    //       </button>
    //     </div>
    //   ),
    // },

    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   width: `${session.user.role === '0' ? 300 : 150}`,
    //   headerAlign: 'center',
    //   align: 'center',
    //   sortable: false,
    //   renderCell: (params) => (
    //     <div className='flex gap-2'>
    //       <button
    //         className='primary-button hover:text-white'
    //         onClick={() => {
    //           const prevStatus = users.find(
    //             (u) => u.ID === params.row.ID
    //           )?.status;
    //           if (prevStatus === 'incomplete') {
    //             handleCancleIncomplete(params.row);
    //           } else if (params.row.status === 'incomplete') {
    //             handleConfirmIncomplete(params.row);
    //           } else if (params.row.status === 'obsolete') {
    //             handleConfirmObsolote(params.row);
    //           } else if (prevStatus === 'obsolete') {
    //             handleConfirmObsolote(params.row);
    //           } else {
    //             handleSave(params.row);
    //           }
    //         }}
    //         type='button'
    //       >
    //         Save
    //       </button>
    //       <Link
    //         className='text-black'
    //         target='_blank'
    //         href={`${params.row.reportURL}`}
    //       >
    //         <button
    //           className='primary-button hover:text-white'
    //           disabled={params.row.reportURL ? false : true}
    //           type='button'
    //         >
    //           Print
    //         </button>
    //       </Link>
    //       <button
    //         className='primary-button hover:text-white'
    //         onClick={() => handleChangeMajor(params.row)}
    //         disabled={params.id !== majorEnable}
    //         type='button'
    //         hidden={
    //           session.user.role === '2' || session.user.role === '3'
    //             ? true
    //             : false
    //         }
    //       >
    //         Change Major
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  // export select to excel

  // const exportButton = async () => {
  //   if (users.length > 0) {
  //     try {
  //       const response = await axios.get('/api/admin/listusers/listexport');
  //       const incomingData = JSON.parse(decrypt(response.data.data));
  //       if (response.status === 200) {

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

  //         await exportAll(incomingData, session);
  //       } else {
  //         setUsers([]);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };
  // const handlePrintSelected = () => {
  //   const selectedIDs = selectedRows;

  //   const selectedUsers = users.filter((user) => selectedIDs.includes(user.ID));

  //   selectedUsers.forEach((user) => {
  //     if (user.reportURL) {
  //       window.open(user.reportURL);
  //     } else {
  //       setMessage('Please select a user with a report');
  //     }
  //   });

  // };

  return (
    <>
      {/* {confirmOpenIncomplete && (
        <WarningMessageIncomplete
          confirmOpenIncomplete={confirmOpenIncomplete}
          handleConfirmClose={handleConfirmClose}
          handleConfirm={handleConfirm}
        />
      )}

      {confirmOpenObsolote && (
        <WarningMessageObsolote
          confirmOpenObsolote={confirmOpenObsolote}
          handleConfirmClose={handleConfirmClose}
          handleConfirm={handleConfirm}
        />
      )}

      {cancleIncomplete && (
        <WarningMessageCancleIncomplete
          cancleIncomplete={cancleIncomplete}
          handleConfirmClose={handleConfirmClose}
        />
      )} */}
      <div className="text-center text-red-500 font-bold p-2">{message}</div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(r) => r.course_id}
          rows={users}
          getRowHeight={() => "auto"}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
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

      {/* <div className='grid lg:grid-cols-1 p-5 shadow-sm'>
        <LowerButtons
          exportButton={exportButton}
          selectedRows={selectedRows}
          exportAllButton={exportAllButton}
          handlePrintSelected={handlePrintSelected}
          session={session}
        />
      </div> */}
    </>
  );
};

export default CourseList;
