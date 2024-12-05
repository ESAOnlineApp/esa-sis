/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from "react";
import { useState  , useEffect} from "react";
// import Link from 'next/link';
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
// import moment from 'moment';
import * as XLSX from "xlsx";
import axios from "axios";
import selection_data from "../../utilities/selection_data";
// import encrypt from '../../utilities/encrypt_decrypt/encryptText';
// import major_code from '../../utilities/major_code';
// import { LowerButtons } from "./LowerButtons";
// import exportSelect from "../../utilities/ExcelExport/exportSelect";
// import exportAll from "../../utilities/ExcelExport/exportAll";
// import EmailAfterChangMajor from '../../utilities/emailing/emailAfterChangeMajor';
import { WarningConfirmChangeEmail } from "./WarningMessage";
// import decrypt from "../../utilities/encrypt_decrypt/decryptText";
import { useSession } from "next-auth/react";
import CustomPagination from "./Pagination";
import { ExportButtons } from "./ExportButtons";

const StudentsList = ({ users }) => {

  const [pageSize, setPageSize] = useState(10);
  const [message, setMessage] = useState("");
  // const statusData = selection_data.application_status_inList;
  const majorData = selection_data.Academic_program_inList;
  // const [majorEnable, setMajorEnable] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmOpenIncomplete, setConfirmOpenIncomplete] = useState(false);
  // const [confirmOpenObsolote, setConfirmOpenObsolote] = useState(false);
  // const [cancleIncomplete, setCancleIncomplete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [status , setStatus] = useState([])
  const [statusEdit , setStatusEdit] = useState('')
  const [Email , setEmail] = useState('')
  const [mobileNumber , setMobileNumber] = useState(null)
  const { data: session } = useSession();

  const handleConfirmClose = () => {
    setConfirmOpenIncomplete(false);
  };
  useEffect(()=>{
    handleShowAllType()
  },[])

  const handleShowAllType = async () => {
    try {
      let table = 'status';
      let { data } = await axios.post('/api/pmApi/getAll', { table });
      setStatus(data.rows);
    } catch (error) {
      return error
    }

  };
  const handleEditCellChange = (params) => {
    const { field, value } = params;

    // Check if the edited field is "grade" and update the edited grade value
    if (field === "status") {
      setStatusEdit(value);
    }
    if(field === 'mobile_number'){
      setMobileNumber(value)
    }
    if (field === "email") {
      setEmail(value);
    }
  };

  const handleConfirm = async () => {

    if (selectedUser.email != null) {
      let sendData = {
        email: Email,
        status:statusEdit ,
        mobile_number:mobileNumber,
        user_id: selectedUser.student_id,

      };
      const res = await axios.post(
        "/api/pmApi/updateStudentInfo",
        sendData
      );
      
      if (res.status === 200) {
        setMessage("Update Successfully!!!");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    }
    setConfirmOpenIncomplete(false);
  };

  const sendDataToModal = (users) => {
    // console.log("user", users);
    setConfirmOpenIncomplete(true);
    setSelectedUser(users);
  };

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
  //   // // console.log("prevStatus",prevStatus)
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
  //   // // console.log("prevStatus",prevStatus)
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
  const excludedStatuses = ["", "active", "hold", "limited" , "inactive"];

  // Check if the "status" is not in the excluded statuses list
  const shouldIncludeGraduatedYear = (user) => {
    // Ensure that the user object has a "status" field
    if (user && user.status) {
      return !excludedStatuses.includes(user.status);
    }
    // If "status" is not defined in the user object, exclude by default
    return false;
  };

  // Define the initial columns array with common columns
  const commonColumns = [
    {
      field: "student_id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 90,
    },

    {
      field: "student_lastname",
      headerName: "Last Name",
      headerAlign: "center",
      align: "center",
      width: 150,
      // renderCell: (params) =>
      //   `${params.row.student_lastname || ''}`,
    },
    {
      field: "student_firstname",
      headerName: "First Name",
      headerAlign: "center",
      align: "center",
      width: 150,
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

    {
      field: "major_name",
      headerName: "Major",
      headerAlign: "center",
      align: "center",
      width: 200,
      editable: true,
      type: "singleSelect",
      valueOptions: majorData,
    },
    {
      field: "promotion",
      headerName: "Promotion",
      headerAlign: "center",
      align: "center",
      width: 90,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 100,
      type: "singleSelect",
      cellClassName: (params) =>
      params.row.status === "active"
        ? "text-green-600 font-bold"
        : params.row.status === "inactive"
        ? "text-red-600 font-bold"
        : "" || params.row.status === "limited"
        ? "text-blue-600 font-bold"
        : "" || params.row.status === "hold"
        ? "text-orange-600 font-bold"
        : "" || params.row.status === "Alumni"
        ? "text-green-600 font-bold"
        :"",
      editable:true,
       valueOptions: status.map((type) => ({
        value: type.status_name, 
        label: type.status_name,
      })),
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      width: 250,
      editable: true,
    },
    {
      field: "mobile_number",
      headerName: "Mobile Number",
      headerAlign: "center",
      align: "center",
      width: 150,
      editable:true
    },

  ];

  // Create a new columns array based on the conditions
  const columns = shouldIncludeGraduatedYear(users[0]) // Check with the first user
    ? [
        ...commonColumns, // Include common columns
        {
          field: "graduated_year",
          headerName: "Graduated Year",
          headerAlign: "center",
          align: "center",
          width: 150,
        },
        {
          field: "action",
          headerName: "Action",
          width: `${session.user.role === "0" ? 350 : 150}`,
          headerAlign: "center",
          align: "center",
          sortable: false,
          renderCell: (params) => (
            <div className="flex gap-2">
              <button
                className="primary-button hover:text-white"
                onClick={() => {
                  // console.log(params.row);
                  setStatusEdit(params.row.status)
                  setMobileNumber(params.row.mobile_number)
                  setEmail(params.row.email)
                  sendDataToModal(params.row);
                }}
                type="button"
              >
                Save
              </button>
            </div>
          ),
        },
      ]
    : [...commonColumns ,
    
      {
        field: "action",
        headerName: "Action",
        width: `${session.user.role === "0" ? 350 : 150}`,
        headerAlign: "center",
        align: "center",
        sortable: false,
        renderCell: (params) => (
          <div className="flex gap-2">
            <button
              className="primary-button hover:text-white"
              onClick={() => {
                // console.log(params.row);
                setStatusEdit(params.row.status)
                setMobileNumber(params.row.mobile_number)
                setEmail(params.row.email)
                sendDataToModal(params.row);
              }}
              type="button"
            >
              Save
            </button>
          </div>
        ),
      },
    ]; // Exclude "graduated_year" column

  // Now the "columns" array will only include "graduated_year" for users with valid statuses

  const exportButton = async () => {
    if (selectedRows.length > 0) {
      try {
        let selected = new Set(selectedRows)
        const filteredStudents = users.filter(student => selected.has(student.student_id));
      // Modify the data
      const modifiedData = filteredStudents.map((item) => ({
        ID: item.student_id,
        FirstName: item.student_firstname,
        LastName: item.student_lastname,
        Major: item.major_name,
        Promotion: item.promotion,
        Status: item.status,
        Email: item.email,
        'Mobile Number': item.mobile_number
      }));

      // Convert modified data to XLSX format
      const ws = XLSX.utils.json_to_sheet(modifiedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Student Report");
      const fileName = `Students-${session.user.majorName}-${Date.now()}.xlsx`;
      XLSX.writeFile(wb, fileName);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // export all to excel
  const exportAllButton = async () => {
    console.log('the users : ', users)
    if (users.length > 0) {
      try {
      // Modify the data
      const modifiedData = users.map((item) => ({
        ID: item.student_id,
        FirstName: item.student_firstname,
        LastName: item.student_lastname,
        Major: item.major_name,
        Promotion: item.promotion,
        Status: item.status,
        Email: item.email,
        'Mobile Number': item.mobile_number
      }));

      // Convert modified data to XLSX format
      const ws = XLSX.utils.json_to_sheet(modifiedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Student Report");

      // const attendanceDate = formatDate(data[0].attendance_date);
      const fileName = `Students-${session.user.majorName}-${Date.now()}.xlsx`;
      XLSX.writeFile(wb, fileName);
      } catch (error) {
        console.error(error);
      }
    }
  };
  // const handlePrintSelected = () => {
  //   const selectedIDs = selectedRows;

  //   const selectedUsers = users.filter((user) => selectedIDs.includes(user.ID));

  //   selectedUsers.forEach((user) => {
  //     if (user.reportURL) {
  //       window.open(user.reportURL);
  //     } else {
  //       setMessage("Please select a user with a report");
  //     }
  //   });
  // };

  return (
    <>
      {confirmOpenIncomplete && (
        <WarningConfirmChangeEmail
          confirmOpenIncomplete={confirmOpenIncomplete}
          handleConfirmClose={handleConfirmClose}
          handleConfirm={handleConfirm}
        />
      )}

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
          getRowId={(r) => r.student_id}
          rows={users}
          getRowHeight={() => "auto"}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15, 20]}
          pagination
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
          onCellEditCommit={handleEditCellChange} // Use the handleEditCellChange function
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

export default StudentsList;
