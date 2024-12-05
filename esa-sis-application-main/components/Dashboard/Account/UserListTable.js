/*
 * Created By: Jaber Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components/Admin/Account/UserListTable.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useEffect } from "react";
import decrypt from "../../../utilities/encrypt_decrypt/decryptText";
import axios from "axios";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import encrypt from "../../../utilities/encrypt_decrypt/encryptText";
import selection_data from "../../../utilities/selection_data";
import {
  WarningMessageDelete,
  WarningMessageNotVerified,
  WarningMessageVerified,
} from "../WarningMessage";

const UserListTable = () => {
  const [pageSize, setPageSize] = useState(5);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [confirmOpenDelete, setConfirmOpenDelete] = useState(false);
  const [confirmOpenNotVerified, setConfirmOpenNotVerified] = useState(false);
  const [confirmOpenVerified, setConfirmOpenVerified] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  //Get All Users
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get("/api/admin/account/listadmin");
        const incomingData = JSON.parse(decrypt(response.data.data));
        if (response.status === 200) {
          setUsers(incomingData);
          //// console.log(users)
        } else {
          // If the server sends an empty array of users,
          // set the message state to indicate that no users were found
          setUsers([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAllUsers();
  }, []);

  // console.log(users);

  //Updata User Account
  const handleSave = (user) => {
    if (user.role !== "0" && user.role !== "2" && user.role !== "3") {
      setMessage("You can only choose roles 0 ,2 and 3");
      return;
    }

    axios
      .put("/api/admin/account/updateData", {
        data: encrypt(
          JSON.stringify({
            ID: user.ID,
            fname: user.fname,
            lname: user.lname,
            role: user.role,
            email: user.email,
            mobileNumber: user.mobileNumber,
          })
        ),
      })
      .then((response) => {
        console.log(response.data);
        setMessage("User Account Updated Successfully");
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.ID === user.ID
              ? {
                  ...u,
                  fname: user.fname,
                  lname: user.lname,
                  role: user.role,
                  email: user.email,
                  mobileNumber: user.mobileNumber,
                }
              : u
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //modal delete
  const handleDeleteAccount = (user) => {
    setSelectedUser(user);
    setConfirmOpenDelete(true);
  };

  //modal not verified
  const handleNotVerifiedAccount = (user) => {
    setSelectedUser(user);
    setConfirmOpenNotVerified(true);
  };

  //modal verified
  const handleVerifiedAccount = (user) => {
    setSelectedUser(user);
    setConfirmOpenVerified(true);
  };

  //close modals
  const handleConfirmClose = () => {
    setConfirmOpenDelete(false);
    setConfirmOpenNotVerified(false);
    setConfirmOpenVerified(false);
  };

  //Delete User Account
  const handleDelete = (user) => {
    axios
      .post(`/api/admin/account/deleteAdminByID`, {
        data: encrypt(
          JSON.stringify({
            ID: user.ID,
          })
        ),
      })
      .then((response) => {
        // Handle success
        setMessage("User Account Deleted Successfully");
        console.log(response.data);
        setUsers((prevUsers) => prevUsers.filter((u) => u.ID !== user.ID));
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  //Block User Account
  const handleisNotVerified = (user) => {
    axios
      .put(`/api/admin/account/unverifiedUser`, {
        data: encrypt(
          JSON.stringify({
            ID: user.ID,
            isVerified: user.isVerified,
          })
        ),
      })
      .then((response) => {
        // Handle success
        setMessage("User Account Locked.");
        console.log(response.data);

        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.ID === user.ID ? { ...u, isVerified: 0 } : u))
        );
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  //Unblock User Account
  // eslint-disable-next-line no-unused-vars
  const handleisVerified = (user) => {
    axios
      .put(`/api/admin/account/verifiedUser`, {
        data: encrypt(
          JSON.stringify({
            ID: user.ID,
            isVerified: user.isVerified,
          })
        ),
      })
      .then((response) => {
        // Handle success
        setMessage("User Account Unlocked.");
        console.log(response.data);

        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.ID === user.ID ? { ...u, isVerified: 1 } : u))
        );
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  //confirm delete
  const handleConfirmDelete = () => {
    handleDelete(selectedUser);
    handleConfirmClose();
  };

  //confirm not verified
  const handleConfirmNotVerified = () => {
    handleisNotVerified(selectedUser);
    handleConfirmClose();
  };

  //confirm verified
  const handleConfirmVerified = () => {
    handleisVerified(selectedUser);
    handleConfirmClose();
  };

  const columns = [
    {
      field: "ID",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 150,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      headerAlign: "center",
      align: "center",
      width: 80,
      editable: true,
    },

    {
      field: "fname",
      headerName: "First Name",
      headerAlign: "center",
      align: "center",
      width: 150,
      editable: true,
    },
    {
      field: "lname",
      headerName: "Last Name",
      headerAlign: "center",
      align: "center",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      width: 200,
      editable: true,
    },

    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      headerAlign: "center",
      align: "center",
      width: 150,
      editable: true,
    },

    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            className="bg-green-600 hover:bg-green-700 text-white w-[50px] p-1 font-bold rounded-lg"
            onClick={() => handleSave(params.row)}
            type="button"
          >
            <SaveOutlinedIcon />
          </button>

          <button
            className="bg-red-500 hover:bg-red-700 text-white w-[50px] p-1 font-bold rounded-lg"
            type="button"
            onClick={() => handleDeleteAccount(params.row)}
          >
            <DeleteForeverIcon />
          </button>

          <button
            className={`bg-yellow-500 hover:bg-yellow-700 text-white w-[50px] p-1 font-bold rounded-lg ${
              params.row.isVerified === 0 && "hidden"
            }`}
            type="button"
            onClick={() => handleNotVerifiedAccount(params.row)}
          >
            <LockOpenOutlinedIcon />
          </button>

          <button
            className={`bg-orange-500 hover:bg-orange-700 text-white w-[50px] p-1 font-bold rounded-lg ${
              params.row.isVerified === 1 && "hidden"
            }`}
            type="button"
            onClick={() => handleVerifiedAccount(params.row)}
          >
            <LockPersonOutlinedIcon />
          </button>
        </div>
      ),
    },
  ];

  setTimeout(() => {
    setMessage("");
  }, selection_data.message_disapear_timing);
  return (
    <>
      {confirmOpenDelete && (
        <WarningMessageDelete
          confirmOpenDelete={confirmOpenDelete}
          handleConfirmClose={handleConfirmClose}
          handleConfirmDelete={handleConfirmDelete}
          selectedUser={selectedUser}
        />
      )}
      {confirmOpenNotVerified && (
        <WarningMessageNotVerified
          confirmOpenNotVerified={confirmOpenNotVerified}
          handleConfirmClose={handleConfirmClose}
          handleConfirmNotVerified={handleConfirmNotVerified}
          selectedUser={selectedUser}
        />
      )}
      {confirmOpenVerified && (
        <WarningMessageVerified
          confirmOpenVerified={confirmOpenVerified}
          handleConfirmClose={handleConfirmClose}
          handleConfirmVerified={handleConfirmVerified}
          selectedUser={selectedUser}
        />
      )}
      <div className="text-center text-red-500 font-bold p-2">{message}</div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(r) => r.ID}
          rows={users}
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
          }}
        />
      </Box>
    </>
  );
};

export default UserListTable;
