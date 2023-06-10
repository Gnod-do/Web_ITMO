import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSession } from "next-auth/react";

function createData(
  name: any,
  test1: any,
  test2: any,
  test3: any,
  test4: any,
  test5: any,
  test6: any,
  test7: any,
  test8: any,
  test9: any,
  test10: any,
  test11: any,
  test12: any
) {
  return {
    name,
    test1,
    test2,
    test3,
    test4,
    test5,
    test6,
    test7,
    test8,
    test9,
    test10,
    test11,
    test12,
  };
}

const rows = 8;
const cols = 12;
const minValue = 0.01;
const maxValue = 0.1;

const arr: number[][] = [];

for (let i = 0; i < rows; i++) {
  arr[i] = new Array(cols);

  for (let j = 0; j < cols; j++) {
    const randomValue = Math.random() * (maxValue - minValue) + minValue;
    arr[i][j] = Number(randomValue.toFixed(2));
  }
}

export default function TableData() {
  const { data: session }: any = useSession() ?? { data: null };
  function dataProcess(arr: number[][]) {
    arr[0][0] = Number(
      (session?.user?.result?.test1?.coefficient * (6 + 7 + 5.5)).toFixed(2)
    );
    arr[0][1] = Number(
      (session?.user?.result?.test2?.coefficient * (6 + 7 + 5.5)).toFixed(2)
    );
    arr[0][2] = Number(
      (session?.user?.result?.test3?.coefficient * (6 + 7 + 5.5)).toFixed(2)
    );
    arr[1][6] = Number(
      (session?.user?.result?.test7?.coefficient * (6 + 7)).toFixed(2)
    );
    arr[1][7] = Number(
      (session?.user?.result?.test8?.coefficient * (6 + 7)).toFixed(2)
    );
    arr[1][10] = Number(
      (session?.user?.result?.test11?.coefficient * (6 + 7)).toFixed(2)
    );
    arr[2][5] = Number(
      (session?.user?.result?.test6?.coefficient * (9 + 7 + 8)).toFixed(2)
    );
    arr[2][9] = Number(
      (session?.user?.result?.test10?.coefficient * (9 + 7 + 8)).toFixed(2)
    );
    arr[3][3] = Number(
      (session?.user?.result?.test4?.coefficient * (7 + 7 + 9)).toFixed(2)
    );
    arr[3][6] = Number(
      (session?.user?.result?.test7?.coefficient * (7 + 7 + 9)).toFixed(2)
    );
    arr[3][11] = Number(
      (session?.user?.result?.test12?.coefficient * (7 + 7 + 9)).toFixed(2)
    );
    arr[4][3] = Number(
      (session?.user?.result?.test4?.coefficient * (7 + 8 + 9)).toFixed(2)
    );
    arr[4][8] = Number(
      (session?.user?.result?.test9?.coefficient * (7 + 8 + 9)).toFixed(2)
    );
    arr[4][11] = Number(
      (session?.user?.result?.test12?.coefficient * (7 + 8 + 9)).toFixed(2)
    );
    arr[5][4] = Number(
      (session?.user?.result?.test5?.coefficient * (9 + 5.5 + 7)).toFixed(2)
    );
    arr[5][8] = Number(
      (session?.user?.result?.test9?.coefficient * (9 + 5.5 + 7)).toFixed(2)
    );
    arr[5][10] = Number(
      (session?.user?.result?.test11?.coefficient * (9 + 5.5 + 7)).toFixed(2)
    );
    arr[6][9] = Number(
      (session?.user?.result?.test10?.coefficient * (7 + 5.5 + 9)).toFixed(2)
    );
    arr[6][10] = Number(
      (session?.user?.result?.test11?.coefficient * (7 + 5.5 + 9)).toFixed(2)
    );
    arr[7][1] = Number(
      (session?.user?.result?.test2?.coefficient * (6 + 7)).toFixed(2)
    );
    arr[7][2] = Number(
      (session?.user?.result?.test3?.coefficient * (6 + 7)).toFixed(2)
    );
    arr[7][6] = Number(
      (session?.user?.result?.test7?.coefficient * (6 + 7)).toFixed(2)
    );
    arr[7][7] = Number(
      (session?.user?.result?.test8?.coefficient * (6 + 7)).toFixed(2)
    );
    arr[7][11] = Number(
      (session?.user?.result?.test12?.coefficient * (6 + 7)).toFixed(2)
    );
    return arr;
  }

  dataProcess(arr);

  const rows = [
    createData(
      "Внимательность",
      arr[0][0],
      arr[0][1],
      arr[0][2],
      arr[0][3],
      arr[0][4],
      arr[0][5],
      arr[0][6],
      arr[0][7],
      arr[0][8],
      arr[0][9],
      arr[0][10],
      arr[0][11]
    ),
    createData(
      "Выносливость",
      arr[1][0],
      arr[1][1],
      arr[1][2],
      arr[1][3],
      arr[1][4],
      arr[1][5],
      arr[1][6],
      arr[1][7],
      arr[1][8],
      arr[1][9],
      arr[1][10],
      arr[1][11]
    ),
    createData(
      "Ёмкость памяти",
      arr[2][0],
      arr[2][1],
      arr[2][2],
      arr[2][3],
      arr[2][4],
      arr[2][5],
      arr[2][6],
      arr[2][7],
      arr[2][8],
      arr[2][9],
      arr[2][10],
      arr[2][11]
    ),
    createData(
      "Многозадачность",
      arr[3][0],
      arr[3][1],
      arr[3][2],
      arr[3][3],
      arr[3][4],
      arr[3][5],
      arr[3][6],
      arr[3][7],
      arr[3][8],
      arr[3][9],
      arr[3][10],
      arr[3][11]
    ),
    createData(
      "Наблюдательность",
      arr[4][0],
      arr[4][1],
      arr[4][2],
      arr[4][3],
      arr[4][4],
      arr[4][5],
      arr[4][6],
      arr[4][7],
      arr[4][8],
      arr[4][9],
      arr[4][10],
      arr[4][11]
    ),
    createData(
      "Мышление",
      arr[5][0],
      arr[5][1],
      arr[5][2],
      arr[5][3],
      arr[5][4],
      arr[5][5],
      arr[5][6],
      arr[5][7],
      arr[5][8],
      arr[5][9],
      arr[5][10],
      arr[5][11]
    ),
    createData(
      "Переключаемость внимания",
      arr[6][0],
      arr[6][1],
      arr[6][2],
      arr[6][3],
      arr[6][4],
      arr[6][5],
      arr[6][6],
      arr[6][7],
      arr[6][8],
      arr[6][9],
      arr[6][10],
      arr[6][11]
    ),
    createData(
      "Реакция",
      arr[7][0],
      arr[7][1],
      arr[7][2],
      arr[7][3],
      arr[7][4],
      arr[7][5],
      arr[7][6],
      arr[7][7],
      arr[7][8],
      arr[7][9],
      arr[7][10],
      arr[7][11]
    ),
  ];
  return (
    <>
      <div style={{ marginTop: 50, fontSize: 35 }}>Подробные результаты</div>
      <TableContainer
        component={Paper}
        style={{ marginTop: 50, marginLeft: 50, width: "90%" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Теорический тест</TableCell>
              <TableCell>Test 1</TableCell>
              <TableCell>Test 2</TableCell>
              <TableCell>Test 3</TableCell>
              <TableCell>Test 4</TableCell>
              <TableCell>Test 5</TableCell>
              <TableCell>Test 6</TableCell>
              <TableCell>Test 7</TableCell>
              <TableCell>Test 8</TableCell>
              <TableCell>Test 9</TableCell>
              <TableCell>Test 10</TableCell>
              <TableCell>Test 11</TableCell>
              <TableCell>Test 12</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.test1}</TableCell>
                <TableCell align="center">{row.test2}</TableCell>
                <TableCell align="center">{row.test3}</TableCell>
                <TableCell align="center">{row.test4}</TableCell>
                <TableCell align="center">{row.test5}</TableCell>
                <TableCell align="center">{row.test6}</TableCell>
                <TableCell align="center">{row.test7}</TableCell>
                <TableCell align="center">{row.test8}</TableCell>
                <TableCell align="center">{row.test9}</TableCell>
                <TableCell align="center">{row.test10}</TableCell>
                <TableCell align="center">{row.test11}</TableCell>
                <TableCell align="center">{row.test12}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button
        className="btn start"
        style={{
          borderRadius: "0",
          backgroundColor: "#00FF00",
          color: "black",
        }}
        onClick={() => {
          location.href = "http://localhost:3000/resultCard";
        }}
      >
        Click to see everything you need!
      </button>
    </>
  );
}
