import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, test1, test2, test3, test4, test5, test6, test7, test8, test9, test10, test11, test12) {
    return { name, test1, test2, test3, test4, test5, test6, test7, test8, test9, test10, test11, test12 };
}

const rows = [
    createData('Внимательность', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
    createData('Выносливость', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
    createData('Ёмкость памяти', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
    createData('Многозадачность', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
    createData('Наблюдательность', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
    createData('Мышление', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
    createData('Переключаемость внимания', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
    createData('Реакция', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
];

export default function BasicTable() {
    return (
        <TableContainer component={Paper} style={{ marginTop: 100, marginLeft: 50, width: '90%' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Теорический тест</TableCell>
                        <TableCell >Test 1</TableCell>
                        <TableCell >Test 2</TableCell>
                        <TableCell >Test 3</TableCell>
                        <TableCell >Test 4</TableCell>
                        <TableCell >Test 5</TableCell>
                        <TableCell >Test 6</TableCell>
                        <TableCell >Test 7</TableCell>
                        <TableCell >Test 8</TableCell>
                        <TableCell >Test 9</TableCell>
                        <TableCell >Test 10</TableCell>
                        <TableCell >Test 11</TableCell>
                        <TableCell >Test 12</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
    );
}