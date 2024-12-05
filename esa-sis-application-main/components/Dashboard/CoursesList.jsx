/*
 * Created By:
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { TextField, MenuItem } from '@mui/material';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import selection_data from '../../utilities/selection_data';
// import { LowerButtons } from './LowerButtons';
// import exportSelect from '../../utilities/ExcelExport/exportSelect';
// import generatePasswod from '../../utilities/generatePassword';
// import bcryptjs from 'bcryptjs';
// import exportAll from '../../utilities/ExcelExport/exportAll';
import {
  // WarningMessageIncomplete,
  // WarningMessageObsolote,
  WarningMessageUpdateCourse,
} from './WarningMessage';
// import decrypt from '../../utilities/encrypt_decrypt/decryptText';
import { useSession } from 'next-auth/react';
import CustomPagination from './Pagination';

// import { Pagination, Stack } from '@mui/material';

const CoursesList = ({
  users,
  // , setUsers
}) => {
  const [pageSize, setPageSize] = useState(10);
  const [message, setMessage] = useState('');
  // const [selectedRows, setSelectedRows] = useState([]);
  const { data: session } = useSession();
  // const [major, setMajor] = useState([]);
  const [allMajor, setAllMajor] = useState([]);
  // const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedMajorMap, setSelectedMajorMap] = useState({});
  const [majorNameChanges, setMajorNameChanges] = useState({});
  const [confirmOpenIncomplete, setConfirmOpenIncomplete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const[courseName , setCourseName] = useState('');
  const [courseCredit , setCourseCredit] = useState(null)
  const [courseType , setCourseType] = useState('')
  const [courseTypes, setCourseTypes] = useState([]);
  // const [confirmOpenDelete, setConfirmOpenDelete] = useState(false);

  const handleConfirmClose = () =>
    // user
    {
      setConfirmOpenIncomplete(false);
      // setConfirmOpenDelete(false);
      // setConfirmOpenObsolote(false);
      // setCancleIncomplete(false);
      // const prevStatus = users.find((u) => u.ID === user.ID)?.status;
      // // console.log("prevStatus",prevStatus)
      // setUsers((prevUsers) =>
      //   prevUsers.map((u) =>
      //     u.ID === user.ID ? { ...u, status: prevStatus } : u
      //   )
      // );
    };
  const handleEnable = async (user) => {
   
 
    let sendData = {
      course_id: user.course_id,
      major_name: user.major_name,

    };
   
    axios
      .post('/api/admin/adminApi/updateCourse', sendData)
      .then(() =>
        // response
        {
          // Handle success
          setMessage('Course Changed Successfully!');
     

          //Update the user's status and major in the table
          // setUsers((prevUsers) =>
          //   prevUsers.map((u) =>
          //     u.major_name === user.major_name
          //       ? u
          //       : {
          //         ...u,
          //         major_name : user.major_name
          //       }
          //   )
          // );
        }
      )
      .catch((error) => {
        //     // Handle error
        console.log(error);
      });
  };
  const handleConfirmCourseType= async (selectedUser) => {
    try {
      const payload = {
        course_id:selectedUser.course_id,
        course_name:courseName,
        course_credit:courseCredit,
        course_type:courseType


      };

     await axios.post("/api/admin/adminApi/upadateCourseType", payload);
    } catch (error) {
      console.error("Error updating grade:", error);
    }
  };
  const handleConfirm = () => {
    handleEnable(selectedUser);
    handleConfirmCourseType(selectedUser)
    // handleSave(selectedUser);
    setConfirmOpenIncomplete(false);
    // setConfirmOpenObsolote(false);
    // setCancleIncomplete(false);
  };
  // const handleConfirmDelete = () => {
  //   handleDelete(selectedUser);
  //   handleSave(selectedUser);
  //   setConfirmOpenDelete(false);
  //   // setConfirmOpenObsolote(false);
  //   // setCancleIncomplete(false);
  // };

  const handleMajorNameChange = (event, params) => {
    const { value } = event.target;
    params.row.major_name = event.target.value;
    // Update the majorNameChanges object with the new value for the specific course_id
    setMajorNameChanges((prevChanges) => ({
      ...prevChanges,
      [params.row.course_id]: value,
    }));
  };

  //incomplete modal
  const handleConfirmIncomplete = (user) => {
    setSelectedUser(user);
    setConfirmOpenIncomplete(true);
  };
  // const handleConfirmDel = (user) => {
  //   setSelectedUser(user);
  //   setConfirmOpenDelete(true);
  // };

  // console.log('check the boolean:::',!majorNameChanges[params.row.course_id])
  // const handleMajorChange = (event, params) => {
  //   const { value } = event.target;
  //   setSelectedMajor(value);
  //   console.log('the value is==>> ',value)
  //   // Handle any other logic, such as updating the data source or performing other actions
  // };
  const handleEditCellChange = (params) => {
    const { field, value } = params;

    // Check if the edited field is "grade" and update the edited grade value
    if (field === "course_name") {
      setCourseName(value);
    }
    if(field === "course_credit"){
      setCourseCredit(value)
    }
    if(field === "course_type"){
      setCourseType(value)
    }
  };

  const handleMajorChange = (event, params) => {
    const { value } = event.target;

    // Update the selectedMajorMap with the new value for the specific course_id
    setSelectedMajorMap((prevMap) => ({
      ...prevMap,
      [params.row.course_id]: value,
    }));
  };
  // async function setTheMajor(){
  //   await users.map(user =>
  //    setSelectedMajorMap((prevMap) => ({
  //      ...prevMap,
  //      [user.course_id]: user.major_name,
  //    }))
  //    )
  //    console.log('selected Major ===>>> ',selectedMajorMap )

  //  }
  async function setTheMajor() {
    await Promise.all(
      users.map((user) =>
        setSelectedMajorMap((prevMap) => ({
          ...prevMap,
          [user.course_id]: user.major_name,
        }))
      )
    );
  }
  useEffect(() => {
    setTheMajor();

    handleShowAll();
    handleShowAllType()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleShowAllType = async () => {
    try {
      let table = 'course_type';
      let { data } = await axios.post('/api/pmApi/getAll', { table });
      setCourseTypes(data.rows);
    } catch (error) {
      return error
    }

  };
  
  const handleShowAll = async () => {
    let table = 'major';
    let { data } = await axios.post('/api/pmApi/getAll', { table });
    // setMajor(data.rows)

    const datesArray = [];
    data.rows.forEach((major) => {
      datesArray.push(major.major_name);
    });

    setAllMajor(['', ...datesArray]);
  };
  console.log(majorNameChanges);
  setTimeout(() => {
    setMessage('');
  }, selection_data.message_disapear_timing);


  const columns = [
    {
      field: 'course_id',
      headerName: 'Course_ID',
      headerAlign: 'center',
      align: 'center',
      width: 90,
    },

    {
      field: 'course_name',
      headerName: 'Course_Name',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      editable:true,
      //   renderCell: (params) =>
      //     `${params.row.pm_firstname || ''} ${params.row.pm_lastname || ''}`,
    },
    {
      field: 'course_credit',
      headerName: 'Course_Credit',
      headerAlign: 'center',
      align: 'center',
      width: 300,
      editable:true,
    },
    {
      field: 'course_type',
      headerName: 'Course Type',
      headerAlign: 'center',
      align: 'center',
      width: 300,
      editable:true, 
      type: 'singleSelect',
      valueOptions: courseTypes.map((type) => ({
        value: type.course_type, 
        label: type.course_type,
      })),
    },
    
    // {
    //   field: 'major_id',
    //   headerName: 'Major',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 90,
    // },
    // {
    //     field: 'major_id',
    //     headerName: 'Major',
    //     headerAlign: 'center',
    //     align: 'center',
    //     width: 100,
    //     editable: true,
    //     // cellClassName: (params) =>
    //     //   params.row.status === 'complete'
    //     //     ? 'text-blue-600 font-bold'
    //     //     : params.row.status === 'incomplete'
    //     //     ? 'text-red-600 font-bold'
    //     //     : '' || params.row.status === 'active'
    //     //     ? 'text-green-900 font-bold'
    //     //     : '' || params.row.status === 'waiting list'
    //     //     ? 'text-yellow-600 font-bold'
    //     //     : params.row.status === 'accepted'
    //     //     ? 'text-silver-600 font-bold'
    //     //     : params.row.status === 'qualified'
    //     //     ? 'text-pink-600 font-bold'
    //     //     : '',
    //     type: 'singleSelect',
    //     valueOptions: allMajor,
    //   },
    // {
    //   field: 'major_name',
    //   headerName: 'Major',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 400,
    //   editable: true,
    //   renderCell: (params) => (
    //     <TextField
    //       select
    //       // value={selectedMajor}
    //       value={selectedMajorMap[params.row.course_id] || ''}
    //       onChange={(event) => handleMajorChange(event, params)}
    //       fullWidth
    //     >
    //       {allMajor.map((major) => (
    //         <MenuItem key={major} value={major}>
    //           {major}
    //         </MenuItem>
    //       ))}
    //     </TextField>
    //   ),

    // },
    // {
    //   field: 'major_name',
    //   headerName: 'Major',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 300,
    //   editable: true,
    //   cellClassName: (params) => 'text-pink-600 font-bold border-2 border-solid border-black',
    //       headerClassName: 'border',
    //       cellClassName: 'border',
    //   type: 'singleSelect',
    //   valueOptions: allMajor,
    // },
    {
      field: 'major_name',
      headerName: 'Major',
      headerAlign: 'center',
      align: 'center',
      width: 300,
      editable: true,
      renderCell: (params) => (
        <TextField
          select
          value={
            params.row.major_name || selectedMajorMap[params.row.course_id]
          }
          onChange={(event) => {
            handleMajorNameChange(event, params);
            handleMajorChange(event, params);
          }}
          fullWidth
        >
          {allMajor.map((major) => (
            <MenuItem key={major} value={major}>
              {major}
            </MenuItem>
          ))}
        </TextField>
      ),
    },

    {
      field: 'action',
      headerName: 'Action',
      width: `${session.user.role === '0' ? 300 : 150}`,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            // disabled={!majorNameChanges[params.row.course_id]}
            className="primary-button hover:text-white"
            onClick={() => {
              // handleSave(params.row)
              setCourseCredit(params.row.course_credit)
              setCourseName(params.row.course_name)
              setCourseType(params.row.course_type)
              handleConfirmIncomplete(params.row);

       
            }}
            type="button"
          >
            Save
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {confirmOpenIncomplete && (
        <WarningMessageUpdateCourse
          confirmOpenIncomplete={confirmOpenIncomplete}
          handleConfirmClose={handleConfirmClose}
          handleConfirm={handleConfirm}
        />
      )}
      <div className="text-center text-red-500 font-bold p-2">{message}</div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(r) => r.course_id}
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
          onCellEditCommit={handleEditCellChange} // Use the handleEditCellChange function
        />
      </Box>
    </>
  );
};

export default CoursesList;
