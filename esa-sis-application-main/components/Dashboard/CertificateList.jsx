/*
 * Created By: JABER Mohamad,Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\StudentsList.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from "react";
import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";

import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import selection_data from "../../utilities/selection_data";

import CustomPagination from "./Pagination";
import axios from "axios";
import { WarningMessageStatus } from "./WarningMessage";


const CertificateList = ({
    users,
    setUsers
}) => {

    

    const { data: session } = useSession()
    const [pageSize, setPageSize] = useState(10);
    const [message, setMessage] = useState("");
    const [editStatus, setEditStatus] = useState(null);
    const [sortedRows, setSortedRows] = useState(users);
    const [confirmOpenIncomplete, setConfirmOpenIncomplete] = useState(false);
    const [confirmOpenDelete, setConfirmOpenDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const handleConfirmClose = () => {
        setConfirmOpenIncomplete(false);

        // setConfirmOpenObsolote(false);
        setConfirmOpenDelete(false);
    };


    const status = [
        { value: 'active', label: 'active' },
        { value: 'inactive', label: 'inactive' },
    ];
   
    setTimeout(() => {
        setMessage("");
    }, selection_data.message_disapear_timing);

    useEffect(() => {
       
        if (Array.isArray(users)) {
            const sorted = [...users].sort((a, b) => b.major_id - a.major_id);
            setSortedRows(sorted);
        }
        
      
    }, [users]);

    const handleEditCellChange = (params) => {
        const { field, value } = params;

        // Check if the edited field is "grade" and update the edited grade value
        if (field === "status") {
            setEditStatus(value);
        }
    };
    const handleConfirmDel = (user) => {
        setSelectedUser(user);
        setConfirmOpenDelete(true);
    };

    const handleStatus = async () => {
        try {

            const payload = {
                majorId: selectedUser.major_id,
                status: editStatus
            }
            const res = await axios.post('/api/pmApi/updateStatus', payload)

            if (res.data.success === true) {
                // Update the status in the users state
                const updatedUsers = users.map(user =>
                    user.major_id === selectedUser.major_id
                        ? { ...user, status: editStatus }
                        : user
                );

                // Update the state with the new users array
                setUsers(updatedUsers);
                setConfirmOpenDelete(false)
            }


        } catch (error) {
            return error
        }
    }

    const columns = [
        {
            field: `${session.user?.hasMultiMajor === 'true' ? 'major_name':'modified_major_name'}`,
            headerName: "Certificate Name",
            headerAlign: "center",
            align: "center",
            width: 450,
        },
        {
            field: "status",
            headerName: "Status",
            headerAlign: "center",
            align: "center",
            width: 200,
            cellClassName: (params) =>
                params.row.status === 'inactive'
                    ? 'text-red-600 font-bold'
                    : params.row.status === 'active'
                        ? 'text-green-600 font-bold'
                        : '',
            type: 'singleSelect',
            valueOptions: status,
            editable: true,
        },
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
                            handleConfirmDel(params.row);
                            setSelectedUser(params.row);
                        }}


                    >
                        Change
                    </button>
                </div>
            ),
        },
    ]


    return (
        <>
            {confirmOpenDelete && (
                <WarningMessageStatus
                    confirmOpenIncomplete={confirmOpenIncomplete}
                    confirmOpenObsolote={confirmOpenDelete}
                    handleConfirmClose={handleConfirmClose}
                    handleConfirm={handleStatus}

                />
            )}

            <div className="text-center text-red-500 font-bold p-2">{message}</div>
            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    getRowId={(r) => r.major_id}
                    rows={sortedRows}
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
                    onCellEditCommit={handleEditCellChange} // Use the handleEditCellChange function
                />
            </Box>
        </>
    );
};

export default CertificateList;
