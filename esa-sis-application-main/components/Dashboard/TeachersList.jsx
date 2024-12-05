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
import * as XLSX from "xlsx";
import Box from "@mui/material/Box";
// import moment from 'moment';
// import axios from "axios";
import selection_data from "../../utilities/selection_data";
// import encrypt from '../../utilities/encrypt_decrypt/encryptText';
// import major_code from '../../utilities/major_code';
// import { LowerButtons } from "./LowerButtons";
// import exportSelect from "../../utilities/ExcelExport/exportSelect";
// import exportAll from "../../utilities/ExcelExport/exportAll";
// import EmailAfterChangMajor from '../../utilities/emailing/emailAfterChangeMajor';
// import {
//   WarningMessageCancleIncomplete,
//   WarningMessageIncomplete,
//   WarningMessageObsolote,
// } from './WarningMessage';
// import decrypt from "../../utilities/encrypt_decrypt/decryptText";
import { useSession } from "next-auth/react";
import CustomPagination from "./Pagination";
import { ExportButtons } from "./ExportButtons";
// import moment from "moment";
// import { Pagination, Stack } from '@mui/material';

const TeachersList = ({ users }) => {
  const [pageSize, setPageSize] = useState(10);
  const [message, setMessage] = useState("");
  // const statusData = selection_data.application_status_inList;
  // const majorData = selection_data.Academic_program_inList;
  // const [majorEnable, setMajorEnable] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  // const [confirmOpenIncomplete, setConfirmOpenIncomplete] = useState(false);
  // const [confirmOpenObsolote, setConfirmOpenObsolote] = useState(false);
  // const [cancleIncomplete, setCancleIncomplete] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);
  const { data: session } = useSession();

  setTimeout(() => {
    setMessage("");
  }, selection_data.message_disapear_timing);

  const columns = [
    {
      field: "teacher_id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 90,
    },

    {
      field: "teacher_firstname",
      headerName: "First Name",
      headerAlign: "center",
      align: "center",
      width: 150,
      // renderCell: (params) =>
      //   `${params.row.teacher_firstname || ''} ${params.row.teacher_lastname || ''}`,
    },
    {
      field: "teacher_lastname",
      headerName: "Last Name",
      headerAlign: "center",
      align: "center",
      width: 150,
      // renderCell: (params) =>
      //   `${params.row.teacher_firstname || ''} ${params.row.teacher_lastname || ''}`,
    },

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

    {
      field: "teacher_mail",
      headerName: "E-mail",
      headerAlign: "center",
      align: "center",
      width: 300,
      type: "singleSelect",
    },
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
    //   field: 'academic_year',
    //   headerName: 'Academic Year',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 110,
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
    //   field: 'course_id',
    //   headerName: 'Course ID',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 100,
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
    {
      field: "mobile_number",
      headerName: "Mobile Number",
      headerAlign: "center",
      align: "center",
      width: 150,
      // renderCell: (params) =>
      //   `${params.row.teacher_firstname || ''} ${params.row.teacher_lastname || ''}`,
    },
  ];

  // export select to excel

  const exportButton = async () => {
    if (selectedRows.length > 0) {
      try {
        let selected = new Set(selectedRows)
        const filteredTeachers = users.filter(teacher => selected.has(teacher.teacher_id));
      // Modify the data
      const modifiedData = filteredTeachers.map((item) => ({
        ID: item.teacher_id,
        FirstName: item.teacher_firstname,
        LastName: item.teacher_lastname,
        Email: item.teacher_mail,
      }));

      // Convert modified data to XLSX format
      const ws = XLSX.utils.json_to_sheet(modifiedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Teacher Report");

      // const attendanceDate = formatDate(data[0].attendance_date);
      const fileName = `Teachers-${session.user.majorName}-${Date.now()}.xlsx`;
      XLSX.writeFile(wb, fileName);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // export all to excel
  const exportAllButton = async () => {
    if (users.length > 0) {
      try {
      // Modify the data
      const modifiedData = users.map((item) => ({
        ID: item.teacher_id,
        FirstName: item.teacher_firstname,
        LastName: item.teacher_lastname,
        Email: item.teacher_mail,
      }));

      // Convert modified data to XLSX format
      const ws = XLSX.utils.json_to_sheet(modifiedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Teacher Report");

      // const attendanceDate = formatDate(data[0].attendance_date);
      const fileName = `Teachers-${session.user.majorName}-${Date.now()}.xlsx`;
      XLSX.writeFile(wb, fileName);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {/* {confirmOpenIncomplete && (
        <WarningMessageIncomplete
          confirmOpenIncomplete={confirmOpenIncomplete}
          handleConfirmClose={handleConfirmClose}
          handleConfirm={handleConfirm}
        />
      )} */}

      {/* {confirmOpenObsolote && (
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
          getRowId={(r) => r.teacher_id}
          rows={users}
          getRowHeight={() => "auto"}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15, 20]}
          checkboxSelection
          onSelectionModelChange={setSelectedRows}
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
          selectedRows={selectedRows}
          exportAllButton={exportAllButton}
          handlePrintSelected={handlePrintSelected}
          session={session}
        /> */}
        <ExportButtons
          exportButton={exportButton}
          selectedRows={selectedRows}
          exportAllButton={exportAllButton}
        />
      </div>
    </>
  );
};

export default TeachersList;
