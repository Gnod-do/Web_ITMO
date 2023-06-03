import React from 'react'
import Button from '../Button'
import {
  Container,
  UserEmail,
  UserName,
  Wrapper
} from './UserProfileElements'
import { useSession, signOut } from "next-auth/react";
import { testResults } from '../../utils/globals';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(testName: string, scoreData: any) {
  return { testName, scoreData };
}

const rows = [
  createData('Analog Stalking ', (testResults.analogStalking) || 'Вы еще не вступили.'),
  createData('Analog Tracking ', (testResults.analogTracking) || 'Вы еще не вступили.'),
  createData('Attention ', (testResults.attention) || 'Вы еще не вступили.'),
  createData('Tracking ', (testResults.tracking) || 'Вы еще не вступили.'),
  createData('Addition In The Mind ', (testResults.additionInTheMind) || 'Вы еще не вступили.'),
  createData('Addition The Mind Sound ', (testResults.additionInTheMindSound) || 'Вы еще не вступили.'),
];

const UserProfile = () => {
  const { data: session }: any = useSession();
  const results = testResults;
  console.log(results);
  return (
    <Container>
      <Wrapper>
        {
          session &&
          <>
            <UserName>
              {
                `Hello ${session?.user?.fullName}`
              }
            </UserName>
            <UserEmail>
              {"[ " + session?.user?.email + " ]"}
            </UserEmail>
            <Button
              title="Logout"
              onClick={signOut}
            />
          </>
        }

        <TableContainer component={Paper} style={{ display: 'table' }}>
          <Table sx={{ minWidth: 650 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>название теста</b></TableCell>
                <TableCell align="right"><b>оценка теста</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.testName}
                  </TableCell>
                  <TableCell align="right">{row.scoreData}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Wrapper>
    </Container>
  )
}

export default UserProfile