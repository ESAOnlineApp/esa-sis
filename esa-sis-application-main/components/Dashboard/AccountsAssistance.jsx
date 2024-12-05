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
import axios from "axios";
import selection_data from "../../utilities/selection_data";
// import encrypt from '../../utilities/encrypt_decrypt/encryptText';
// import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
// import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
// import major_code from '../../utilities/major_code';
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import bcryptjs from "bcryptjs";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// import { LowerButtons } from "./LowerButtons";
// import exportSelect from "../../utilities/ExcelExport/exportSelect";
import generatePasswod from "../../utilities/generatePassword";
// import exportAll from "../../utilities/ExcelExport/exportAll";
// import EmailAfterChangMajor from '../../utilities/emailing/emailAfterChangeMajor';
import {
  // WarningMessageCancleIncomplete,
  WarningMessageIncomplete,
  WarningMessageObsolote,
} from "./WarningMessage";
// import decrypt from "../../utilities/encrypt_decrypt/decryptText";
import { useSession } from "next-auth/react";
import CustomPagination from "./Pagination";

// import { Pagination, Stack } from '@mui/material';

const TeachersList = ({ assistance, setAssistance }) => {
  const [pageSize, setPageSize] = useState(10);
  const [message, setMessage] = useState("");
  // const statusData = selection_data.application_status_inList;
  // const majorData = selection_data.Academic_program_inList;
  // const [majorEnable, setMajorEnable] = useState(null);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [confirmOpenIncomplete, setConfirmOpenIncomplete] = useState(false);
  // const [ setConfirmOpenObsolote] = useState(false);
  // const [setCancleIncomplete] = useState(false);
  const [confirmOpenDelete, setConfirmOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: session } = useSession();

  //incomplete modal
  const handleConfirmIncomplete = (user) => {
    setSelectedUser(user);
    setConfirmOpenIncomplete(true);
  };
  const handleConfirmDelete = () => {
    handleDelete(selectedUser);
    handleSave(selectedUser);
    setConfirmOpenDelete(false);
    // setConfirmOpenObsolote(false);
    // setCancleIncomplete(false);
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
  //   const prevStatus = assistance.find((u) => u.ID === user.ID)?.status;
  //   // // console.log("prevStatus",prevStatus)
  //   setAssistance((prevUsers) =>
  //     prevUsers.map((u) =>
  //       u.ID === user.ID ? { ...u, status: prevStatus } : u
  //     )
  //   );
  // };

  const handleConfirmClose = (user) => {
    setConfirmOpenIncomplete(false);
    // setConfirmOpenObsolote(false);
    setConfirmOpenDelete(false);
    // setCancleIncomplete(false);
    const prevStatus = assistance.find((u) => u.ID === user.ID)?.status;
    // // console.log("prevStatus",prevStatus)
    setAssistance((prevUsers) =>
      prevUsers.map((u) =>
        u.ID === user.ID ? { ...u, status: prevStatus } : u
      )
    );
  };

  const handleSave = (user) => {
    let sendData = {
      pm_ass_id: user.pm_ass_id,
      pm_ass_status: user.pm_ass_status == "active" ? "inactive" : "active",
    };
    axios
      .post("/api/admin/adminApi/updateAssistance", sendData)
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        // Handle success
        
        setMessage("User Status Changed Successfully!");

        //Update the user's status and major in the table
        setAssistance((prevUsers) =>
          prevUsers.map((u) =>
            u.pm_ass_id === user.pm_ass_id
              ? {
                  ...u,
                  pm_ass_status:
                    user.pm_ass_status == "active" ? "inactive" : "active",
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
      pm_ass_id: user.pm_ass_id,
      userpassword: genPass,
      password :  genPassword,
      name : user.pm_ass_firstname,
      email:user.pm_ass_email,
      role:'Program Manager Assistance'
    };
    axios
      .post("/api/admin/adminApi/enableAs", sendData)
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        // Handle success
        
        setMessage('User Status Changed Succesfully!');

        //Update the user's status and major in the table
        setAssistance((prevUsers) =>
          prevUsers.map((u) =>
            u.pm_ass_id === user.pm_ass_id
              ? {
                  ...u,
                  pm_ass_status: user.pm_ass_status == 'active' ? 'inactive' : 'active',
                  note: `the current password is: ${genPassword}`,
                }
              : u
          ))
        
        setMessage("User Status Changed Successfully!");

        //Update the user's status and major in the table
        setTimeout(() => {
          setAssistance(prevUsers => prevUsers.filter(u => u.pm_ass_status === 'inactive'));
        }, 10000); // 10000 milliseconds = 10 seconds
    
      })
      .catch((error) => {
        // Handle error
        return error
      });
  };
  const handleDelete = async (user) => {
    let sendData = {
      pm_id: user.pm_ass_id,
    };
    axios
      .post(
        "/api/admin/adminApi/deletePm",
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
        // Handle success
        setTimeout(() => {
          setAssistance(prevUsers => prevUsers.filter(u => u.pm_ass_status
            === 'active'));
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
  // console.log(assistance)
  const handleConfirmDel = (user) => {
    setSelectedUser(user);
    setConfirmOpenDelete(true);
  };
  const handleConfirm = () => {
    handleSave(selectedUser);
    handleEnable(selectedUser);
    setConfirmOpenIncomplete(false);
    // setConfirmOpenObsolote(false);
    // setCancleIncomplete(false);
  };
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
  //       // console.log(response.data);
  //       //// console.log(response.data.defaultpassword)
  //       //// console.log(response.data.newID)
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
  //       // console.log(error.response.data);
  //     });
  // };

  setTimeout(() => {
    setMessage("");
  }, selection_data.message_disapear_timing);

  const columns = [
    {
      field: "pm_ass_id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 150,
    },

    {
      field: "Name",
      headerName: "Name",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) =>
        `${params.row.pm_ass_firstname || ""} ${
          params.row.pm_ass_lastname || ""
        }`,
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
      field: "combined_major_names",
      headerName: "Major",
      headerAlign: "center",
      align: "center",
      width:300,
    },

    {
      field: "pm_ass_email",
      headerName: "E-mail",
      headerAlign: "center",
      align: "center",
      width: 350,
      type: "singleSelect",
    },
    {
      field: "pm_ass_status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
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
      field: "action",
      headerName: "Action",
      width: `${session.user.role === "0" ? 300 : 150}`,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            className="primary-button hover:text-white"
            disabled={params.row.pm_ass_status == "active" ? true : false}
            onClick={() => {
              // const prevStatus = assistance.find(
              //   (u) => u.pm_ass_id === params.row.pm_ass_id
              // )?.pm_ass_status;
              // handleSave(params.row)
              // handleConfirmIncomplete(params.row)
              handleConfirmIncomplete(params.row);
            }}
            type="button"
          >
            <PersonAddAlt1Icon />
          </button>
          <button
            className="primary-button hover:text-white"
            disabled={params.row.pm_ass_status == "inactive" ? true : false}
            onClick={() => {
              // const prevStatus = assistance.find(
              //   (u) => u.pm_ass_id === params.row.pm_ass_id
              // )?.pm_ass_status;
              // handleSave(params.row)
              // handleConfirmIncomplete(params.row)
              handleConfirmDel(params.row);
            }}
            type="button"
          >
            <PersonRemoveIcon />
          </button>
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
  //   if (assistance.length > 0) {
  //     try {
  //       const response = await axios.get("/api/admin/listusers/listexport");
  //       const incomingData = JSON.parse(decrypt(response.data.data));
  //       if (response.status === 200) {
  //         // // console.log('response', response);
  //         // // console.log('incomingData', incomingData);
  //         await exportSelect(selectedRows, incomingData, session);
  //       } else {
  //         setAssistance([]);
  //       }
  //     } catch (error) {
  //       return error
  //     }
  //   }
  // };

  // // export all to excel
  // const exportAllButton = async () => {
  //   if (assistance.length > 0) {
  //     try {
  //       const response = await axios.get("/api/admin/listusers/listexport");
  //       const incomingData = JSON.parse(decrypt(response.data.data));
  //       if (response.status === 200) {
  //         // // console.log('response', response);
  //         // // console.log('incomingData', incomingData);
  //         await exportAll(incomingData, session);
  //       } else {
  //         setAssistance([]);
  //       }
  //     } catch (error) {
  //       return error
  //     }
  //   }
  // };
  // const handlePrintSelected = () => {
  //   const selectedIDs = selectedRows;
  //   // // console.log('selectedIDs', selectedIDs);
  //   const selectedUsers = assistance.filter((user) =>
  //     selectedIDs.includes(user.ID)
  //   );
  //   // // console.log('selectedUsersbefore', selectedUsers);
  //   selectedUsers.forEach((user) => {
  //     if (user.reportURL) {
  //       window.open(user.reportURL);
  //     } else {
  //       setMessage("Please select a user with a report");
  //     }
  //   });

  //   // // console.log('selectedUsers', selectedUsers);
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
      <div className="text-center text-red-500 font-bold p-2">{message}</div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(r) => r.pm_ass_id}
          rows={assistance}
          getRowHeight={() => "auto"}
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
