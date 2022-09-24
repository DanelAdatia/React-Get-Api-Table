import {
  Box,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { GetApi } from "../api/Api";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const GetTableData = async () => {
    try {
      await GetApi().then((res) => {
        setData(res?.data);
      });
    } catch (err) {
      console.log(err);
      toast("Something went wrong");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      GetTableData();
      toast("Calling Api Every 5 seconds");
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    GetTableData();
    console.log("i fire once");
  }, []);
  return (
    <Card
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box style={{ flexDirection: "column", display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 4,
          }}
        >
          <Typography variant="h5">UI Table</Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" spacing={2}>
                  #
                </TableCell>
                <TableCell align="center" spacing={2}>
                  Symbol
                </TableCell>
                <TableCell align="center" spacing={2}>
                  Open Price
                </TableCell>
                <TableCell align="center" spacing={2}>
                  Ask Price
                </TableCell>
                <TableCell align="center" spacing={2}>
                  Count
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center" spacing={2}>
                    {index}
                  </TableCell>
                  <TableCell align="center" spacing={2}>
                    {item?.symbol}
                  </TableCell>
                  <TableCell align="center" spacing={2}>
                    {item?.openPrice}
                  </TableCell>
                  <TableCell align="center" spacing={2}>
                    <b>{item?.askPrice}</b>
                  </TableCell>
                  <TableCell
                    style={
                      index % 2 === 0 ? { color: "red" } : { color: "green" }
                    }
                    align="center"
                    spacing={2}
                  >
                    {item?.count}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ToastContainer />
    </Card>
  );
};

export default Dashboard;
