/* eslint-disable no-unused-vars */
/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

/*
 * Created By: Jaber Mohamad
 * Project: SIS Application
 * File: components/Admin/Archive/ArchiveListTable.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import moment from 'moment';
import selection_data from '../../../utilities/selection_data';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import IconButton from '@mui/material/IconButton';

const ArchiveListTable = ({ users, setUsers }) => {
  const [pageSize, setPageSize] = useState(5);
  const [message, setMessage] = useState('');
  const majorData = selection_data.Academic_program_inList;

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.ID !== id));
  };

  const columns = [
    {
      field: 'ID',
      headerName: 'ID',
      headerAlign: 'center',
      align: 'center',
      width: 85,
    },
    {
      field: 'Name',
      headerName: 'Name',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      renderCell: (params) =>
        `${params.row.fname || ''} ${params.row.lname || ''}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      headerAlign: 'center',
      align: 'center',
      width: 150,
    },
    {
      field: 'mobileNumber',
      headerName: 'Mobile Number',
      headerAlign: 'center',
      align: 'center',
      width: 120,
    },
    {
      field: 'major',
      headerName: 'Major',
      headerAlign: 'center',
      align: 'center',
      width: 180,
      type: 'singleSelect',
      valueOptions: majorData,
    },
    {
      field: 'promotion',
      headerName: 'Promotion',
      headerAlign: 'center',
      align: 'center',
      width: 90,
    },

    {
      field: 'submissionDate',
      headerName: 'Submission Date',
      headerAlign: 'center',
      align: 'center',
      width: 100,
      type: 'date',
      valueFormatter: (params) => moment(params?.value).format('DD/MM/YYYY'),
    },

    {
      field: 'reportURL',
      headerName: 'Report',
      headerAlign: 'center',
      align: 'center',
      width: 200,
      renderCell: (params) => {
        params.row.status === 'incomplete' ? (
          ''
        ) : (
          <Link target='_blank' href={`${params.row.reportURL}`}>
            {params.row.reportURL
              ? `${params.row.fname} ${params.row.lname}'s Report`
              : ''}
          </Link>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => (
        <div className='flex gap-2'>
          <Link
            className='text-black'
            target='_blank'
            href={`${params.row.reportURL}`}
          >
            <button
              className='primary-button hover:text-white'
              disabled={params.row.reportURL ? false : true}
              type='button'
            >
              <LocalPrintshopOutlinedIcon />
            </button>
          </Link>

          <button
            className='bg-red-500 hover:bg-red-700 text-white w-[50px] p-1 font-bold rounded-lg'
            type='button'
            onClick={() => handleDelete(params.row.ID)}
          >
            <DeleteForeverIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className='text-center text-red-500 font-bold p-2'>{message}</div>
      <Box sx={{ height: 440, width: '100%' }}>
        <DataGrid
          getRowId={(r) => r.ID}
          rows={users}
          getRowHeight={() => 'auto'}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15, 20]}
          pagination
          checkboxSelection
          disableSelectionOnClick
          components={{
            NoRowsOverlay: () => (
              <div className='grid h-[100%] place-items-center'>No Data</div>
            ),
          }}
        />
      </Box>
    </>
  );
};

export default ArchiveListTable;
