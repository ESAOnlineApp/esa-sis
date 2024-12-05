/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from 'react';
import { useState } from 'react';
// import Link from 'next/link';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
// import moment from 'moment';
import axios from 'axios';
import selection_data from '../../utilities/selection_data';
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
import { useSession } from 'next-auth/react';
import CustomPagination from './Pagination';

const RequestList = ({ users, setUsers }) => {
  
  const [pageSize, setPageSize] = useState(10);
  const [message, setMessage] = useState('');
  // const [status, setStatus] = useState('');
  //   const statusData = selection_data.application_status_inList;
  //   const majorData = selection_data.Academic_program_inList;
  // const [majorEnable, setMajorEnable] = useState(null);
  // const [selectedRows, setSelectedRows] = useState([]);
  // const [confirmOpenIncomplete, setConfirmOpenIncomplete] = useState(false);
  // const [confirmOpenObsolote, setConfirmOpenObsolote] = useState(false);
  // const [cancleIncomplete, setCancleIncomplete] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);
  const { data: session } = useSession();
  const statusData = ['pending', 'sent'];
  const handleSave = async (user) => {
    let sendData = {
      req_id: user.req_id,
      status: user.status,
    };
    // console.log("sendData", sendData);
    axios
      .post(
        '/api/pmApi/updateReqStatus',
        sendData
        // {
        //   data: encrypt(
        //     JSON.stringify({
        //       pm_id: user.pm_id,
        //       pm_status: 'inactive',
        //     }
        //     )
        //   ),
        // }
      )
      .then(() => {
        // Handle success
        
        setMessage('User Status Changed Successfully!');

        //Update the user's status and major in the table
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.req_id === user.req_id
              ? {
                  ...u,
                  status: user.status,
                }
              : u
          )
        );
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  setTimeout(() => {
    setMessage('');
  }, selection_data.message_disapear_timing);
  const excludedStatuses = ['', 'active', 'hold', 'limit'];

  // Check if the "status" is not in the excluded statuses list
  // eslint-disable-next-line no-unused-vars
  const shouldIncludeGraduatedYear = (user) => {
    // Ensure that the user object has a "status" field
    if (user && user.status) {
      return !excludedStatuses.includes(user.status);
    }
    // If "status" is not defined in the user object, exclude by default
    return false;
  };

  // Define the initial columns array with common columns
  const columns = [
    {
      field: 'req_id',
      headerName: 'ID',
      headerAlign: 'center',
      align: 'center',
      width: 90,
    },

    {
      field: 'student_id',
      headerName: 'Student ID',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      // renderCell: (params) =>
      //   `${params.row.student_lastname || ''}`,
    },
    {
      field: 'gpa',
      headerName: 'GPA',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      // renderCell: (params) =>
      //   `${params.row.student_lastname || ''}`,
    },
    {
      field: 'type',
      headerName: 'Type',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      // renderCell: (params) =>
      //   `${params.row.student_lastname || ''}`,
    },
    {
      field: 'student_email',
      headerName: 'Student Email',
      headerAlign: 'center',
      align: 'center',
      width: 200,
      // renderCell: (params) =>
      //   `${params.row.student_firstname || ''}`,
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

    // {
    //   field: "major_name",
    //   headerName: "Major",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 200,
    //   editable: true,
    //   type: "singleSelect",
    //   valueOptions: majorData,
    // },
    {
      field: 'promotion',
      headerName: 'Promotion',
      headerAlign: 'center',
      align: 'center',
      width: 90,
    },
    {
      field: 'status',
      headerName: 'Status',
      headerAlign: 'center',
      align: 'center',
      width: 100,
      editable: true,
      cellClassName: (params) =>
        params.row.status === 'pending'
          ? 'text-yellow-600 font-bold'
          : 'text-green-600 font-bold',
      type: 'singleSelect',
      valueOptions: statusData,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: `${session.user.role === '0' ? 400 : 150}`,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            disabled={params.row.admin_status == 'active' ? true : false}
            className="primary-button hover:text-white"
            onClick={(e) => {
              e.preventDefault();
              
             
              handleSave(params.row);
            }}
            type="button"
          >
            Save
          </button>
        </div>
      ),
    },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 150,
    // },
    // {
    //   field: "mobile_number",
    //   headerName: "Mobile Number",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 150,
    // },
  ];

  // Create a new columns array based on the conditions
  //   const columns = shouldIncludeGraduatedYear(users[0]) // Check with the first user
  //     ? [
  //         ...commonColumns, // Include common columns
  //         // {
  //         //   field: "graduated_year",
  //         //   headerName: "Graduated Year",
  //         //   headerAlign: "center",
  //         //   align: "center",
  //         //   width: 150,
  //         // },
  //       ]
  //     : commonColumns; // Exclude "graduated_year" column

  // Now the "columns" array will only include "graduated_year" for users with valid statuses

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

  // // export all to excel
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
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(r) => r.req_id}
          rows={users}
          getRowHeight={() => 'auto'}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15, 20]}
          pagination
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

      {/* <div className="grid lg:grid-cols-1 p-5 shadow-sm">
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

export default RequestList;
