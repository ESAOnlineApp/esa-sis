/*
 * Created By: hareb batoul
 * Project: SIS Application
 * File: components\Admin\AccountList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2024 ESA
 */
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import React from 'react';
import { useState } from 'react';
// import Link from 'next/link';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
// import moment from 'moment';
import axios from 'axios';
// import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
// import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import selection_data from '../../utilities/selection_data';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import encrypt from '../../utilities/encrypt_decrypt/encryptText';
// import major_code from '../../utilities/major_code';
// import { LowerButtons } from './LowerButtons';
// import AddIcon from '@mui/icons-material/Add';
// import exportSelect from '../../utilities/ExcelExport/exportSelect';
import generatePasswod from '../../utilities/generatePassword';
import bcryptjs from 'bcryptjs';
// import exportAll from '../../utilities/ExcelExport/exportAll';
// import EmailAfterChangMajor from '../../utilities/emailing/emailAfterChangeMajor';
import {
  WarningMessageChange,
  // WarningMessageCancleIncomplete,
  WarningMessageIncomplete,
  WarningMessageObsolote,
} from './WarningMessage';
// import decrypt from '../../utilities/encrypt_decrypt/decryptText';
import { useSession } from 'next-auth/react';
import CustomPagination from './Pagination';

// import { Pagination, Stack } from '@mui/material';

