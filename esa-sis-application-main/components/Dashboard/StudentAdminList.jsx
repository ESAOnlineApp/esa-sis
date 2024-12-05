/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
// import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// import PersonOffIcon from "@mui/icons-material/PersonOff";
import React from 'react';
import { useState } from 'react';
// import Link from 'next/link';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
// import moment from 'moment';
import axios from 'axios';

import selection_data from '../../utilities/selection_data';

// import { LowerButtons } from './LowerButtons';

// import exportSelect from '../../utilities/ExcelExport/exportSelect';

// import exportAll from '../../utilities/ExcelExport/exportAll';

import {
  // WarningMessageCancleIncomplete,
  WarningMessageIncomplete,
  WarningMessageObsolote,
  ReasonForDeactivation,
  ReasonForActivation,
  // ReasonForHolding,
} from './WarningMessage';
// import decrypt from '../../utilities/encrypt_decrypt/decryptText';
import { useSession } from 'next-auth/react';
import CustomPagination from './Pagination';

// import { Pagination, Stack } from '@mui/material';

const TeachersList = ({ users, setUsers }) => {
  const [pageSize, setPageSize] = useState(10);
  const [message, setMessage] = useState('');
  // const statusData = selection_data.application_status_inList;
  // const majorData = selection_data.Academic_program_inList;
  // const [majorEnable, setMajorEnable] = useState(null);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [confirmOpenIncomplete, setConfirmOpenIncomplete] = useState(false);
  const [confirmOpenDelete, setConfirmOpenDelete] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [reasons, setReasons] = useState('');
  const [confirmActivation, setconfirmActivation] = useState(false);
  const [resultForActivation, setResultForActivation] = useState(false);
  const [status, setStatus] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);
  const { data: session } = useSession();

  //incomplete modal
  const handleConfirmIncomplete = (user) => {
    setSelectedUser(user);
    setResultForActivation(true);
  };

  const handleConfirmClose = () =>
    // user
    {
      setConfirmOpenIncomplete(false);
      setConfirmOpenDelete(false);
      setconfirmActivation(false);
      setResultForActivation(false);
    };

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}-${hours}:${minutes}`;
    return formattedDate;
  }
  const handleSave = async (user) => {
    let sendData = {
      student_id: user.student_id,
      status: status,
    };
    axios
      .post(
        '/api/admin/adminApi/updateStudent',
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
        // console.log('=============');
        // console.log(response.data);
        // console.log('=============');
        setMessage('User Status Changed Successfully!');

        //Update the user's status and major in the table
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.student_id === user.student_id
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

    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate);
    // console.log(formattedCurrentDate);
    let sendToLogs = {
      student_id: user.student_id,
      action: 'status',
      result: status,
      reason: reasons,
      done_by: session?.user.name,
      date_time: formattedCurrentDate,
    };

    axios.post('/api/admin/adminApi/addStudentActivityToLogs', sendToLogs);
  };

  const handleDelete = (user) => {
    let sendData = {
      student_id: user.student_id,
      status: user.status == 'active' ? 'inactive' : 'active',
    };
    axios
      .put(
        '/api/admin/adminApi/updateStudent',
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
        // console.log(response.data);
        setMessage('User Status Changed Succesfully!');

        //Update the user's status and major in the table
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.student_id === user.student_id
              ? {
                  ...u,
                  status: user.status == 'active' ? 'inactive' : 'active',
                }
              : u
          )
        );
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });

    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate);
    // console.log(formattedCurrentDate);
    let sendToLogs = {
      student_id: user.student_id,
      action: 'status',
      result: 'inactive',
      reason: reasons,
      done_by: session?.user.name,
      date_time: formattedCurrentDate,
    };

    axios.post('/api/admin/adminApi/addStudentActivityToLogs', sendToLogs);
  };

  const handleConfirm = () => {
    // handleEnable(selectedUser);
    handleSave(selectedUser);
    setConfirmOpenIncomplete(false);
  };
  const handleConfirmDelete = () => {
    handleDelete(selectedUser);
    // handleSave(selectedUser);
    setConfirmOpenDelete(false);
  };
  // eslint-disable-next-line no-unused-vars
  const handleConfirmActivation = (reason) => {
    setConfirmOpenDelete(true);
    setconfirmActivation(false);
  };
  // eslint-disable-next-line no-unused-vars
  const handleConfirmReason = (reason) => {
    setConfirmOpenIncomplete(true);
    setResultForActivation(false);
  };

  setTimeout(() => {
    setMessage('');
  }, selection_data.message_disapear_timing);

  const statusData = ['active', 'inactive', 'hold'];
  const columns = [
    {
      field: 'student_id',
      headerName: 'ID',
      headerAlign: 'center',
      align: 'center',
      width: 90,
    },

    {
      headerName: 'Name',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      renderCell: (params) =>
        `${params.row.student_firstname || ''} ${
          params.row.student_lastname || ''
        }`,
    },

    {
      field: 'major_name',
      headerName: 'Major',
      headerAlign: 'center',
      align: 'center',
      width: 400,
    },

    {
      field: 'status',
      headerName: 'Status',
      headerAlign: 'center',
      align: 'center',
      width: 100,
      editable: true,
      cellClassName: (params) =>
        params.row.status === 'active'
          ? 'text-green-600 font-bold'
          : params.row.status === 'inactive'
          ? 'text-red-600 font-bold'
          : '' || params.row.status === 'hold'
          ? 'text-yellow-900 font-bold'
          : '' || params.row.status === 'limited'
          ? 'text-blue-700 font-bold'
          : '',
      type: 'singleSelect',
      valueOptions: statusData,
    },
    {
      field: 'promotion',
      headerName: 'promotion',
      headerAlign: 'center',
      align: 'center',
      width: 100,
    },

    {
      field: 'action',
      headerName: 'Change Status',
      width: `${session.user.role === '0' ? 300 : 150}`,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        if (params.row.status === 'limited') {
          return null; // Don't render the column when status is limited
        }

        return (
          <div className="flex gap-2">
            {/* old buttons */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setStatus(params.row.status);
                handleConfirmIncomplete(params.row);
              }}
              className="primary-button hover:text-white"
            >
              Save
            </button>
          </div>
        );
      },
    },
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
      {confirmOpenIncomplete && (
        <WarningMessageIncomplete
          confirmOpenIncomplete={confirmOpenIncomplete}
          handleConfirmClose={handleConfirmClose}
          handleConfirm={handleConfirm}
        />
      )}
      {confirmOpenDelete && (
        <WarningMessageObsolote
          confirmOpenObsolote={confirmOpenDelete}
          handleConfirmClose={handleConfirmClose}
          handleConfirm={handleConfirmDelete}
        />
      )}
      {confirmActivation && (
        <ReasonForDeactivation
          confirmOpenIncomplete={confirmActivation}
          handleConfirmClose={handleConfirmClose}
          handleConfirm={handleConfirmActivation}
        />
      )}
      {resultForActivation && (
        <ReasonForActivation
          confirmOpenIncomplete={resultForActivation}
          handleConfirmClose={handleConfirmClose}
          handleConfirm={handleConfirmReason}
        />
      )}
      <div className="text-center text-red-500 font-bold p-2">{message}</div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(r) => r.student_id}
          rows={users}
          getRowHeight={() => 'auto'}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15, 20]}
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

export default TeachersList;
