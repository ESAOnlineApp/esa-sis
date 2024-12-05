/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React, { useEffect } from 'react';
import { useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
// import { LowerButtons } from './LowerButtons';
import { useSession } from 'next-auth/react';
import CustomPagination from './Pagination';
// import { WarningMessageObsolote } from './WarningMessage';
import ElectiveModal from '../../pages/programManager/ModalForm/ElectiveModal';
import axios from 'axios';

const ElectiveCourseList = ({ users, setUsers }) => {
  const [pageSize, setPageSize] = useState(10);
  // const [message, setMessage] = useState('');
  // const [OpenModal,setOpenModal] =useState(false)
  // const [selectedRows, setSelectedRows] = useState([]);
  const { data: session } = useSession();
  // const [assigned , setAssigned] = useState(false)

  // const [confirmOpenIncomplete, setConfirmOpenIncomplete] = useState(false);
  // const [confirmOpenDelete, setConfirmOpenDelete] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);
  // const [isAssignPage , setIsAssignPage] = useState(false)
  // const [details , setDetails] = useState([])
  const [iselective, setElective] = useState(false);
  // const [elective , setIsElective] = useState(true)
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [promotions, setPromotions] = useState([]);

  // const elective = true;
  // // console.log("users",users)
  // setTimeout(() => {
  //   setMessage('');
  // },10000);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const payload = {
          major_id: session.user.majorid,
        };
        // console.log("majorid",payload)
        const data = await axios.post('/api/pmApi/getElectiveCourse', payload);

        setCourses(data.data.data);
      } catch (error) {
        return error;
      }
    };
    fetchCourses();
    const fetchPromotion = async () => {
      try {
        const payload = {
          table:'promotions',
          Where:'major_id',
          id: session.user.majorid,
        };
        // console.log("majorid",payload)
        const data = await axios.post('/api/pmApi/getAllCourses', payload);

        setPromotions(data.data.data);
      } catch (error) {
        return error;
      }
    };
    fetchPromotion();
    const fetchStudent = async () => {
      try {
        const payload = {
          major_id: session.user.majorid,
          academic_year: new Date().getFullYear(),
        };
        const data = await axios.post(
          '/api/pmApi/getStudentByAcademicYear',
          payload
        );
        setStudents(data.data.data);
      } catch (error) {
        return error;
      }
    };

    fetchStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleConfirmClose = (user) => {
  //   setConfirmOpenIncomplete(false);
  //   setConfirmOpenDelete(false);
  //   // setConfirmOpenObsolote(false);
  //   // setCancleIncomplete(false);

  // };

  // const handleConfirmDelete = () => {
  //   unAssign(selectedUser);
  //   // handleSave(selectedUser);
  //   setConfirmOpenDelete(false);
  //   // setConfirmOpenObsolote(false);
  //   // setCancleIncomplete(false);
  // };
  // const handleConfirmDel = (user) => {
  //   setSelectedUser(user);
  //   setConfirmOpenDelete(true);
  // };
  const sortedstudent = [...users].sort(
    (a, b) => a.assign_student_id - b.assign_student_id
  );
  const columns = [
    {
      field: 'student_firstname',
      headerName: 'First Name',
      headerAlign: 'center',
      align: 'center',
      width: 200,
    },
    {
      field: 'student_lastname',
      headerName: 'Last Name',
      headerAlign: 'center',
      align: 'center',
      width: 200,
    },
    {
      field: 'promotion',
      headerName: 'promotion Name',
      headerAlign: 'center',
      align: 'center',
      width: 200,
    },

    {
      field: 'course_name',
      headerName: 'course Name',
      headerAlign: 'center',
      align: 'center',
      width: 200,
    },

    {
      field: 'course_id',
      headerName: 'Course ID',
      headerAlign: 'center',
      align: 'center',
      width: 200,
    },

    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   width: `${session.user.role === '0' ? 350 : 150}`,
    //   headerAlign: 'center',
    //   align: 'center',
    //   sortable: false,
    //   renderCell: (params) => (
    //     <div className='flex gap-2'>
    //       <button
    //         className='primary-button hover:text-white'
    //         type='button'
    //         onClick={()=>{handleConfirmDel(params.row) , setIsAssignPage(true) , setDetails(params.row)}}
    //       >
    //         unAssign
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      {/* {confirmOpenDelete && (
    <WarningMessageObsolote
      isAssignPage={isAssignPage}
      confirmOpenObsolote={confirmOpenDelete}
      handleConfirmClose={handleConfirmClose}
      // handleConfirm={handleConfirmDelete}
      details={details}
     
    />
  )} */}
      {iselective && (
        <ElectiveModal
          courses={courses}
          users={users}
          setElective={setElective}
          promotions={promotions}
          setPromotions={setPromotions}
          students={students}
          setUsers={setUsers}
          setStudents={setStudents}
        />
      )}
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(r) => r.assign_student_id}
          rows={sortedstudent}
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
              <div classNam e="grid h-[100%] place-items-center">
                No Data
              </div>
            ),
            Pagination: CustomPagination,
          }}
        />
      </Box>

      {/* <div className="grid lg:grid-cols-1 p-5 shadow-sm items-center">
        <LowerButtons
          elective={elective}
          setElective={setElective}
          session={session}
        />
      </div> */}
    </>
  );
};

export default ElectiveCourseList;
