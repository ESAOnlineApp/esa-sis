/*
 * Created By: Jaber Mohamad/Yassine Mohammad
 * Project: SIS Application
 * File: components/Admin/Statistics/Count.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import UpdateDisabledIcon from "@mui/icons-material/UpdateDisabled";
import { Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import decrypt from "../../../utilities/encrypt_decrypt/decryptText";
import { useDispatch, useSelector } from "react-redux";
import { appIsWaiting } from "../../../redux/slices/appSlice";
import ProgressIndicator from "../../progressIndicator";

const Counts = () => {
  const [users, setUsers] = useState([]);

  const appState = useSelector(
    (state) => state.persistedReducer.app_state.appState
  );
  const [isLoading, setisLoading] = useState(appState.isWaiting);
  // const [isLoading, setisLoading] = useState(appState.isWaiting);
  const dispatch = useDispatch();
  useEffect(() => {
    setisLoading(appState.isWaiting);
  }, [appState.isWaiting]);

  useEffect(() => {
    const getAllUsers = async () => {
      // // console.log('in getAllUsers...');
      try {
        const response = await axios.get("/api/admin/listusers");
        const incomingData = JSON.parse(decrypt(response.data.data));
        if (response.status === 200) {
          setUsers(incomingData);
          dispatch(appIsWaiting(false));
          // setisLoading(false);
        } else {
          // If the server sends an empty array of users,
          // set the message state to indicate that no users were found
          setUsers([]);
          dispatch(appIsWaiting(false));
          // setisLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appsIncomplete = users.filter((user) => {
    return user.status === "incomplete";
  });

  //const appssubmitted = users.filter((user) => {
  // return user.status === 'submitted';
  //});

  //const appsobsolete = users.filter((user) => {
  //return user.status === 'obsolete';
  //});

  // const submittedUsers = users.filter((user) => {
  // return user.status === 'submitted';
  // });
  //getting weekly date(from mon to sun)
  Date.prototype.getWeek = function () {
    const target = new Date(this.valueOf());
    const dayNr = (this.getUTCDay() + 6) % 7;
    target.setUTCDate(target.getUTCDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setUTCMonth(0, 1);
    if (target.getUTCDay() !== 4) {
      target.setUTCMonth(0, 1 + ((4 - target.getUTCDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  };
  //getting weekly data
  const filterWeeklySubmittedUsers = (users) => {
    // eslint-disable-next-line no-unused-vars
    let count = 0;
    const currentWeek = new Date().getWeek();
    return users.filter((user) => {
      const userWeek = new Date(user.updatedAt).getWeek();
      if (userWeek === currentWeek && user.status === "submitted") {
        count++;
        return true;
      }
      if (userWeek < currentWeek) {
        count = 0;
      }
      return false;
    }).length;
  };
  const filterWeeklyUsers = (users) => {
    // eslint-disable-next-line no-unused-vars
    let count = 0;
    const currentWeek = new Date().getWeek();
    return users.filter((user) => {
      const userWeek = new Date(user.createdAt).getWeek();
      if (userWeek === currentWeek) {
        count++;
        return true;
      }
      if (userWeek < currentWeek) {
        count = 0;
      }
      return false;
    }).length;
  };
  //// console.log(filterWeeklyUsers(users))
  //// console.log(filterWeeklySubmittedUsers(users))
  //// console.log(filterWeeklySubmittedUsers.length);

  //const SubmitWeekCount =
  //submittedUsersPerWeek[Object.keys(submittedUsersPerWeek).pop()] || '---';
  // const NewUsersWeekCount =
  // NewUsersPerWeek[Object.keys(NewUsersPerWeek).pop()] || '---';

  //getting monthly data
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  let submitmonthlycount = 0;
  // eslint-disable-next-line no-unused-vars
  //let completemonthlycount = 0;
  let obsoletemonthlycount = 0;
  let newusersmonthlycount = 0;
  users.forEach((user) => {
    const status = user.status;
    //if (status === 'complete') {
    //const userMonth = new Date(user.updatedAt).getMonth();
    //const userYear = new Date(user.updatedAt).getFullYear();
    //if (userMonth === currentMonth && userYear === currentYear) {
    //completemonthlycount++;
    //}
    //}
    if (status === "submitted") {
      const userMonth = new Date(user.updatedAt).getMonth();
      const userYear = new Date(user.updatedAt).getFullYear();
      if (userMonth === currentMonth && userYear === currentYear) {
        submitmonthlycount++;
      }
    }
    if (status === "obsolete") {
      const userMonth = new Date(user.updatedAt).getMonth();
      const userYear = new Date(user.updatedAt).getFullYear();
      if (userMonth === currentMonth && userYear === currentYear) {
        obsoletemonthlycount++;
      }
    }
    const Month = new Date(user.createdAt).getMonth();
    const Year = new Date(user.createdAt).getFullYear();
    if (Month === currentMonth && Year === currentYear) {
      newusersmonthlycount++;
    }
  });
  return (
    <>
      {isLoading ? (
        <>
          <ProgressIndicator />
        </>
      ) : (
        <>
          <Box
            sx={{
              display: { xs: "flex", md: "grid" },
              gridTemplateColumns: "repeat(2,2fr)",
              gridAutoRows: "minmax(100px, auto)",
              gap: 3,
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography
                variant="h4"
                fontWeight={"bold"}
                fontSize={30}
                marginBottom={2}
              >
                Total Registered Students
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PeopleAltIcon
                  style={{ color: "blue" }}
                  sx={{ height: 70, width: 70, opacity: 0.7, mr: 1 }}
                />
                <Typography variant="h3">{users.length}</Typography>
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography
                variant="h4"
                fontWeight={"bold"}
                fontSize={30}
                marginBottom={2}
              >
                Total Incomplete Applications
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <UnpublishedIcon
                  style={{ color: "red" }}
                  sx={{ height: 70, width: 70, opacity: 0.6, mr: 1 }}
                />
                <Typography variant="h3">{appsIncomplete.length}</Typography>
              </Box>
            </Paper>
          </Box>

          {/* Weekly */}

          <Box
            sx={{
              display: { xs: "flex", md: "grid" },
              gridTemplateColumns: "repeat(2,2fr)",
              gridAutoRows: "minmax(100px, auto)",
              gap: 3,
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" fontWeight={"bold"} marginBottom={2}>
                Weekly
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AppRegistrationIcon
                  style={{ color: "orange" }}
                  sx={{ height: 40, width: 40, opacity: 0.6, mr: 1 }}
                />

                <Typography variant="h3" fontSize={25}>
                  New Applications: {filterWeeklyUsers(users)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HowToRegIcon
                  style={{ color: "green" }}
                  sx={{ height: 40, width: 40, opacity: 0.6, mr: 1 }}
                />

                <Typography variant="h3" fontSize={25}>
                  Submitted Applications: {filterWeeklySubmittedUsers(users)}
                </Typography>
              </Box>
            </Paper>

            {/* Monthly */}

            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" fontWeight={"bold"} marginBottom={2}>
                Monthly
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AppRegistrationIcon
                  style={{ color: "orange" }}
                  sx={{ height: 40, width: 40, opacity: 0.6, mr: 1 }}
                />
                <Typography variant="h3" fontSize={18}>
                  New Applications: {newusersmonthlycount}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <HowToRegIcon
                  style={{ color: "green" }}
                  sx={{ height: 40, width: 40, opacity: 0.6, mr: 1 }}
                />
                <Typography variant="h3" fontSize={18}>
                  Submitted Applications: {submitmonthlycount}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <UpdateDisabledIcon
                  style={{ color: "red" }}
                  sx={{ height: 40, width: 40, opacity: 0.9, mr: 1 }}
                />
                <Typography variant="h3" fontSize={18}>
                  Obsolete Applications: {obsoletemonthlycount}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </>
      )}
    </>
  );
};

export default Counts;
