/*
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import selection_data from '../../utilities/selection_data';
// import generatePasswod from '../../utilities/generatePassword';
// import bcryptjs from 'bcryptjs';
import { useSession } from 'next-auth/react';
import CustomPagination from './Pagination';
import ResetPassComponent from '../ResetPassComponent';

const AccountsListResetPassword = ({ users }) => {
  const [pageSize, setPageSize] = useState(10);
  const [message, setMessage] = useState('');
  // const [confirmOpenIncomplete, setConfirmOpenIncomplete] = useState(false);
  const [confirmOpenDelete, setConfirmOpenDelete] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);
  const [openChangePass, setOpenChangePass] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);

  //incomplete modal
  // const handleConfirmIncomplete = (user) => {
  //   setSelectedUser(user);
  //   setConfirmOpenIncomplete(true);
  // };
  // const handleConfirmDel = (user) => {
  //   setSelectedUser(user);
  //   setConfirmOpenDelete(true);
  // };

  const handleChangePass = async () => {
    // alert('the password changed successfully')
    setLoading(true);
    try {
      const result = await axios.post('/api/user/password/adminchangepassword', {
        userid: id,
        password: newPass,
      });
      setLoading(false);
      setSuccess(result.data.message);
      setError('');
      setIsSuccess(true);
    } catch (e) {
      setError(e.response.data.message);
      setIsSuccess(false);
      setLoading(false);
      setSuccess('');
    }
  };
  const handleCancel = () => {
    setOpenChangePass(!openChangePass);
    setConfirmOpenDelete(!confirmOpenDelete);
    setError(''); 
    setSuccess('');
    setNewPass('');
  };
  // const handleConfirmClose = (user) => {
  //   setConfirmOpenIncomplete(false);
  //   setConfirmOpenDelete(false);
  //   // setConfirmOpenObsolote(false);
  //   // setCancleIncomplete(false);
  //   const prevStatus = users.find((u) => u.ID === user.ID)?.status;
  //   // console.log("prevStatus",prevStatus)
  //   setUsers((prevUsers) =>
  //     prevUsers.map((u) =>
  //       u.ID === user.ID ? { ...u, status: prevStatus } : u
  //     )
  //   );
  // };

  // const handleEnable = async (event) => {
  //   try {
  //     console.log(event, 'events');
  //     let genPassword = generatePasswod(8);
  //     const salt = await bcryptjs.genSalt(8);
  //     const genPass = await bcryptjs.hash(genPassword, salt);

  //     let sendData = {
  //       pm_id: event.pm_id,
  //       userpassword: genPass,
  //       password: genPassword,
  //       pm_first_name: event.pm_firstname,
  //       email: event.pm_email,
  //       role: 'Program Manager',
  //     };

  //     await axios.post('/api/admin/adminApi/enablepm', sendData);

  //     setMessage('User Status Changed Successfully!');

  //     //Update the user's status and major in the table
  //     setUsers((prevUsers) =>
  //       prevUsers.map((u) =>
  //         u.pm_id === event.pm_id
  //           ? {
  //               ...u,
  //               pm_status: event.pm_status == 'active' ? 'inactive' : 'active',
  //               note: `the current password is: ${genPassword}`,
  //             }
  //           : u
  //       )
  //     );
  //     setTimeout(() => {
  //       setUsers((prevUsers) =>
  //         prevUsers.filter((u) => u.pm_status === 'inactive')
  //       );
  //     }, 10000); // 10000 milliseconds = 10 seconds
  //   } catch (error) {
  //     return error;
  //   }
  // };
  // const handleSave = async (event) => {
  //   try {
  //     const payload = {
  //       pm_id: event.pm_id,
  //       pm_status: event.pm_status == 'active' ? 'inactive' : 'active',
  //     };

  //     await axios.post('/api/admin/adminApi/updatePm', payload);
  //     //Update the user's status and major in the table
  //     setUsers((prevUsers) =>
  //       prevUsers.map((u) =>
  //         u.pm_id === event.pm_id
  //           ? {
  //               ...u,
  //               pm_status: event.pm_status == 'active' ? 'inactive' : 'active',
  //             }
  //           : u
  //       )
  //     );
  //   } catch (error) {
  //     return error;
  //   }
  // };
  // const handleDelete = async (event) => {
  //   try {
  //     const payload = {
  //       pm_id: event.pm_id,
  //     };
  //     await axios.post('/api/admin/adminApi/deletePm', payload);

  //     setTimeout(() => {
  //       setUsers((prevUsers) =>
  //         prevUsers.filter((u) => u.pm_status === 'active')
  //       );
  //     }, 1000); // 10000 milliseconds = 10 seconds

  //     // Handle success
  //     // console.log(response.data);
  //     setMessage('User deleted successfully!');
  //   } catch (error) {
  //     return error;
  //   }
  // };

  // const handleConfirm = () => {
  //   handleEnable(selectedUser);
  //   handleSave(selectedUser);
  //   setConfirmOpenIncomplete(false);
  //   // setConfirmOpenObsolote(false);
  //   // setCancleIncomplete(false);
  // };
  // const handleConfirmDelete = () => {
  //   handleDelete(selectedUser);
  //   handleSave(selectedUser);
  //   setConfirmOpenDelete(false);
  //   // setConfirmOpenObsolote(false);
  //   // setCancleIncomplete(false);
  // };

  setTimeout(() => {
    setMessage('');
  }, selection_data.message_disapear_timing);

  const columns = [
    {
      field: 'pm_id',
      headerName: 'ID',
      headerAlign: 'center',
      align: 'center',
      width: 150,
    },

    {
      field: 'Name',
      headerName: 'Name',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      renderCell: (params) =>
        `${params.row.pm_firstname || ''} ${params.row.pm_lastname || ''}`,
    },
    {
      field: 'pm_email',
      headerName: 'E-mail',
      headerAlign: 'center',
      align: 'center',
      width: 200,
      type: 'singleSelect',
    },
    {
      field: 'pm_status',
      headerName: 'Status',
      headerAlign: 'center',
      align: 'center',
      width: 180,
    },

    {
      field: 'action',
      headerName: 'Action',
      width: `${session.user.role === '0' ? 400 : 150}`,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <button
          className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold"
          type="button"
          onClick={() => (setId(params.id), setOpenChangePass(true))}
        >
          Reset Password
        </button>
      ),
    },
  ];

  return (
    <>
      {openChangePass && (
        <ResetPassComponent
          id={id}
          newPass={newPass}
          setNewPass={setNewPass}
          handleChangePass={handleChangePass}
          handleCancel={handleCancel}
          loading={loading}
          error={error}
          success={success}
          isSuccess={isSuccess}
        />
      )}
      <div className="text-center text-red-500 font-bold p-2">{message}</div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(r) => r.pm_id}
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

      <div className="grid lg:grid-cols-1 p-5 shadow-sm"></div>
    </>
  );
};

export default AccountsListResetPassword;
