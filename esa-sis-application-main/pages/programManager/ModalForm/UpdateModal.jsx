import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import selection_data from '../../../utilities/selection_data';

import axios from 'axios';
import moment from 'moment';
// import CustomPagination from '../../../components/Dashboard/Pagination';
import { useSession } from 'next-auth/react';

// import { BsX } from 'react-icons/bs';

export default function Modal({
  setEditModal,
  attendance,
  setAttendance,
  courseName,
  teachersFirstname,
  teacherslastname,
  date,
  setCourseName,
  setTeacherFirstName,
  setTeacherlastname,
  setDetails,
  setDate
}) {
  const { data: session } = useSession();
  const [pageSize, setPageSize] = useState(15);
  const [message, setMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [rowCount, setRowCount] = useState(0);


  setTimeout(() => {
    setMessage('');
  }, selection_data.message_disapear_timing);

  const handleUpdate = async (event) => {
    try {
      const present = event.present;
      const attendance_id = event.attendance_id;
      const student_id = event.student_id;

      const { data } = await axios.post('/api/pmApi/presentupdate', {
        present,
        student_id,
        attendance_id,
      });

      setMessage(data.message);

      // Update the attendance state with the new present value
      setAttendance((prevState) => {
        const updatedAttendance = prevState.map((row) => {
          if (row.student_id === student_id) {
            return { ...row, present: present };
          }
          return row;
        });
        return updatedAttendance;
      });
    } catch (error) {
      console.error(error);
    }
  };
  const sortedAttendance = [...attendance].sort((a, b) => {
    const nameA = `${a.student_firstname} ${a.student_lastname}`.toLowerCase();
    const nameB = `${b.student_firstname} ${b.student_lastname}`.toLowerCase();
    return nameA.localeCompare(nameB);
  }).map((row, index) => ({ ...row, count: index + 1 }));


  const handleAll = async () => {
    try {
      for (let i = 0; i < attendance.length; i++) {
        const row = attendance[i];
        if (row.isDirty) {
          const { student_id, attendance_id, present } = row;
          const { data } = await axios.post('/api/pmApi/presentupdate', {
            present,
            student_id,
            attendance_id,
          });

          setMessage(data.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const presence = [
    { value: true, label: 'Present' },
    { value: false, label: 'Absent' },
  ];

  const handleCellEditChange = (params) => {
    const { id, field, value } = params;

    setAttendance((prevState) => {
      const updatedAttendance = prevState.map((row) => {
        if (row.student_id === id) {
          const updatedRow = {
            ...row,
            [field]: value,
            isDirty: row.present !== value,
          };

          return updatedRow;
        }
        return row;
      });

      return updatedAttendance;
    });
  };

  const columns = [


    {
      field: 'count',
      headerName: 'No.',
      headerAlign: 'center',
      align: 'center',
      width: 100,
      renderCell: (params) => params.row.count,

    },



    {
      field: 'id', // Add the id field
      headerName: 'ID',
      hide: true, // Hide the ID column
    },

    {
      field: 'Name',
      headerName: 'Student Name',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      cellClassName: (params) =>
        params.row.student_firstname !== ''
          ? 'text-gray-700 text-medium'
          : params.student_lastname !== ''
            ? 'text-green-600 font-bold'
            : '',

      renderCell: (params) =>
        `${params.row.student_firstname || ''} ${params.row.student_lastname || ''
        }`,

    },
    {
      field: 'present',
      headerName: 'Presence',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      editable: true,
      renderCell: (params) => {
        return params.value ? <>Present</> : <>Absent</>;
      },

      cellClassName: (params) =>
        params.row.present === false
          ? 'text-red-600 font-bold'
          : params.row.present === true
            ? 'text-green-600 font-bold'
            : '',
      type: 'singleSelect',
      valueOptions: presence,
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            className="primary-button hover:text-white"
            onClick={() => {
              handleUpdate(params.row);
            }}
            // disabled={params.id !== presentEnable}

            type="button"
            hidden={
              session.user.role === '1' || session.user.role === '0'
                ? true
                : false
            }
          >
            Save
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <>
        <div
          className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-3/4 h-screen my-6 mx-auto max-w-3xl overflow-y-scroll">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Attendance
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  // onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/* <div
                className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t"
              >
                <h3 className="text-gray-700 text-3xl font-bold">
                  Attendance
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => {
                    setEditModal(false), setAttendance([]), setTeacherFirstName(''),
                      setTeacherlastname(''), setDate(''), setCourseName(''), setDetails([]);
                  }}
                >
                  <span className="bg-transparent text-black  h-4 w-4 text-2xl block outline-none focus:outline-none">
                    <BsX className=" text-gray-700 font-bold" />
                  </span>
                </button>
              </div> */}
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <div className="text-slate-500">

                  <div className="pr-3 pl-3">
                    <div className='flex'>
                      <p className=" font-semibold text-gray-700 pt-3 mb-1 border-b">
                        Course Name:
                      </p>
                      <p className="text-gray-600 text-base pt-3 mb-1 border-b">
                        {courseName}
                      </p>

                    </div>
                    <div className='flex'>
                      <p className="font-semibold text-gray-700 pt-3 mb-1 border-b">
                        Date:
                      </p>
                      <p className="text-gray-600 text-base pt-3 mb-1 border-b">{moment(date).format('DD/MM/YYYY')}.</p>
                    </div>
                    <div className='flex'>
                      <p className="font-semibold text-gray-700   pt-3 mb-1 border-b">
                        Teacher FullName :
                      </p>
                      <p className="text-gray-600 text-base pt-3 mb-1 border-b">
                        {teachersFirstname} {teacherslastname}.
                      </p>
                    </div>
                  </div>

                  {message && (
                    <div className=" text-green-500 font-bold p-2">{message}</div>
                  )}
                  <div className="p-3">
                    <Box sx={{ height: 300, width: '100%', overflowX: 'hidden' }}>
                      <DataGrid
                        getRowId={(r) => r.student_id}
                        rows={sortedAttendance}
                        getRowHeight={() => 'auto'}
                        columns={columns}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) =>
                          setPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        // pagination

                        // onEditCellChange={(params) =>
                        //   handleCellEditChange(params)
                        // }
                        onCellEditCommit={(params) =>
                          handleCellEditChange(params)
                        }
                        components={{
                          NoRowsOverlay: () => (
                            <div className="grid h-[100%] place-items-center">
                              No Data
                            </div>
                          ),
                          // Pagination: CustomPagination,
                        }}
                      />
                    </Box>
                  </div>
                </div>

              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                <button
                  className="primary-button  text-white  mr-4"
                  type="button"
                  onClick={() => handleAll()}
                >
                  Save ALL
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded mr-4"
                  type="button"
                  onClick={() => {
                    setEditModal(false), setAttendance([]), setTeacherFirstName(''),
                      setTeacherlastname(''), setDate(''), setCourseName(''), setDetails([]);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>

    </>
  );
}