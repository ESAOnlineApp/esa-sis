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
import selection_data from "../../utilities/selection_data";

import { useSession } from "next-auth/react";
import CustomPagination from "./Pagination";
import axios from "axios";
import { WarningMessageGrade } from "./WarningMessage";


const GradeListRTF = ({ users, setUser }) => {


  const [pageSize, setPageSize] = useState(10);
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const [confirmOpenIncomplete, setConfirmOpenIncomplete] = useState(false);
  const [confirmOpenDelete, setConfirmOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortedRows, setSortedRows] = useState(users);
  const [details, setDetails] = useState([]);
  // const [selectedRows, setSelectedRows] = useState([]);
  // const [editCellProps, setEditCellProps] = useState(null); // Track edited cell
  const [editedGrade, setEditedGrade] = useState(null); // Track edited grade value
  const [editedGradeOver30, setEditedGradeOver30] = useState(null); // Track edited grade value
  useEffect(() => {
    if (Array.isArray(users)) {
      const sorted = [...users].sort((a, b) => a.grade_id - b.grade_id);
      setSortedRows(sorted);
    }
  }, [users]);


  // // Update selected user when a row is selected
  // useEffect(() => {
  //   if (selectedRows.length === 1) {

  //   } else {
  //     setSelectedUser(null); // No row is selected
  //     setDetails([]); // Reset details when no row is selected
  //   }
  // }, [selectedRows]);


  setTimeout(() => {
    setMessage("");
  }, selection_data.message_disapear_timing);
  const handleConfirmClose = () => {
    setConfirmOpenIncomplete(false);
    // setConfirmOpenObsolote(false);
    setConfirmOpenDelete(false);
  };
  const handleConfirmDel = (user) => {
    setSelectedUser(user);
    setConfirmOpenDelete(true);
  };
  // const handleConfirm = () => {
  //   updateGrade(selectedUser); // Pass the edited grade
  //   setConfirmOpenDelete(false);

  // };

  const handleEditCellChange = (params) => {
    const { field, value } = params;
   
    // Check if the edited field is "grade" and update the edited grade value
    if (field === "grade_over_20" && field === 'grade_over_30') {
      setEditedGrade(value);
      setEditedGradeOver30(value)
    
    }else if(field === "grade_over_20"){
      setEditedGrade(value)
  
    }else if(field === 'grade_over_30'){
      
      setEditedGradeOver30(value)

    }
  };


  const handleConfirm = async () => {
    try {
      const payload = {
        table:'grades_rtf',
        grade_over_20: editedGrade, // Use the edited grade value
        grade_over_30:editedGradeOver30,
        student_id: selectedUser.student_id,
        course_id: selectedUser.course_id,
        task_name :selectedUser.task_name
      };
    

     await axios.post("/api/pmApi/updateRTF", payload);

      setUser((prevState) => {
        const updatedAttendance = prevState.map((row) => {
          if (row.grade_id === selectedUser.grade_id) {
            return {
              ...row,
              grade_over_20: editedGrade, // Update grade with the edited value
              grade_over_30:editedGradeOver30
            };
          }
          return row;
        });
        return updatedAttendance;
      });

      setConfirmOpenDelete(false);
    } catch (error) {
      console.error("Error updating grade:", error);
    }
  };
  const columns = [
    {
        field: "student_id",
        headerName: "Student ID",
        headerAlign: "center",
        align: "center",
        width: 150,

      },

      {
        field: "student_lastname",
        headerName: "Family Name",
        headerAlign: "center",
        align: "center",
        width: 150,

      },
      {
        field: "student_firstname",
        headerName: "First Name",
        headerAlign: "center",
        align: "center",
        width: 150,

      },

      {
        field: "promotion",
        headerName: "Promotion",
        headerAlign: "center",
        align: "center",
        width: 150,

      },

      {
        field: "course_id",
        headerName: "Certificate Name",
        headerAlign: "center",
        align: "center",
        width: 120,
      },
      {
        field: "task_name",
        headerName: "Task Name",
        headerAlign: "center",
        align: "center",
        width: 120,
      },
      {
        field: "grade_over_20",
        headerName: "Grade/20",
        headerAlign: "center",
        align: "center",
        width: 150,
        editable: true,
      },
      {
        field: "grade_over_30",
        headerName: "Grade/30",
        headerAlign: "center",
        align: "center",
        width: 150,
        editable: true,
      },

      // {
      //   field: "comments",
      //   headerName: "Comments",
      //   headerAlign: "center",
      //   align: "center",
      //   width: 150,
      //   editable: true,
      // },
      {
        field: "action",
        headerName: "Action",
        width: `${(session?.user.role === "2" || session?.user.role === "3") ? 300 : 150}`,
        headerAlign: "center",
        align: "center",
        sortable: false,
        renderCell: (params) => (
          <div className="flex gap-2">
            <button
              className="primary-button hover:text-white"

              // disabled={params.id !== presentEnable}
              type="button"
              hidden={
                session.user.role === "1" || session.user.role === "0"
                  ? true
                  : false
              }
              onClick={() => {
                setSelectedUser(params.row);
                setEditedGradeOver30(params.row.grade_over_30)
                setEditedGrade(params.row.grade_over_20);
                handleConfirmDel(params.row);
                setDetails(params.row);
              }}

            >
              Save
            </button>
          </div>
        ),
      },
  ];


  
  return (
    <>
      {confirmOpenDelete && (
        <WarningMessageGrade
          confirmOpenIncomplete={confirmOpenIncomplete}
          confirmOpenObsolote={confirmOpenDelete}
          handleConfirmClose={handleConfirmClose}
          handleConfirm={handleConfirm}
          details={details}
        />
      )}
      <div className="text-center text-red-500 font-bold p-2">{message}</div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(r) => r.grade_id}
          rows={sortedRows}
          getRowHeight={() => "auto"}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          // onColumnHeaderClick={(column) => handleSort(column.field)}
          rowsPerPageOptions={[5, 10, 15, 20]}
          pagination
          
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

          // Track the edited cell and commit changes
          onCellEditCommit={handleEditCellChange} // Use the handleEditCellChange function
        />

      </Box>

      <div className="grid lg:grid-cols-1 p-5 shadow-sm">

      </div>
    </>
  );
};

export default GradeListRTF;
