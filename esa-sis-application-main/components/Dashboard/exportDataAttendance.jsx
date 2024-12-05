/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React, { useEffect } from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import moment from "moment";

import CustomPagination from "./Pagination";
// import AttendanceModal from '../../pages/programManager/ModalForm/AttendanceModal';


const ExportAttendanceData = ({ data }) => {
 
  const [pageSize, setPageSize] = useState(10);
  const [sortedRows, setSortedRows] = useState(data);
  useEffect(() => {
    const sorted = [...data].sort((a, b) => a.attendance_id - b.attendance_id);
    setSortedRows(sorted);
  }, [data]);
  


  const columns = [
    {
      field: "student_firstname",
      headerName: "First Name",
      headerAlign: "center",
      align: "center",
      width: 150,
 
    },
    {
        field: "student_lastname",
        headerName: "Last Name",
        headerAlign: "center",
        align: "center",
        width: 150,
   
      },

    // {
    //   field: 'major_id',
    //   headerName: 'Major ID',
    //   headerAlign: 'center',
    //   align: 'center',
    //   width: 90,
    // },

    {
      field: "course_id",
      headerName: "Course ID",
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    {
        field: "course_name",
        headerName: "Course Name",
        headerAlign: "center",
        align: "center",
        width: 120,
      },
    {
      field: "attendance_date",
      headerName: "Attendance Date",
      headerAlign: "center",
      align: "center",
      width: 150,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
        field: "attendance_status",
        headerName: "Status",
        headerAlign: "center",
        align: "center",
        width: 150,
      },
  ];



  return (
    <>
     
     
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(r, index) => `${r.student_id}-${r.attendance_id}-${index}`}
          rows={sortedRows}
          getRowHeight={() => "auto"}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // onColumnHeaderClick={(column) => handleSort(column.field)}
          rowsPerPageOptions={[5, 10, 15, 20]}
          // pagination
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
    </>
  );
};

export default ExportAttendanceData;
