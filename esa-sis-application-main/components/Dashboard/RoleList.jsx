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
import { useSession } from 'next-auth/react';
import CustomPagination from './Pagination';
import axios from 'axios';

const RoleList = () => {
  const [pageSize, setPageSize] = useState(10);
  const { data: session } = useSession();
  const [certificate, setCertificate] = useState([]);
  const [sortedRows, setSortedRows] = useState(certificate);

  useEffect(() => {
    fetchCertificate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCertificate = async () => {
    try {
      const payload = {
        majorId: session.user?.majorid,
      };
      const response = await axios.post('/api/user/Certificate', payload);
      setCertificate(response.data.data.rows);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (Array.isArray(certificate)) {
      const sorted = [...certificate].sort((a, b) => a.major_id - b.major_id);
      setSortedRows(sorted);
    }
  }, [certificate]);

  const columns = [
    {
      field: 'modified_major_name',
      headerName: 'Certificate Name',
      headerAlign: 'center',
      align: 'center',
      width: 500,
    },

    {
      field: 'status',
      headerName: 'Status',
      headerAlign: 'center',
      align: 'center',
      width: 150,
      cellClassName: (params) =>
        params.row.status === 'inactive'
          ? 'text-red-600 font-bold'
          : params.row.status === 'active'
          ? 'text-green-600 font-bold'
          : '',
    },
  ];

  return (
    <>
      <div className="items-center">
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            getRowId={(r) => r.major_id}
            rows={sortedRows}
            getRowHeight={() => 'auto'}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15, 20]}
            pagination
            disableSelectionOnClick
            components={{
              NoRowsOverlay: () => (
                <div className="grid h-[100%] place-items-center">No Data</div>
              ),
              Pagination: CustomPagination,
            }}
          />
        </Box>
      </div>

      <div className="grid lg:grid-cols-1 p-5 shadow-sm"></div>
    </>
  );
};

export default RoleList;
