import React from "react";
import Button from "../Button";
import { Container, UserEmail, UserName, Wrapper } from "./UserProfileElements";
import { useSession, signOut } from "next-auth/react";
import { testResults } from "../../utils/globals";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(testName: string, scoreData: any) {
  return { testName, scoreData };
}

const UserProfile = () => {
  const { data: session }: any = useSession();
  const results = testResults;

  const rows = [
    createData(
      "Light Test ",
      session?.user?.result?.test1?.percent|| "Вы еще не вступили."
    ),
    createData(
      "Analog Stalking ",
      session?.user?.result?.test2?.percent|| "Вы еще не вступили."
    ),
    createData('Analog Tracking ', session?.user?.result?.test3?.percent|| 'Вы еще не вступили.'),
    createData("Attention ", session?.user?.result?.test4?.percent || "Вы еще не вступили."),
    createData(
      "Thinking ",
      session?.user?.result?.test5?.percent|| "Вы еще не вступили."
    ),
    createData(
      "Memory ",
      session?.user?.result?.test6?.percent|| "Вы еще не вступили."
    ),
    createData(
      "The Pursuit",
      session?.user?.result?.test7?.percent|| "Вы еще не вступили."
    ),
    createData("Tracking ", session?.user?.result?.test8?.percent || "Вы еще не вступили."),
    createData(
      "Addition In The Mind ",
      session?.user?.result?.test9?.percent || "Вы еще не вступили."
    ),
    createData(
      "Addition The Mind Sound ",
      session?.user?.result?.test10?.percent || "Вы еще не вступили."
    ),
  ];
  // console.log(results);
  // console.log('cac phan tu cua user la'+session?.user)
  // console.log("So luong la: " + session?.user.result)
  return (
    <Container>
      <Wrapper>
        {session && (
          <>
            <UserName>{`Hello ${session?.user?.fullName}`}</UserName>
            <UserEmail>{"[ " + session?.user?.email + " ]"}</UserEmail>
            <Button title="Logout" onClick={signOut} />
            {/* <div>{`So luong la ${session?.user?.result}`}</div> */}
          </>
        )}

        <TableContainer component={Paper} style={{ display: "table" }}>
          <Table sx={{ minWidth: 650 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ID</b>
                </TableCell>
                <TableCell>
                  <b>название теста</b>
                </TableCell>
                <TableCell align="right">
                  <b>оценка теста</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
  );
};

export default UserProfile;