const TeachersList = ({ users, setUsers , major  }) => {
  const [pageSize, setPageSize] = useState(10);
  const [message, setMessage] = useState('');
  // const statusData = selection_data.application_status_inList;
  // const majorData = selection_data.Academic_program_inList;
  // const [majorEnable, setMajorEnable] = useState(null);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [confirmOpenIncomplete, setConfirmOpenIncomplete] = useState(false);
  const [confirmOpenDelete, setConfirmOpenDelete] = useState(false);
  // const [confirmOpenObsolote, setConfirmOpenObsolote] = useState(false);
  // const [cancleIncomplete, setCancleIncomplete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: session } = useSession();
  const [confirmOpenChange, setConfirmOpenChange] = useState(false);
  const [majorId , setMajorId] = useState()
  const [majorChangeName , setMajorNameChange] = useState()



  //incomplete modal
  const handleConfirmIncomplete = (user) => {
    setSelectedUser(user);
    setConfirmOpenIncomplete(true);
  };
  const handleConfirmDel = (user) => {
    setSelectedUser(user);
    setConfirmOpenDelete(true);
  };

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

  const handleConfirmClose = (user) => {
    setConfirmOpenIncomplete(false);
    setConfirmOpenDelete(false);
    setConfirmOpenChange(false)
    // setConfirmOpenObsolote(false);
    // setCancleIncomplete(false);
    const prevStatus = users.find((u) => u.ID === user.ID)?.status;
    // console.log("prevStatus",prevStatus)
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.ID === user.ID ? { ...u, status: prevStatus } : u
      )
    );
  };

  const handleSave = async (user) => {
    let sendData = {
      pm_id: user.pm_id,
      pm_status: user.pm_status == 'active' ? 'inactive' : 'active',
      note: 'test',
    };
    axios
      .post(
        '/api/admin/adminApi/updatePm',
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
      .then((response) => {
        // Handle success
       
        setMessage('User Status Changed Succesfully!' );
        console.log(response)

        //Update the user's status and major in the table
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.pm_id === user.pm_id
              ? {
                  ...u,
                  pm_status: user.pm_status == 'active' ? 'inactive' : 'active',
                }
              : u
          )
        );
      })
      .catch((error) => {
        // Handle error
        return error
      });
  };
  const handleEnable = async (user) => {
    
    let genPassword = generatePasswod(8);
    const salt = await bcryptjs.genSalt(8);
    const genPass = await bcryptjs.hash(genPassword, salt);
    let sendData = {
      pm_id: user.pm_id,
      userpassword: genPass,
      password :genPassword , 
      pm_first_name :user.pm_firstname,
      email:user.pm_email,
      role:'Program Manager'
    };
    axios
      .post(
        '/api/admin/adminApi/enablepm',
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
      .then((response) => {
        // Handle success
       console.log(response)
        setMessage('User Status Changed Succesfully!');

        //Update the user's status and major in the table
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.pm_id === user.pm_id
              ? {
                  ...u,
                  pm_status: user.pm_status == 'active' ? 'inactive' : 'active',
                  note: `the current password is: ${genPassword}`,
                }
              : u
          )
        );
        setTimeout(() => {
          setUsers(prevUsers => prevUsers.filter(u => u.pm_status === 'inactive'));
        }, 10000); // 10000 milliseconds = 10 seconds
      })
      .catch((error) => {
        // Handle error
        return error
      });
  };
  const handleDelete = (user) => {
    let sendData = {
      pm_id: user.pm_id,
    };

    axios
      .post(
        '/api/admin/adminApi/deletePm',
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
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        

        //Update the user's status and major in the table
        setTimeout(() => {
          setUsers(prevUsers => prevUsers.filter(u => u.pm_status === 'active'));
        }, 1000); // 10000 milliseconds = 10 seconds
    
        // Handle success
        // console.log(response.data);
        setMessage('User deleted Succesfully!');

        
      })
      .catch((error) => {
        // Handle error
        return error
      });
  };


  const handleConfirm = () => {
    handleEnable(selectedUser);
    handleSave(selectedUser);
    setConfirmOpenIncomplete(false);
    // setConfirmOpenObsolote(false);
    // setCancleIncomplete(false);
  };
  const handleConfirmDelete = () => {
    handleDelete(selectedUser);
    handleSave(selectedUser);
    setConfirmOpenDelete(false);
    // setConfirmOpenObsolote(false);
    // setCancleIncomplete(false);
  };
  const handleSaveChange = (user) => {
    setSelectedUser(user);
    setConfirmOpenChange(true);
  };
  const handleEditCellChange = (params) => {
    const { field, value } = params;
   
  if (field === "combined_major_names") {

    setMajorId(value);
    const majorName = major.find(majors =>  majors.major_id === value);
    setMajorNameChange(majorName.major_name)
    }
  };
  const handleAddMajor = async()=>{
    try {
      const payload = {
        pm_id : selectedUser.pm_id,
        major_id:majorId

      }
     
      const response = await axios.post(`/api/admin/adminApi/assignMajorPM`, payload);
      if (response.data.success) {
        setConfirmOpenChange(false)
        setMessage(response.data.message);
      }
    } catch (error) {
      return error
    }
  }
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
      field: 'combined_major_names',
      headerName: 'Major',
      headerAlign: 'center',
      align: 'center',
      width: 300,
      editable: true,
      type: "singleSelect",
      valueOptions: major.map((majors) => ({
        value: majors.major_id,
        label: majors.major_name,
      })),
      valueGetter: (params) => {
        const selectedMajorId = params.value;
        const selectedMajor = major.find(major => major.major_id === selectedMajorId);
        return selectedMajor ? selectedMajor.major_name : selectedMajorId;
      }
    },

    {
      field: 'pm_email',
      headerName: 'E-mail',
      headerAlign: 'center',
      align: 'center',
      width: 350,
      type: 'singleSelect',
    },
    {
      field: 'pm_status',
      headerName: 'Status',
      headerAlign: 'center',
      align: 'center',
      width: 150,
    },

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

    {
      field: 'action',
      headerName: 'Action',
      width: `${session.user.role === '0' ? 350 : 150}`,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
       
        <div className="flex gap-2">
          <button
            disabled={params.row.pm_status == 'active' ? true : false}
            className="primary-button hover:text-white"
            onClick={() => {
              // handleSave(params.row)
              handleConfirmIncomplete(params.row);
           
            }}
            type="button"
          >
            <PersonAddAlt1Icon />
          </button>
          <button
            className="primary-button hover:text-white"
            disabled={params.row.pm_status == 'inactive' ? true : false}
            onClick={() => {
              // handleSave(params.row)
              // handleConfirmIncomplete(params.row)
              handleConfirmDel(params.row);
              // handleDelete(params.row)
            }}
            type="button"
          >
            <PersonRemoveIcon />
          </button>

          <button
            className="primary-button hover:text-white"
            
            onClick={() => {
              // handleSave(params.row)
              // handleConfirmIncomplete(params.row)
              handleSaveChange(params.row);
              // handleDelete(params.row)
            }}
            type="button"
          >
            <SaveOutlinedIcon />
          </button>
          {/* <Link
            className='text-black'
            target='_blank'
            href={`${params.row.reportURL}`}
          >
            <button
              className='primary-button hover:text-white'
              disabled={params.row.reportURL ? false : true}
              type='button'
            >
              Print
            </button>
          </Link> */}
          {/* <button
            className='primary-button hover:text-white'
            onClick={() => {
              const prevStatus = users.find(
                (u) => u.ID === params.row.ID
              )?.status;
              if (prevStatus === 'incomplete') {
                handleCancleIncomplete(params.row);
              } else if (params.row.status === 'incomplete') {
                handleConfirmIncomplete(params.row);
              } else if (params.row.status === 'obsolete') {
                handleConfirmObsolote(params.row);
              } else if (prevStatus === 'obsolete') {
                handleConfirmObsolote(params.row);
              } else {
                handleSave(params.row);
              }
            }}
            // disabled={params.id !== majorEnable}
            type='button'
            hidden={
              session.user.role === '2' || session.user.role === '3'
                ? true
                : false
            }
          >
            Deactivate
          </button> */}
        </div>
      ),
    },

    // {
    //   field: 'note',
    //   headerName: 'Notes',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 150,
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
  //       return error
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
  //       return error
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
           {confirmOpenChange && (
        <WarningMessageChange
          confirmOpenVerified={confirmOpenChange}
          handleConfirmClose={handleConfirmClose}
          handleConfirmVerified={handleAddMajor}
          selectedUser={selectedUser}
          majorName={majorChangeName}
          
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
          onCellEditCommit={handleEditCellChange} // Use the handleEditCellChange function
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
