/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from "react";
import { useState } from "react";


import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import selection_data from "../../utilities/selection_data";

import CustomPagination from "./Pagination";




const StudentGradesRTF = ({
    studentGrades,

}) => {

   
    const [pageSize, setPageSize] = useState(10);
    const [message, setMessage] = useState("");

    setTimeout(() => {
        setMessage("");
    }, selection_data.message_disapear_timing);


      




    const columns = [

        {
            field: "course_name",
            headerName: "Certificate Name",
            headerAlign: "center",
            align: "center",
            width: 200,

        },
        {
            field: "task_name",
            headerName: "Task Name",
            headerAlign: "center",
            align: "center",
            width: 200,

        },

        {
            field: "grade_over_20",
            headerName: "Grade/20",
            headerAlign: "center",
            align: "center",
            width: 200,

        },
        {
            field: "grade_over_30",
            headerName: "Grade/30",
            headerAlign: "center",
            align: "center",
            width: 200,

        },

    ]


    return (
        <>

            <div className="text-center text-red-500 font-bold p-2">{message}</div>
            <Box sx={{ height: 700, width: "100%" }}>
                <DataGrid
                    getRowId={(r) => r.grade_id}
                    rows={studentGrades}
                    getRowHeight={() => "auto"}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
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

export default StudentGradesRTF;
