/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
//AtendanceStudentList.jsx

import React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import moment from 'moment';

import CustomPagination from './Pagination';


const AttendanceStudentList = ({ users }) => {


  const [pageSize, setPageSize] = useState(10);
  // const [selectedRows, setSelectedRows] = useState([]);

  //   sort by date
  const sortedUsers = [...users].sort((a, b) =>
    moment(b.attendance_date).diff(moment(a.attendance_date))
  );

  const columns = [

    {
      field: 'teacher_firstname',
      headerName: 'First Name',
      headerAlign: 'center',
      align: 'center',
      width: 150,



    },
    {
      field: 'teacher_lastname',
      headerName: 'Last Name',
      headerAlign: 'center',
      align: 'center',
      width: 150,



    },

    // {
    //   field: 'major_name',
    //   headerName: 'Major Name',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 200,
    // },

    {
      field: 'course_name',
      headerName: 'Course Name',
      headerAlign: 'center',
      align: 'center',
      width: 150,
    },

    {
      field: 'attendance_date',
      headerName: 'Attendance Date',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      valueFormatter: params =>
        moment(params?.value).format("DD/MM/YYYY"),
    },
    // {
    //     field: 'present',
    //     headerName: 'Present',
    //     headerAlign: 'center',
    //     align: 'center',
    //     width: 120,
    //     cellClassName: (params) =>
    //     params.row.present === false
    //       ? 'text-red-600 font-bold'
    //       : params.row.present === true
    //         ? 'text-green-600 font-bold'
    //         : '',
    //   },

    {
      field: 'present',
      headerName: 'Present',
      headerAlign: 'center',
      align: 'center',
      width: 120,
      renderCell: (params) => {
        // Get the current date in GMT+0000 (UTC) timezone
        const now = new Date();
        const midnightUTC = new Date(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate()
        );

        // Assuming params.row.attendance_date is a date string in the format "YYYY-MM-DD"
        const attendanceDate = new Date(params.row.attendance_date);
        const attendanceDateMidnight = new Date(
          attendanceDate.getFullYear(),
          attendanceDate.getMonth(),
          attendanceDate.getDate()
        );

      



        return attendanceDateMidnight >= midnightUTC ? <p className='text-blue-600 font-bold'>Pending</p> : params.value ? <p className='text-green-600 font-bold'>Present</p> : <p className='text-red-600 font-bold'>Absent</p>;
      },
      cellClassName: (params) => {

        // const value = params.value;
        // const attendanceDate = new Date(params.row.attendance_date).getDate();

        params.row.present === false
          ? 'text-red-600 font-bold'
          : params.row.present === true
            ? 'text-green-600 font-bold'
            : ''

      },
    },

    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   width: `${session.user.role === '2' ? 300 : 150}`,
    //   headerAlign: 'center',
    //   align: 'center',
    //   sortable: false,
    //   renderCell: (params) => (
    //     <div className='flex gap-2'>
    //       <button
    //         className='primary-button hover:text-white'
    //         onClick={() => { handleShowAll(params.row),getDetails(params.row) ,setEditModal(true) }}
    //         // disabled={params.id !== presentEnable}
    //         type='button'
    //         hidden={
    //           session.user.role === '1' || session.user.role === '3'
    //             ? true
    //             : false
    //         }
    //       >
    //         Edit
    //       </button>

    //       <button
    //         className='primary-button hover:text-white'
    //         type='button'
    //         onClick={()=>{getDetails(params.row),setShowPrint(true)}}

    //       >
    //             Print

    //       </button>
    //       {/* <Link
    //         className='text-black'
    //         target='_blank'
    //         href={`${params.row.reportURL}`}
    //         // href={downloadPDF}

    //       > */}
    //         <button
    //           className='primary-button hover:text-white'
    //           type='button'
    //           onClick={()=>{ handleShowAll(params.row),getDetails(params.row) , setShowArchive(true)}}
    //         >
    //           Archive
    //         </button>

    //       {/* </Link> */}
    //       {/* <button
    //         className='primary-button hover:text-white'
    //         onClick={() => handleChangeMajor(params.row)}
    //         disabled={params.id !== majorEnable}
    //         type='button'
    //         hidden={
    //           session.user.role === '1' || session.user.role === '3'
    //             ? true
    //             : false
    //         }
    //       >
    //         Change Major
    //       </button> */}
    //     </div>
    //   ),
    // },

  ];


  return (
    <>
      {/* <div className='text-center text-red-500 font-bold p-2'>{message}</div> */}
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(r) => r.attendance_id}
          rows={sortedUsers}
          getRowHeight={() => 'auto'}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15, 20]}

          checkboxSelection
          // onSelectionModelChange={setSelectedRows}
          disableSelectionOnClick
          components={{
            NoRowsOverlay: () => (
              <div className='grid h-[100%] place-items-center'>No Data</div>
            ),
            Pagination: CustomPagination,
          }}

        />
      </Box>
    </>
  );
};

export default AttendanceStudentList;
