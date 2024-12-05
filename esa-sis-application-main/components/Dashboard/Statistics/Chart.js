/*
 * Created By: Jaber Mohamad/Yassine Mohammad
 * Project: SIS Application
 * File: components/Admin/Statistics/Chart.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import decrypt from "../../../utilities/encrypt_decrypt/decryptText";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get("/api/admin/listusers");
        const incomingData = JSON.parse(decrypt(response.data.data));
        if (response.status === 200) {
          setUsers(incomingData);
          // console.log(users);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cumulative = {
    obsolete: {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    },
    submitted: {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    },
    accepted: {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    },
  };
  const Newappscumulative = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };
  const currentYear = new Date().getFullYear();

  users.forEach((user) => {
    const status = user.status;
    if (cumulative[status]) {
      const month = new Date(user.updatedAt).toLocaleString("default", {
        month: "long",
      });
      const userYear = new Date(user.updatedAt).getFullYear();
      if (userYear === currentYear) {
        cumulative[status][month] += 1;
      }
    }
    const month = new Date(user.createdAt).toLocaleString("default", {
      month: "long",
    });
    Newappscumulative[month]++;
  });
  const cumulativeObsolete = Object.values(cumulative["obsolete"]);
  const cumulativeSubmitted = Object.values(cumulative["submitted"]);
  const cumulativeAccepted = Object.values(cumulative["accepted"]);
  const NewappseArray = [];
  for (const month in Newappscumulative) {
    NewappseArray.push(Newappscumulative[month]);
  }
  const data = [
    {
      name: "Jan",
      new: NewappseArray[0],
      acc: cumulativeAccepted[0],
      sub: cumulativeSubmitted[0],
      obs: cumulativeObsolete[0],
    },
    {
      name: "Feb",
      new: NewappseArray[1],
      acc: cumulativeAccepted[1],
      sub: cumulativeSubmitted[1],
      obs: cumulativeObsolete[1],
    },
    {
      name: "Mar",
      new: NewappseArray[2],
      acc: cumulativeAccepted[2],
      sub: cumulativeSubmitted[2],
      obs: cumulativeObsolete[2],
    },
    {
      name: "April",
      new: NewappseArray[3],
      acc: cumulativeAccepted[3],
      sub: cumulativeSubmitted[3],
      obs: cumulativeObsolete[3],
    },
    {
      name: "May",
      new: NewappseArray[4],
      acc: cumulativeAccepted[4],
      sub: cumulativeSubmitted[4],
      obs: cumulativeObsolete[4],
    },
    {
      name: "Jun",
      new: NewappseArray[5],
      acc: cumulativeAccepted[5],
      sub: cumulativeSubmitted[5],
      obs: cumulativeObsolete[5],
    },
    {
      name: "July",
      new: NewappseArray[6],
      acc: cumulativeAccepted[6],
      sub: cumulativeSubmitted[6],
      obs: cumulativeObsolete[6],
    },
    {
      name: "Aug",
      new: NewappseArray[7],
      acc: cumulativeAccepted[7],
      sub: cumulativeSubmitted[7],
      obs: cumulativeObsolete[7],
    },
    {
      name: "Sep",
      new: NewappseArray[8],
      acc: cumulativeAccepted[8],
      sub: cumulativeSubmitted[8],
      obs: cumulativeObsolete[8],
    },
    {
      name: "Oct",
      new: NewappseArray[9],
      acc: cumulativeAccepted[9],
      sub: cumulativeSubmitted[9],
      obs: cumulativeObsolete[9],
    },
    {
      name: "Nov",
      new: NewappseArray[10],
      acc: cumulativeAccepted[10],
      sub: cumulativeSubmitted[10],
      obs: cumulativeObsolete[10],
    },
    {
      name: "Dec",
      new: NewappseArray[11],
      acc: cumulativeAccepted[11],
      sub: cumulativeSubmitted[11],
      obs: cumulativeObsolete[11],
    },
  ];
  return (
    <>
      <Paper elevation={10} sx={{ p: 2 }}>
        <Typography variant="h4" marginBottom={2}>
          Accounts / Month
        </Typography>
        <ResponsiveContainer width="100%" aspect={6 / 2}>
          <LineChart width={500} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line
              name="New Applications"
              type="monotone"
              dataKey="new"
              stroke="#8884d8"
            />
            <Line
              name="Submitted Applications"
              type="monotone"
              dataKey="sub"
              stroke="black"
            />
            <Line
              name="Accepted Applications"
              type="monotone"
              dataKey="acc"
              stroke="green"
            />
            <Line
              name="Obsolete Applications"
              type="monotone"
              dataKey="obs"
              stroke="red"
            />
            <Legend
              verticalAlign="top"
              iconType="square"
              align="right"
              layout="vertical"
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </>
  );
};
export default Chart;
