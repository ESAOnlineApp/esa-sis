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

const CourseTypeList= ({ courseList  }) => {

    const [pageSize, setPageSize] = useState(10);



  const columns = [

    {
      field: 'course_type',
      headerName: 'Course Type',
      headerAlign: 'center',
      align: 'center',
      width: 1000,
    },
  ];



  return (
    <>
    
      <Box sx={{ height: 350, width: '100%' }}>
        <DataGrid
          getRowId={(r) => r.course_type_id}
          rows={courseList}
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

export default CourseTypeList;
