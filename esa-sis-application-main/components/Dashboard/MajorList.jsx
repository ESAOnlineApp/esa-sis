/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from 'react';
import { useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import CustomPagination from './Pagination';

const MajorList= ({ majorList  }) => {

    const [pageSize, setPageSize] = useState(10);
 

  const columns = [
    {
      field: 'major_id',
      headerName: 'Major ID',
      headerAlign: 'center',
      align: 'center',
      width: 500,
      type: 'singleSelect',
    },
    {
      field: 'major_name',
      headerName: 'Major Name',
      headerAlign: 'center',
      align: 'center',
      width: 500,
    },
  ];



  return (
    <>
    
      <Box sx={{ height: 350, width: '100%' }}>
        <DataGrid
          getRowId={(r) => r.major_id}
          rows={majorList}
        //   getRowHeight={() => 'auto'}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15, 20]}
        //   checkboxSelection
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
    </>
  );
};

export default MajorList;
