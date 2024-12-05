import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const CoursesData = ({ courses }) => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 250, maxWidth: 1200, 'td, th': { border: 1 } }}
        aria-label='simple table'
      >
        <TableHead style={{ backgroundColor: 'lightBlue' }}>
          <TableRow>
            <TableCell
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              align='center'
            >
              Course Name
            </TableCell>
            <TableCell
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              align='center'
            >
              Academic Level
            </TableCell>
            <TableCell
              style={{ fontSize: '18px', fontWeight: 'bold' }}
              align='center'
            >
              Course Description
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell style={{ wordWrap: 'break-word' }} align='center'>
                {course.name}
              </TableCell>
              <TableCell style={{ wordWrap: 'break-word' }} align='center'>
                {course.academicLevel}
              </TableCell>
              <TableCell style={{ wordWrap: 'break-word' }} align='center'>
                {course.desc}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoursesData;
