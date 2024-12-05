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

import axios from "axios";
// import selection_data from '../../utilities/selection_data';

import { LowerButtons } from "./LowerButtons";

import AssigendModal from "../../pages/programManager/ModalForm/AssigendModal";

import { useSession } from "next-auth/react";
import CustomPagination from "./Pagination";

import { WarningMessageObsolote } from "./WarningMessage";

const TeachersCourseList = ({ users, setUsers }) => {
  // // console.log( "users", users)
  const [pageSize, setPageSize] = useState(10);
  const [message, setMessage] = useState("");
  const [OpenModal, setOpenModal] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);
  const { data: session } = useSession();
  const [assigned, setAssigned] = useState(true);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [confirmOpenIncomplete, setConfirmOpenIncomplete] = useState(false);
  const [confirmOpenDelete, setConfirmOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAssignPage, setIsAssignPage] = useState(false);
  const [details, setDetails] = useState([]);

  // // console.log("users",users)
  setTimeout(() => {
    setMessage("");
  }, 10000);

  const handleConfirmClose = () => {
    setConfirmOpenIncomplete(false);
    setConfirmOpenDelete(false);
    // setConfirmOpenObsolote(false);
    // setCancleIncomplete(false);
  };
  const handleConfirmDelete = () => {
    unAssign(selectedUser);
    // handleSave(selectedUser);
    setConfirmOpenDelete(false);
    // setConfirmOpenObsolote(false);
    // setCancleIncomplete(false);
  };
  const handleConfirmDel = (user) => {
    setSelectedUser(user);
    setConfirmOpenDelete(true);
  };

  const unAssign = async (event) => {
    try {
      const teacher_courses_id = event.teacher_courses_id;
      const teacher_firstname = event.teacher_firstname;
      const teacher_lastname = event.teacher_lastname;
      const teacher_id = event.teacher_id;
      const course_id = event.course_id;
      const response = await axios.post("/api/pmApi/unasigend", {
        teacher_id,
        course_id,
        teacher_firstname,
        teacher_lastname,
      });
      setMessage(response.data.message);
      setUsers(
        users.filter((user) => user.teacher_courses_id !== teacher_courses_id)
      );
    } catch (error) {
      return error;
    }
  };
  const sortedTeachers = [...users].sort((a, b) => {
    const nameA = `${a.teacher_firstname} ${a.teacher_lastname}`.toLowerCase();
    const nameB = `${b.teacher_firstname} ${b.teacher_lastname}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });
  const columns = [
    {
      field: "teacher_firstname",
      headerName: "First Name",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "teacher_lastname",
      headerName: "Last Name",
      headerAlign: "center",
      align: "center",
      width: 150,
    },

    {
      field: "course_name",
      headerName: "course Name",
      headerAlign: "center",
      align: "center",
      width: 300,
    },

    {
      field: "course_id",
      headerName: "Course ID",
      headerAlign: "center",
      align: "center",
      width: 150,
    },

    {
      field: "action",
      headerName: "Action",
      width: `${session.user.role === "0" ? 350 : 150}`,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            className="primary-button hover:text-white"
            type="button"
            onClick={() => {
              handleConfirmDel(params.row),
                setIsAssignPage(true),
                setDetails(params.row);
            }}
          >
            unAssign
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {confirmOpenDelete && (
        <WarningMessageObsolote
          confirmOpenIncomplete={confirmOpenIncomplete}
          isAssignPage={isAssignPage}
          confirmOpenObsolote={confirmOpenDelete}
          handleConfirmClose={handleConfirmClose}
          handleConfirm={handleConfirmDelete}
          details={details}
        />
      )}
      <div className="text-center text-red-500 font-bold p-2">{message}</div>
      {OpenModal && (
        <AssigendModal
          setOpenModal={setOpenModal}
          users={users}
          setUsers={setUsers}
        />
      )}

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(r) => r.teacher_courses_id}
          rows={sortedTeachers}
          getRowHeight={() => "auto"}
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

      <div className="grid lg:grid-cols-1 p-5 shadow-sm items-center">
        <LowerButtons
          assigned={assigned}
          setAssigned={setAssigned}
          setOpenModal={setOpenModal}
          session={session}
        />
      </div>
    </>
  );
};

export default TeachersCourseList;
