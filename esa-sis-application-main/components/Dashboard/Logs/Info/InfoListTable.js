/*
 * Created By: Jaber Mohamad/Mohammad Yassine
 * Project: SIS Application
 * File: components/Admin/Logs/Info/InfoListTable.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
const InfoListTable = ({
  handleLogsChange,
  Filteredlogs,
  showAll,
  setShowAll,
}) => {
  const [pageSize, setPageSize] = useState(5);
  const [logs, setLogs] = useState([]);
  // eslint-disable-next-line no-unused-vars
  //const [datagridlogs, setDatagridLogs] = useState([]);
  const [logsfiltered, setLogsfiltered] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/controller/logs?logtype=info");
        const incomingData = response.data.data;
        //// console.log(incomingData);
        if (response.status === 200) {
          setLogs(incomingData);
          //setDatagridLogs(incomingData);
          setLogsfiltered(incomingData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    //setDatagridLogs(logs)
  }, []);
  useEffect(() => {
    handleLogsChange(logs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleLogsChange]);
  useEffect(() => {
    setLogsfiltered(Filteredlogs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Filteredlogs]);

  useEffect(() => {
    //// console.log('ttt');
    //handleLogsChange(logs);
    setLogsfiltered(logs);
    setShowAll(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll > 0]);

  const columns = [
    {
      field: "level",
      headerName: "Level",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "date",
      headerName: "Date",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "Athour",
      headerName: "Hour",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "role",
      headerName: "Role",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "os",
      headerName: "OS",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "osVersion",
      headerName: "OS Version",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "browser",
      headerName: "Browser",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "browserSource",
      headerName: "Browser Source",
      headerAlign: "center",
      align: "center",
      width: 250,
    },
    {
      field: "device",
      headerName: "Device",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(r) => r.id}
          rows={logsfiltered}
          getRowHeight={() => "auto"}
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

export default InfoListTable;
